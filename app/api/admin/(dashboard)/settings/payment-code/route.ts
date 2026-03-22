import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import {updateRestaurantSettingsSchema} from '@/lib/validations/settings'
export async function PUT(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    const { order_code } = updateRestaurantSettingsSchema.parse(body);
    
    
    if (order_code && !/^\d{4}$/.test(order_code.toString())) {
      return NextResponse.json(
        { success: false, error: 'Order code must be exactly 4 digits' },
        { status: 400 }
      );
    }
    
    const { data: currentRestaurant } = await supabase
      .from('restaurant')
      .select('id')
      .limit(1)
      .single();
    
    if (!currentRestaurant) {
      return NextResponse.json(
        { success: false, error: 'Restaurant not found' },
        { status: 404 }
      );
    }
    
    
    const updateData: Record<string, string | number | boolean> = {
      updated_at: new Date().toISOString()
    };

    if (order_code !== undefined) {
      updateData.order_code = order_code;
    }

    
  
    const { data: restaurant, error } = await supabase
      .from('restaurant')
      .update(updateData)
      .eq('id', currentRestaurant.id)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to update restaurant settings' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      data: restaurant 
    }, { status: 200 });
    
  } catch (error) {
    console.error('Error updating restaurant:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update restaurant settings' },
      { status: 500 }
    );
  }
}