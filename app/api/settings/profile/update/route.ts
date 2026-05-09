import { CurrencyPreference } from '@/types/settings';
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function PATCH(req: NextRequest) {
    try {
    const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json()
  const  {name, preferredCurrency} = body
  console.log(name, preferredCurrency)
  const {data:result, error} = await supabase.from("profiles").update({
    name: name,
    preferred_currency: preferredCurrency as CurrencyPreference
  }).eq("id", user.id).single();
  console.log(error," offo")
  return NextResponse.json(result , {status: 200})
  
  } catch (err) {
    console.log(err);
    return NextResponse.json("Error Fetching profile data" , {status: 500})
  }   
}