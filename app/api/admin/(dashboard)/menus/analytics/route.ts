import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
type OrderItemRow = {
  quantity: number;
  price: number;
  menu_items: { id: string; name: string; category: string } | { id: string; name: string; category: string }[] | null;
};
export async function GET() {
  try {
    const supabase = await createClient();

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    // Top selling items from order_items joined with menu_items
    const { data: topItems, error: topError } = await supabase
      .from('order_items')
      .select(`
        quantity,
        price,
        menu_items ( id, name, category )
      `);

    if (topError) return NextResponse.json({ error: topError.message }, { status: 500 });

    // Aggregate by menu item
    const aggregated: Record<string, { name: string; category: string; orders: number; revenue: number }> = {};

    topItems?.forEach((item: OrderItemRow) => {
      const menu = Array.isArray(item.menu_items) ? item.menu_items[0] : item.menu_items;
      if (!menu) return;

      if (!aggregated[menu.id]) {
        aggregated[menu.id] = {
          name: menu.name,
          category: menu.category,
          orders: 0,
          revenue: 0,
        };
      }

      aggregated[menu.id].orders += item.quantity;
      aggregated[menu.id].revenue += item.price * item.quantity;
    });

    const topSelling = Object.values(aggregated)
      .sort((a, b) => b.orders - a.orders)
      .slice(0, 5);

    // Low/unavailable items
    const { data: unavailable, error: unavailableError } = await supabase
      .from('menu_items')
      .select('id, name, category')
      .eq('is_available', false);

    if (unavailableError) return NextResponse.json({ error: unavailableError.message }, { status: 500 });

    return NextResponse.json({ topSelling, unavailable }, { status: 200 });

  } catch (err) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}