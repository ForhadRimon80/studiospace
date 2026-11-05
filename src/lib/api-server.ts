import { headers } from "next/headers";

import { auth } from "@/lib/auth";

const API_URL = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

/**
 * Fetch from the StudioSpace Express API in a server component.
 * Uses the JWT plugin's server API to sign a token for the current session.
 */
export async function serverApiFetch(path: string, init: RequestInit = {}) {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const requestHeaders = new Headers(init.headers);
  requestHeaders.set("Authorization", `Bearer ${token}`);

  return fetch(`${API_URL}${path}`, {
    ...init,
    headers: requestHeaders,
  });
}
