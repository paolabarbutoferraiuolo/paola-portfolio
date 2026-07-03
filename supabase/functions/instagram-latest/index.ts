// Fetch the latest 4 media items from an Instagram Business/Creator account
// via the Instagram Graph API. Requires IG_ACCESS_TOKEN and IG_USER_ID secrets.
// Public endpoint (no user auth), safe to call from the client.

import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const token = Deno.env.get("IG_ACCESS_TOKEN");
  const userId = Deno.env.get("IG_USER_ID");

  if (!token || !userId) {
    // Graceful response so the frontend can render placeholders.
    return new Response(
      JSON.stringify({
        configured: false,
        data: [],
        error: "IG_ACCESS_TOKEN or IG_USER_ID not configured",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  }

  try {
    const fields =
      "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp";
    const qs = `?fields=${fields}&limit=4&access_token=${encodeURIComponent(token)}`;

    // Try both API hosts — tokens from "Instagram API with Instagram Login"
    // work on graph.instagram.com; tokens from "Instagram API with Facebook
    // Login" (Page-scoped) work on graph.facebook.com.
    const hosts = [
      `https://graph.instagram.com/v21.0/${encodeURIComponent(userId)}/media`,
      `https://graph.facebook.com/v21.0/${encodeURIComponent(userId)}/media`,
    ];

    let json: any = null;
    let ok = false;
    let lastStatus = 0;
    for (const base of hosts) {
      const res = await fetch(base + qs);
      json = await res.json();
      lastStatus = res.status;
      if (res.ok && Array.isArray(json?.data)) {
        ok = true;
        break;
      }
      console.warn("IG host failed", base, res.status, json?.error?.message);
    }

    if (!ok) {
      return new Response(
        JSON.stringify({
          configured: true,
          data: [],
          error: json?.error?.message ?? `HTTP ${lastStatus}`,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        },
      );
    }


    const items = Array.isArray(json?.data) ? json.data : [];
    const normalized = items.slice(0, 4).map((m: any) => ({
      id: m.id,
      permalink: m.permalink,
      caption: m.caption ?? "",
      mediaType: m.media_type,
      // Videos expose thumbnail_url; images use media_url.
      imageUrl: m.media_type === "VIDEO" ? m.thumbnail_url : m.media_url,
      timestamp: m.timestamp,
    }));

    return new Response(
      JSON.stringify({ configured: true, data: normalized }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
          // Cache at edge for 10 minutes to stay under IG rate limits.
          "Cache-Control": "public, max-age=600, s-maxage=600",
        },
        status: 200,
      },
    );
  } catch (e) {
    console.error("instagram-latest error", e);
    return new Response(
      JSON.stringify({ configured: true, data: [], error: String(e) }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  }
});
