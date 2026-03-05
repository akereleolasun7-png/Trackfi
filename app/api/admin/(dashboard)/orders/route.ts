import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data, error } = await supabase
      .from('orders')
      .select(`
        id,
        table_session_id,
        status,
        total_amount,
        estimated_time,
        created_at,
        order_items (
          id,
          quantity,
          price,
          menu_items ( id, name, category )
        ),
        table_sessions (
          table_id,
          tables (
            table_number
          )
        )
      `)
      .order('created_at', { ascending: false });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json(data);

  } catch (err) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}