'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut, LayoutDashboard, Calendar, Star } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      toast.success('Logged out');
      router.push('/admin/login');
      router.refresh();
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-white border-r border-gray-200 md:min-h-screen p-4 flex flex-col gap-4">
        <div className="font-bold text-xl mb-4 text-green-900">Admin Dashboard</div>
        <nav className="flex-1 flex flex-col gap-2">
          <Link href="/admin/dashboard" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 transition-colors">
            <LayoutDashboard className="h-5 w-5" /> Dashboard
          </Link>
          <Link href="/admin/bookings" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 transition-colors">
            <Calendar className="h-5 w-5" /> Bookings
          </Link>
          <Link href="/admin/reviews" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 transition-colors">
            <Star className="h-5 w-5" /> Reviews
          </Link>
        </nav>
        <Button variant="outline" className="w-full flex items-center justify-center gap-2" onClick={handleLogout}>
          <LogOut className="h-4 w-4" /> Logout
        </Button>
      </aside>
      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
