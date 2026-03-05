import { z } from 'zod';

export const updateRestaurantSettingsSchema = z.object({
  table_count: z.number().int().min(1, 'Must have at least 1 table').optional(),
  order_code: z.number().int().min(1000).max(9999).optional(),
  accepting_orders: z.boolean().optional(),
});

export type UpdateRestaurantSettingsInput = z.infer<typeof updateRestaurantSettingsSchema>;