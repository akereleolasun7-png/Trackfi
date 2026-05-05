import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { CreateAlertInput } from "@/types";
export async function POST(  req: NextRequest,) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
const body  = await req.json();
   if (!body.coin_id || !body.condition || !body.target_price) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  
   
  const { data: alert, error: alertError } = await supabase
    .from("alerts")
    .insert({
      coin_id: body.coin_id,
      condition: body.condition,
      target_price: body.target_price,
      in_app: body.in_app ?? true,
      email: body.email ?? false,
      status: body.status ?? "active",
      user_id: user.id,
    })
  if(alertError){
    console.log(alertError)
    return NextResponse.json({ error: alertError.message }, { status: 500 });
  }

  return NextResponse.json( alert );
  
}
