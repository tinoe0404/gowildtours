import { prisma } from '@/lib/prisma';
import { Calendar, Star, MessageSquare, ArrowRight, Clock, Mail, Compass, Users, Phone, Send } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { parseInquiryDetails } from '@/lib/inquiry';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const [totalBookings, totalReviews, pendingReviews, allMessages] = await Promise.all([
    prisma.booking.count(),
    prisma.review.count(),
    prisma.review.count({ where: { isApproved: false } }),
    prisma.message.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
    }),
  ]);

  const packageInquiries = allMessages.filter((msg) => {
    const parsed = parseInquiryDetails(msg);
    return parsed.isPackageInquiry;
  });

  const generalMessages = allMessages.filter((msg) => {
    const parsed = parseInquiryDetails(msg);
    return !parsed.isPackageInquiry;
  });

  const unreadCount = allMessages.filter((m) => !m.isRead).length;

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
          className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-amber-300 hover:shadow transition-all group"
        >
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-gray-600">Safari Inquiries</h3>
            <div className="p-2 bg-amber-50 rounded-lg group-hover:bg-amber-100 transition-colors">
              <Compass className="h-4 w-4 text-amber-700" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-amber-700">{packageInquiries.length}</div>
            <p className="text-xs text-gray-400 mt-1">"Prefer to Inquire" leads</p>
          </div>
        </Link>

        <Link
          href="/admin/messages"
          className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-blue-300 hover:shadow transition-all group"
        >
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-gray-600">All Messages</h3>
            <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
              <MessageSquare className="h-4 w-4 text-blue-700" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900">{allMessages.length}</div>
            <div className="flex items-center gap-1.5 mt-1">
              {unreadCount > 0 ? (
                <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                  {unreadCount} unread
                </span>
              ) : (
                <span className="text-xs text-gray-400">All messages caught up</span>
              )}
            </div>
          </div>
        </Link>

        <Link
          href="/admin/reviews"
          className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-orange-300 hover:shadow transition-all group"
        >
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-gray-600">Reviews Pending</h3>
            <div className="p-2 bg-orange-50 rounded-lg group-hover:bg-orange-100 transition-colors">
              <Star className="h-4 w-4 text-orange-600" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-600">{pendingReviews}</div>
            <p className="text-xs text-gray-400 mt-1">{totalReviews} total reviews</p>
          </div>
        </Link>
      </div>

      {/* Prefer to Inquire (Safari Package Inquiries) Section */}
      <div className="bg-white rounded-xl border border-amber-200/80 shadow-sm overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-amber-50/60 to-white border-b border-amber-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-amber-100 text-amber-800 rounded-md">
                <Compass className="h-4 w-4" />
              </span>
              <h2 className="text-lg font-bold text-gray-900">Safari Package Inquiries ("Prefer to Inquire")</h2>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Tourists inquiring directly about specific safari packages, dates, and group sizes
            </p>
          </div>
          <Link
            href="/admin/messages"
            className="flex items-center text-sm font-semibold text-amber-800 hover:text-amber-900 transition-colors"
          >
            Manage All Messages <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        {packageInquiries.length === 0 ? (
          <div className="p-10 text-center text-gray-500 text-sm space-y-1">
            <Compass className="h-10 w-10 text-gray-300 mx-auto mb-2" />
            <p className="font-semibold text-gray-700">No package inquiries received yet.</p>
            <p className="text-xs text-gray-400">
              When tourists submit the "Prefer to inquire?" form on safari pages, their inquiries appear here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {packageInquiries.slice(0, 6).map((msg) => {
              const details = parseInquiryDetails(msg);
              return (
                <div
                  key={msg.id}
                  className={`p-6 transition-colors ${
                    msg.isRead ? 'hover:bg-gray-50' : 'bg-amber-50/20 hover:bg-amber-50/40'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-3">
                    {/* Tourist & Package Info */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-gray-900 text-base">{msg.name}</span>
                        <span
                          className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                            msg.isRead ? 'bg-gray-100 text-gray-600' : 'bg-blue-600 text-white'
                          }`}
                        >
                          {msg.isRead ? 'Read' : 'New Lead'}
                        </span>
                        {details.packageTitle && (
                          <span className="inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                            🦁 {details.packageTitle}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-600 pt-1">
                        <a
                          href={`mailto:${msg.email}?subject=Re: Safari Inquiry for ${details.packageTitle || 'GoWild Tours'}`}
                          className="flex items-center text-blue-700 hover:underline font-medium"
                        >
                          <Mail className="h-3.5 w-3.5 mr-1 text-gray-400" />
                          {msg.email}
                        </a>
                        {msg.phone && (
                          <a href={`tel:${msg.phone}`} className="flex items-center hover:underline">
                            <Phone className="h-3.5 w-3.5 mr-1 text-gray-400" />
                            {msg.phone}
                          </a>
                        )}
                        <span className="flex items-center text-gray-400">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          {format(new Date(msg.createdAt), 'MMM dd, yyyy • HH:mm')}
                        </span>
                      </div>
                    </div>

                    {/* Quick Action */}
                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={`mailto:${msg.email}?subject=Re: Safari Inquiry for ${details.packageTitle || 'GoWild Tours'}`}
                        className="inline-flex items-center text-xs font-semibold bg-green-700 hover:bg-green-800 text-white px-3.5 py-1.5 rounded-md shadow-sm transition-colors"
                      >
                        <Send className="h-3.5 w-3.5 mr-1" /> Reply to Tourist
                      </a>
                      <Link
                        href="/admin/messages"
                        className="inline-flex items-center text-xs font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-md transition-colors"
                      >
                        View in Messages
                      </Link>
                    </div>
                  </div>

                  {/* Structured Details Box */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-white p-3.5 rounded-lg border border-gray-200/80 text-xs shadow-xs mb-3">
                    <div>
                      <span className="text-gray-400 block font-medium">Safari Package</span>
                      <span className="text-gray-900 font-semibold">{details.packageTitle || 'General Safari Inquiry'}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block font-medium">Travelers</span>
                      <span className="text-gray-900 font-semibold flex items-center gap-1">
                        <Users className="h-3.5 w-3.5 text-gray-400" /> {details.travelers || 'Not specified'}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400 block font-medium">Preferred Travel Date</span>
                      <span className="text-gray-900 font-semibold flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-gray-400" /> {details.preferredDate || 'Flexible'}
                      </span>
                    </div>
                  </div>

                  {/* Tourist Questions / Message */}
                  {details.customerNote && (
                    <div className="text-xs text-gray-700 bg-gray-50/80 rounded-md p-3 border border-gray-100">
                      <span className="font-semibold text-gray-900">Message / Questions: </span>
                      <span className="whitespace-pre-wrap">{details.customerNote}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* General Contact Messages Section */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">General Website Inquiries</h2>
            <p className="text-xs text-gray-500 mt-0.5">Contact submissions from the contact page</p>
          </div>
          <Link
            href="/admin/messages"
            className="flex items-center text-sm font-medium text-green-700 hover:text-green-800 transition-colors"
          >
            View all messages <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        {generalMessages.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-sm">
            No general contact submissions yet.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {generalMessages.slice(0, 4).map((msg) => (
              <div
                key={msg.id}
                className={`p-5 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  msg.isRead ? 'hover:bg-gray-50' : 'bg-blue-50/20 hover:bg-blue-50/40'
                }`}
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-gray-900 text-sm">{msg.name}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        msg.isRead ? 'bg-gray-100 text-gray-600' : 'bg-blue-600 text-white'
                      }`}
                    >
                      {msg.isRead ? 'Read' : 'New'}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
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
