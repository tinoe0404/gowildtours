import { prisma } from '@/lib/prisma';
import { Calendar, Star, Users } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const totalBookings = await prisma.booking.count();
  const totalReviews = await prisma.review.count();
  const pendingReviews = await prisma.review.count({ where: { isApproved: false } });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-gray-600">Total Bookings</h3>
            <Calendar className="h-4 w-4 text-gray-400" />
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900">{totalBookings}</div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-gray-600">Total Reviews</h3>
            <Star className="h-4 w-4 text-gray-400" />
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900">{totalReviews}</div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-gray-600">Pending Reviews</h3>
            <Users className="h-4 w-4 text-gray-400" />
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-600">{pendingReviews}</div>
            <p className="text-xs text-gray-500 mt-1">Require your approval</p>
          </div>
        </div>

      </div>
    </div>
  );
}
