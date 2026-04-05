import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const error = requestUrl.searchParams.get("error");
  const errorDescription = requestUrl.searchParams.get("error_description");

  if (error) {
    console.error("OAuth callback error:", error, errorDescription);
    return NextResponse.redirect(
      new URL(`/auth-error?message=${encodeURIComponent(errorDescription || error)}`, request.url)
    );
  }

  if (code) {
    const supabase = await createClient();
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError) {
      console.error("Session exchange error:", exchangeError);
      return NextResponse.redirect(
        new URL(`/auth-error?message=${encodeURIComponent(exchangeError.message)}`, request.url)
      );
    }

    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.redirect(
    new URL("/auth-error?message=No authorization code received", request.url)
  );
}