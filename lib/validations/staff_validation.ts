import { z } from 'zod';



export const updateStaffSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  image: z.string().url().optional().nullable(),
  role: z.enum(['staff', 'admin']).optional(),
  is_active: z.boolean().optional(),
});


export const staffIdSchema = z.object({
  staffId: z.string().uuid('Invalid staff ID format'),
});


export const staffLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});


export type UpdateStaffInput = z.infer<typeof updateStaffSchema>;
export type StaffIdInput = z.infer<typeof staffIdSchema>;
export type StaffLoginInput = z.infer<typeof staffLoginSchema>;
