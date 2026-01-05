"use server";

import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";

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
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  // Sign out and redirect to homepage
  await signOut({ redirectTo: "/" });
}
