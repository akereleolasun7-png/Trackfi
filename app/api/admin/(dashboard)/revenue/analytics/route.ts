import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const now = new Date();

    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0);

    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - 7);

    const monthStart = new Date(now);
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);

    const { data: orders, error } = await supabase
      .from('orders')
      .select('total_amount, created_at')
      .gte('created_at', monthStart.toISOString())
      .eq('status', 'completed');

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    const today = orders
      ?.filter(o => new Date(o.created_at) >= todayStart)
      .reduce((sum, o) => sum + (o.total_amount ?? 0), 0) ?? 0;

    const thisWeek = orders
      ?.filter(o => new Date(o.created_at) >= weekStart)
      .reduce((sum, o) => sum + (o.total_amount ?? 0), 0) ?? 0;

    const thisMonth = orders
      ?.reduce((sum, o) => sum + (o.total_amount ?? 0), 0) ?? 0;



    const dailyMap: Record<string, number> = {};
    orders?.forEach(o => {
      const date = new Date(o.created_at).toLocaleDateString('en-GB', {
        day: '2-digit', month: 'short'
      });
      dailyMap[date] = (dailyMap[date] ?? 0) + (o.total_amount ?? 0);
    });

    const dailyRevenue: { date: string; revenue: number }[] = Object.entries(dailyMap)
      .map(([date, revenue]) => ({ date, revenue }))
      .slice(-7); 

    return NextResponse.json({ today, thisWeek, thisMonth, dailyRevenue }, { status: 200 });

  } catch (err) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}