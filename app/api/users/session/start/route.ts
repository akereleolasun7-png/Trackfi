import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_DURATION, INACTIVITY_THRESHOLD } from '@/lib/constants/sessions';

export async function POST(request: Request) {
  
  const supabase = await createClient();
  const { table_number } = await request.json();
  
  const { data: table, error: tableError } = await supabase
    .from('tables')
    .select('*')
    .eq('table_number', table_number)
    .single();
    
  if (tableError || !table) {
    return NextResponse.json({ error: "Table not found" }, { status: 404 });
  }

  const { data: existingSession } = await supabase
    .from('table_sessions')
    .select('*')
    .eq('table_id', table.id)
    .eq('is_active', true)
    .single();
  
  if (existingSession) {
    const now = new Date();
    const expiresAt = new Date(existingSession.expires_at);
    const lastActivity = new Date(existingSession.last_activity);
    
    const isExpired = now > expiresAt;
    const isInactive = now.getTime() - lastActivity.getTime() > INACTIVITY_THRESHOLD;
    
    if (isExpired || isInactive) {
      await supabase
        .from('table_sessions')
        .update({ 
          is_active: false, 
          status: isExpired ? 'expired' : 'inactive',
          ended_at: now.toISOString()
        })
        .eq('id', existingSession.id);
      
    
      await supabase
        .from('tables')
        .update({ is_occupied: false })
        .eq('id', table.id);
      
     
    } else {
    
      const cookieStore = await cookies();
      cookieStore.set('session_token', existingSession.session_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60,
      });

      return NextResponse.json({ session: existingSession });
    }
  }
 //  start the session for users 
  const session_token = crypto.randomUUID();
  const now = new Date();

  const { data: newSession, error: sessionError } = await supabase
    .from('table_sessions')
    .insert({
      table_id: table.id,
      session_token: session_token,
      started_at: now.toISOString(),
      last_activity: now.toISOString(),
      expires_at: new Date(now.getTime() + SESSION_DURATION).toISOString(),
      status: 'active',
      is_active: true,
    })
    .select()
    .single();
    
  if (sessionError) {
    return NextResponse.json({ error: sessionError.message }, { status: 500 });
  }

  await supabase
    .from('tables')
    .update({ is_occupied: true })
    .eq('id', table.id);

  const cookieStore = await cookies();
  cookieStore.set('session_token', session_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60,
  });

  return NextResponse.json({ session: newSession });
}
