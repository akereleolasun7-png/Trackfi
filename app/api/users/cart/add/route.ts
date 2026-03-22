import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { refreshSessionActivity } from '@/lib/helpers/sessions';

export async function POST(req: Request) {
  try {
    const supabase = await createClient();

    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('session_token')?.value;
    if (!sessionToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: session, error: sessionError } = await supabase
      .from('table_sessions')
      .select('id, is_active')
      .eq('session_token', sessionToken)
      .single();

    if (sessionError || !session || !session.is_active) {
      return NextResponse.json({ error: 'Invalid or expired session' }, { status: 401 });
    }
    
   await refreshSessionActivity(supabase, session.id);
    const { menuId } = await req.json();
    if (!menuId) {
      return NextResponse.json({ error: 'menuId is required' }, { status: 400 });
    }

    
    const { data: existingItem } = await supabase
      .from('cart_items')
      .select('id, quantity')
      .eq('table_session_id', session.id)
      .eq('menu_item_id', menuId)
      .single();

    if (existingItem) {
      
      const { error: updateError } = await supabase
        .from('cart_items')
        .update({ quantity: existingItem.quantity + 1 })
        .eq('id', existingItem.id);

      if (updateError) {
        return NextResponse.json({ error: updateError.message }, { status: 500 });
      }

      return NextResponse.json({ message: 'Cart item quantity updated' }, { status: 200 });
    }

    const { error: insertError } = await supabase
      .from('cart_items')
      .insert({
        table_session_id: session.id,
        menu_item_id: menuId,
        quantity: 1,
      });

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Item added to cart' }, { status: 201 });

  } catch (err) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}