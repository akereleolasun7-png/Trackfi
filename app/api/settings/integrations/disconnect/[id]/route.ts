import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: integration_id } = await params;
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: disconnectedIntegration, error: deleteError } = await supabase
      .from("integrations")
      .delete()
      .match({ id: integration_id, user_id: user.id })
      .select("*")
      .single();
    console.log("Integration deleted:", deleteError);

    if (deleteError || !disconnectedIntegration) {
      return NextResponse.json(
        { error: "Failed to disconnect integration" },
        { status: 500 },
      );
    }

    return NextResponse.json("Integration disconnected successfully", {
      status: 201,
    });
  } catch (error) {
    console.error("Error disconnecting integration:", error);
    return NextResponse.json(
      { error: "Failed to disconnect integration" },
      { status: 500 },
    );
  }
}
