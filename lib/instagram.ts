import "server-only";

// Shape of the Instagram Graph API media object the upstream endpoint forwards.
export type InstagramPhoto = {
  media_url: string;
  caption?: string;
  permalink: string;
};

export async function getInstagramPhotos(): Promise<InstagramPhoto[]> {
  const url = process.env.INSTAGRAM_API_URL;
  if (!url) {
    return [];
  }

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Instagram API request failed: ${res.status}`);
  }

  const body = (await res.json()) as { data: InstagramPhoto[] };
  return body.data;
}
