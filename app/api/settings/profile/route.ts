import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data , error } = await supabase.from("profiles").select("*").eq("id", user.id).single();
  if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });

  
  } catch (err) {
    console.log(err);
    return NextResponse.json("Error Fetching profile data" , {status: 500})
  }
}
