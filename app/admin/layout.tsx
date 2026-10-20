'use client';

import { useRouter, usePathname } from 'next/navigation';
import { LogOut, LayoutDashboard, Calendar, Star, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

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

  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return <>{children}</>;
  }

  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/bookings', label: 'Bookings', icon: Calendar },
    { href: '/admin/messages', label: 'Messages', icon: MessageSquare },
    { href: '/admin/reviews', label: 'Reviews', icon: Star },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-white border-r border-gray-200 md:min-h-screen p-4 flex flex-col gap-4">
        <div className="font-bold text-xl mb-4 text-green-900">Admin Dashboard</div>
        <nav className="flex-1 flex flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 p-2 rounded-md transition-colors ${
                  isActive
                    ? 'bg-green-50 text-green-900 font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-5 w-5" /> {item.label}
              </Link>
            );
          })}
        </nav>
        <button 
          className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 text-gray-700 hover:bg-gray-50 transition-colors" 
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" /> Logout
        </button>
      </aside>
      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
