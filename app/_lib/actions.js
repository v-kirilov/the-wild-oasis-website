"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function updateGuest(formdata) {
  const session = await auth();
  if (!session) {
    throw new Error("Not authenticated!");
  }

  const nationalID = formdata.get("nationalID");
  const [nationality, countryFlag] = formdata.get("nationality").split("%");

  // Validate nationalID: alphanumeric, 6-12 characters
  const nationalIDRegex = /^[a-zA-Z0-9]{6,12}$/;
  if (!nationalIDRegex.test(nationalID)) {
    throw new Error(
      "Please provide a valid national ID (6-12 alphanumeric characters)"
    );
  }

  const updateData = { nationality, countryFlag, nationalID };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) {
    throw new Error("Guest could not be updated");
  }

  revalidatePath("/account/profile");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  // Sign out and redirect to homepage
  await signOut({ redirectTo: "/" });
}

export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) {
    throw new Error("Not authenticated!");
  }

  const guestBookings = await getBookings(session.user.guestId);
  const bookingIds = guestBookings.map((booking) => booking.id);

  if (!bookingIds.includes(bookingId)) {
    throw new Error("You are not authorized to delete this booking");
  }

  const { data, error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    throw new Error("Booking could not be deleted");
  }
  revalidatePath("/account/reservations");
}

export async function updateBooking(formdata) {
  const bookingId = Number(formdata.get("bookingId"));

  // 1. Authentication
  const session = await auth();
  if (!session) {
    throw new Error("Not authenticated!");
  }

  // 2. Authorization
  const guestBookings = await getBookings(session.user.guestId);
  const bookingIds = guestBookings.map((booking) => booking.id);

  if (!bookingIds.includes(bookingId)) {
    throw new Error("You are not authorized to update this booking");
  }

  // 3. Building update data
  const updateData = {
    numGuests: Number(formdata.get("numGuests")),
    observations: formdata.get("observations").slice(0, 1000),
  };

  // 4. Mutation
  const { data, error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  // 5. Error handling
  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }

  // 6. Revalidation
  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${bookingId}`);

  // 7. Redirect
  redirect(`/account/reservations`);
}
