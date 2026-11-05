"use client";

import { authClient } from "@/lib/auth-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

/**
 * Fetch from the StudioSpace Express API with the current user's JWT.
 * The token comes from the Better Auth JWT plugin (`GET /api/auth/token`).
 */
export async function apiFetch(path: string, init: RequestInit = {}) {
  const { data, error } = await authClient.$fetch<{ token: string }>("/token");

  if (error || !data?.token) {
    throw new Error(error?.message ?? "Your session has expired. Please sign in again.");
  }

  const headers = new Headers(init.headers);
  headers.set("Authorization", `Bearer ${data.token}`);

  return fetch(`${API_URL}${path}`, { ...init, headers });
}
