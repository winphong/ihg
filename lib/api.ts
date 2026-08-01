// Server-only typed client for the Go API (api/, pkg/handlers). Only call
// this from Server Components, Route Handlers, or Server Actions - it reads
// a server-only env var and is never bundled for the browser.
import "server-only";

export type ScheduleHall = {
  name: string;
  imgUrl: string;
  colourCode: string;
  score?: number;
  abbreviation: string;
};

export type Schedule = {
  _id?: string;
  sport: string;
  halls: ScheduleHall[];
  startTime: string;
  endTime: string;
  venue: string;
  gender: "Male" | "Female" | "Mixed";
  stage: string;
};

export type Hall = {
  _id?: string;
  name: string;
  abbreviation: string;
  imgUrl: string;
  colourCode: string;
  malePoint: number;
  femalePoint: number;
  totalPoint: number;
};

export type SportStanding = {
  hall: string;
  point: number;
  position: number;
};

export type Sport = {
  _id?: string;
  name: string;
  description: string;
  imgUrl: string;
  standings: SportStanding[];
};

export type Enquiry = {
  _id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
};

class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// On Vercel, the Go API is bundled into this same deployment (see the
// root vercel.json /api rewrite) - resolve same-origin via VERCEL_URL so
// every preview hits its own API, not a hardcoded env var. API_URL is only
// needed for local dev, pointing at `go run ./cmd/server`.
function resolveApiBaseUrl(): string {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}/api`;
  }

  const baseUrl = process.env.API_URL;
  if (!baseUrl) {
    throw new Error(
      "API_URL environment variable is not set (and VERCEL_URL is unavailable)",
    );
  }
  return baseUrl;
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const baseUrl = resolveApiBaseUrl();
  const bypassSecret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;

  const res = await fetch(`${baseUrl}${path}`, {
    // "next" (time-based revalidation) and "no-store" are mutually
    // exclusive - only default to no-store when the caller didn't opt into
    // caching via `next.revalidate`.
    cache: init?.next ? undefined : "no-store",
    headers: {
      "Content-Type": "application/json",
      // Bypasses Vercel Authentication when calling our own protected
      // deployment same-origin (e.g. during build-time prerender).
      ...(bypassSecret && { "x-vercel-protection-bypass": bypassSecret }),
    },
    ...init,
  });

  if (!res.ok) {
    const body = await res.text();
    throw new ApiError(res.status, body || res.statusText);
  }

  return res.json() as Promise<T>;
}

export function getHalls() {
  return apiFetch<Hall[]>("/halls", { next: { revalidate: 60 * 60 * 24 } });
}

export function getUpcomingSchedules(date: Date) {
  return apiFetch<Schedule[]>(
    `/schedule/upcomingSchedules/${encodeURIComponent(date.toISOString())}`,
    { next: { revalidate: 60 } },
  );
}

export function getSchedulesAsc() {
  return apiFetch<Schedule[]>("/schedule/asc", { next: { revalidate: 60 } });
}

// GetSchedulesWithScore: schedules with at least one recorded hall score,
// sorted by startTime descending.
export function getResults() {
  return apiFetch<Schedule[]>("/schedule", { next: { revalidate: 60 } });
}

export function getSports() {
  return apiFetch<Sport[]>("/sport", { next: { revalidate: 60 * 60 * 24 } });
}

export function createEnquiry(input: Omit<Enquiry, "_id">) {
  return apiFetch<Enquiry>("/enquiry", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export { ApiError };
