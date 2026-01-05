"use server";

import { signIn, signOut } from "./auth";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  // Sign out and redirect to homepage
  await signOut({ redirectTo: "/" });
}
