import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

interface RouteParams {
  params: Promise<{ cartItemId: string }>;
}

interface UpdateBody {
  quantity: number;
}

export async function PATCH(req: Request, { params }: RouteParams) {
  try {
    const { cartItemId } = await params;
    const supabase = await createClient();

    // 1️⃣ Verify session
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

    // 2️⃣ Parse and validate body
    const body: UpdateBody = await req.json();
    if (!body.quantity || body.quantity < 1) {
      return NextResponse.json({ error: 'Quantity must be at least 1' }, { status: 400 });
    }

    // 3️⃣ Update cart item — must belong to this session for security
    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity: body.quantity })
      .eq('id', cartItemId)
      .eq('table_session_id', session.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Cart item updated', item: data }, { status: 200 });

  } catch (err) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}