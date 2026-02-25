import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

type MenuItemJoin = {
  id: string;
  name: string;
  price: number;
  image_url: string;
  video_url: string;
  description: string;
};

type CartItemRow = {
  id: string;
  quantity: number;
  table_session_id: string;
  menu_item_id: string;
  menu_items: MenuItemJoin | MenuItemJoin[] | null;
};

export async function GET() {
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

    const { data: cartItems, error: cartError } = await supabase
      .from('cart_items')
      .select(`
        id,
        quantity,
        table_session_id,
        menu_item_id,
        menu_items (
          id,
          name,
          price,
          image_url,
          video_url,
          description
        )
      `)
      .eq('table_session_id', session.id);

    if (cartError) {
      return NextResponse.json({ error: cartError.message }, { status: 500 });
    }

    const items = (cartItems as CartItemRow[]).map((item) => {
      const menu = Array.isArray(item.menu_items)
        ? item.menu_items[0]
        : item.menu_items;

      return {
        _id: item.id,
        menu_item_id: item.menu_item_id,
        quantity: item.quantity,
        name: menu?.name,
        price: menu?.price,
        image_url: menu?.image_url,
        video_url: menu?.video_url,
        description: menu?.description,
      };
    });

    return NextResponse.json({ items }, { status: 200 });

  } catch (err) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}