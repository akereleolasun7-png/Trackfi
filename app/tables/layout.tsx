// app/menu/[table]/layout.tsx
import { Providers } from "@/provider";
interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ table: string }>;
}

export default async function Layout({ children, params }: LayoutProps) {

  return (
    
    <Providers>
        <div>
            {children}
        </div>
    </Providers>

  );
}