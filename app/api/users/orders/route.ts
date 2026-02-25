import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

type CartItemRow = {
  id: string;
  quantity: number;
  menu_item_id: string;
  menu_items: {
    id: string;
    name: string;
    price: number;
  } | {
    id: string;
    name: string;
    price: number;
  }[] | null;
};

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

    const { data: cartItems, error: cartError } = await supabase
      .from('cart_items')
      .select(`
        id,
        quantity,
        menu_item_id,
        menu_items (
          id,
          name,
          price
        )
      `)
      .eq('table_session_id', session.id);

    if (cartError || !cartItems || cartItems.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    const totalAmount = (cartItems as CartItemRow[]).reduce((sum, item) => {
      const menu = Array.isArray(item.menu_items)
        ? item.menu_items[0]
        : item.menu_items;
      return sum + (menu?.price ?? 0) * item.quantity;
    }, 0);

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        table_session_id: session.id,
        status: 'pending',
        total_amount: totalAmount,
        estimated_time: 15,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (orderError || !order) {
      return NextResponse.json({ error: orderError?.message ?? 'Failed to create order' }, { status: 500 });
    }

    const orderItems = (cartItems as CartItemRow[]).map((item) => {
      const menu = Array.isArray(item.menu_items)
        ? item.menu_items[0]
        : item.menu_items;
      return {
        order_id: order.id,
        menu_item_id: item.menu_item_id,
        quantity: item.quantity,
        price: menu?.price ?? 0,
      };
    });

    const { error: orderItemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (orderItemsError) {
      return NextResponse.json({ error: orderItemsError.message }, { status: 500 });
    }

    const { error: clearCartError } = await supabase
      .from('cart_items')
      .delete()
      .eq('table_session_id', session.id);

    if (clearCartError) {
      console.error('Failed to clear cart:', clearCartError);
    }

    return NextResponse.json({
      message: 'Order placed successfully',
      orderId: order.id,
      total: totalAmount,
    }, { status: 201 });

  } catch (err) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}