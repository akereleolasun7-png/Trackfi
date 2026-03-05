"use client";
import { useUser } from "@/context/UserContext";
import AdminComponent from '@/components/dashboard/admin/dashboard/adminDashboard'
import StaffComponent from '@/components/dashboard/staff/staffDashboard'
export default function AdminHomePage() {
  const { user, staff } = useUser();

  return (
    <>
    {staff.role ==="admin"? 
        <>
          <AdminComponent/>
        </>
    : 
    
        <>
              <StaffComponent/>
          
        </>
    }
    
    </>
  );
}

