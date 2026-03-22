import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function PUT(req: NextRequest) {
  const supabase = await createClient();

  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { orderId, status } = await req.json();
  if (!orderId || !status) {
    return NextResponse.json({ error: 'Missing orderId or status' }, { status: 400 });
  }

  const VALID_STATUSES = ['pending', 'preparing', 'ready', 'completed', 'cancelled'];
  if (!VALID_STATUSES.includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }

 const { data, error } = await supabase
  .from('orders')
  .update({ status, updated_at: new Date().toISOString() })
  .eq('id', orderId)
  .select()
  .maybeSingle(); 
  
if (!data && !error) {
  return NextResponse.json({ error: 'Order not found' }, { status: 404 });
}

  return NextResponse.json(data);
}