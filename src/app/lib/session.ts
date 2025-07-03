import "server-only";
import { cookies } from "next/headers";

export async function createSession(access: string, refresh: string) {
  const cookieStore = await cookies();

  cookieStore.set("session", JSON.stringify({ access, refresh }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  if (!session) {
    return null;
  }
  return JSON.parse(session.value);
}
