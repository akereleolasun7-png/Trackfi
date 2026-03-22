import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
    try {
        const supabase = await createClient();

        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const { data: orders, error } = await supabase
            .from('orders')
            .select('id, status, total_amount, created_at')
            .gte('created_at', today.toISOString());

        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        
        const hourlyMap: Record<number, number> = {};
        orders?.forEach(o => {
            const hour = new Date(o.created_at).getHours();
            hourlyMap[hour] = (hourlyMap[hour] ?? 0) + 1;
        });

        const hourlyOrders = Array.from({ length: 24 }, (_, i) => ({
            hour: `${i}:00`,
            orders: hourlyMap[i] ?? 0,
        }));
        const total = orders?.length ?? 0;
        const completed = orders?.filter(o => o.status === 'completed').length ?? 0;
        const pending = orders?.filter(o => o.status === 'pending').length ?? 0;
        const preparing = orders?.filter(o => o.status === 'preparing').length ?? 0;
        const totalRevenue = orders?.reduce((sum, o) => sum + (o.total_amount ?? 0), 0) ?? 0;

        return NextResponse.json({ total, completed, pending, preparing, totalRevenue , hourlyOrders}, { status: 200 });

    } catch (err) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}