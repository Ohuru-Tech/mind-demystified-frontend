"use server";

import { AccountsAPIs } from "@/utils/accountsAPIs";
import { createSession } from "@/app/lib/session";
import { cookies } from "next/headers";

export async function login(token: string) {
  try {
    const serverResponse = await AccountsAPIs().loginComplete(token);
    const { access, refresh, requires_name } = serverResponse.data;

    await createSession(access, refresh);
    return { success: true, access, requires_name };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, error: "Login failed" };
  }
}

export async function googleSignIn(token: string, redirectTo: string) {
  try {
    const serverResponse = await AccountsAPIs().googleSignIn(token, redirectTo);
    const { access, refresh, redirect_to } = serverResponse.data;

    await createSession(access, refresh);
    return { success: true, access, refresh, redirect_to };
  } catch (error) {
    console.error("Google Sign-In error:", error);
    return { success: false, error: "Google Sign-In failed" };
  }
}

export async function logout() {
  try {
    const cookieStore = await cookies();

    // Clear the session cookie
    cookieStore.delete("session");

    return { success: true };
  } catch (error) {
    console.error("Logout error:", error);
    return { success: false, error: "Logout failed" };
  }
}
