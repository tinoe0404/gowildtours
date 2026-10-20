import { prisma } from '@/lib/prisma';
import { Calendar, Star, MessageSquare, ArrowRight, Clock, Mail, Tag } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const [totalBookings, totalReviews, pendingReviews, totalMessages, unreadMessages, recentMessages] =
    await Promise.all([
      prisma.booking.count(),
      prisma.review.count(),
      prisma.review.count({ where: { isApproved: false } }),
      prisma.message.count(),
      prisma.message.count({ where: { isRead: false } }),
      prisma.message.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-sm text-gray-500 mt-1">Welcome to the GoWild Tours admin portal</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Link
          href="/admin/bookings"
          className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-green-300 hover:shadow transition-all group"
        >
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-gray-600">Total Bookings</h3>
            <div className="p-2 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
              <Calendar className="h-4 w-4 text-green-700" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900">{totalBookings}</div>
            <p className="text-xs text-gray-400 mt-1">Tour reservations</p>
          </div>
        </Link>

        <Link
          href="/admin/messages"
          className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-blue-300 hover:shadow transition-all group"
        >
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-gray-600">Messages & Inquiries</h3>
            <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
              <MessageSquare className="h-4 w-4 text-blue-700" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900">{totalMessages}</div>
            <div className="flex items-center gap-1.5 mt-1">
              {unreadMessages > 0 ? (
                <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                  {unreadMessages} new unread
                </span>
              ) : (
                <span className="text-xs text-gray-400">All caught up</span>
              )}
            </div>
          </div>
        </Link>

        <Link
          href="/admin/reviews"
          className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-yellow-300 hover:shadow transition-all group"
        >
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-gray-600">Total Reviews</h3>
            <div className="p-2 bg-yellow-50 rounded-lg group-hover:bg-yellow-100 transition-colors">
              <Star className="h-4 w-4 text-yellow-600" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900">{totalReviews}</div>
            <p className="text-xs text-gray-400 mt-1">Guest feedback</p>
          </div>
        </Link>

        <Link
          href="/admin/reviews"
          className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-orange-300 hover:shadow transition-all group"
        >
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-gray-600">Pending Reviews</h3>
            <div className="p-2 bg-orange-50 rounded-lg group-hover:bg-orange-100 transition-colors">
              <Star className="h-4 w-4 text-orange-600" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-600">{pendingReviews}</div>
            <p className="text-xs text-orange-500 mt-1">Require moderation</p>
          </div>
        </Link>
      </div>

      {/* Recent Messages Section */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Recent Tourist Messages</h2>
            <p className="text-xs text-gray-500 mt-0.5">Latest contact submissions from website visitors</p>
          </div>
          <Link
            href="/admin/messages"
            className="flex items-center text-sm font-medium text-green-700 hover:text-green-800 transition-colors"
          >
            View all messages <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        {recentMessages.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-sm">
            No inquiries received yet. Tourist messages from the contact page will appear here.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {recentMessages.map((msg) => (
              <div
                key={msg.id}
                className={`p-5 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  msg.isRead ? 'hover:bg-gray-50' : 'bg-blue-50/30 hover:bg-blue-50/50'
                }`}
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-gray-900 text-sm">{msg.name}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        msg.isRead
                          ? 'bg-gray-100 text-gray-600'
                          : 'bg-blue-600 text-white'
                      }`}
                    >
                      {msg.isRead ? 'Read' : 'New'}
                    </span>
                    <span className="inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                      <Tag className="h-3 w-3 mr-1" />
                      {msg.inquiryType}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-800 truncate">{msg.subject}</p>
                  <p className="text-xs text-gray-500 line-clamp-1">{msg.message}</p>
                </div>

                <div className="flex items-center gap-4 text-xs text-gray-500 shrink-0">
                  <span className="flex items-center">
                    <Mail className="h-3.5 w-3.5 mr-1 text-gray-400" />
                    {msg.email}
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-3.5 w-3.5 mr-1 text-gray-400" />
                    {format(new Date(msg.createdAt), 'MMM dd, HH:mm')}
                  </span>
                  <Link
                    href="/admin/messages"
                    className="text-xs font-semibold text-green-700 bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded-md transition-colors"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
