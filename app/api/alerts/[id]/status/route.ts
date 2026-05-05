import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: "Missing alert ID" }, { status: 400 });
  }
  const { status } = await req.json();
  const {data: alert , error: alertError} = await supabase.
  from("alerts")
  .update({ status })
   .eq("id", id)           
    .eq("user_id", user.id)
  .select().single();
  if(alertError){
    return NextResponse.json({ error: alertError.message }, { status: 500 });
  }

  return NextResponse.json({ alert });
  
}
