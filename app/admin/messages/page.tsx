import { prisma } from '@/lib/prisma';
import { format } from 'date-fns';
import { Mail, Phone, Clock, MessageSquare, Tag } from 'lucide-react';
import MessageActions from './MessageActions';

export const dynamic = 'force-dynamic';

export default async function AdminMessages() {
  const messages = await prisma.message.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tourist Messages & Inquiries</h1>
          <p className="text-sm text-gray-500 mt-1">
            Messages and inquiries submitted by visitors from the contact form
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white border border-gray-200 px-4 py-2 rounded-lg shadow-sm text-sm">
            <span className="text-gray-500">Total:</span>{' '}
            <span className="font-bold text-gray-900">{messages.length}</span>
          </div>
          <div className={`px-4 py-2 rounded-lg text-sm border shadow-sm ${
            unreadCount > 0 
              ? 'bg-amber-50 text-amber-800 border-amber-200' 
              : 'bg-green-50 text-green-800 border-green-200'
          }`}>
            <span className="font-semibold">{unreadCount}</span> Unread
          </div>
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-xl border border-gray-200 shadow-sm space-y-3">
          <MessageSquare className="h-12 w-12 text-gray-300 mx-auto" />
          <h3 className="text-lg font-semibold text-gray-800">No messages yet</h3>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            When tourists send inquiries or contact messages through the website, they will appear right here.
          </p>
        </div>
      ) : (
        <div className="grid gap-5">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-6 rounded-xl border shadow-sm transition-all ${
                msg.isRead
                  ? 'border-gray-200 bg-white'
                  : 'border-blue-300 bg-blue-50/40 ring-1 ring-blue-100'
              }`}
            >
              {/* Header */}
              <div className="pb-4 border-b border-gray-100 flex flex-col md:flex-row md:items-start justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-lg font-bold text-gray-900">{msg.name}</h3>
                    <span
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                        msg.isRead
                          ? 'bg-gray-100 text-gray-600'
                          : 'bg-blue-600 text-white animate-pulse'
                      }`}
                    >
                      {msg.isRead ? 'Read' : 'New / Unread'}
                    </span>
                    <span className="inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      <Tag className="h-3 w-3 mr-1" />
                      {msg.inquiryType}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-gray-600">
                    <a
                      href={`mailto:${msg.email}`}
                      className="flex items-center hover:text-green-700 underline underline-offset-2"
                    >
                      <Mail className="h-3.5 w-3.5 mr-1 text-gray-400" />
                      {msg.email}
                    </a>
                    {msg.phone && (
                      <a
                        href={`tel:${msg.phone}`}
                        className="flex items-center hover:text-green-700"
                      >
                        <Phone className="h-3.5 w-3.5 mr-1 text-gray-400" />
                        {msg.phone}
                      </a>
                    )}
                    <span className="flex items-center text-gray-400 text-xs">
                      <Clock className="h-3.5 w-3.5 mr-1 text-gray-400" />
                      {format(new Date(msg.createdAt), 'MMM dd, yyyy • HH:mm')}
                    </span>
                  </div>
                </div>

                <MessageActions
                  messageId={msg.id}
                  isRead={msg.isRead}
                  email={msg.email}
                  subject={msg.subject}
                  name={msg.name}
                />
              </div>

              {/* Subject & Content */}
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900 text-base">
                  <span className="text-gray-500 font-normal">Subject:</span> {msg.subject}
                </h4>
                <div className="bg-gray-50/80 rounded-lg p-4 border border-gray-100">
                  <p className="text-gray-800 whitespace-pre-wrap leading-relaxed text-sm">
                    {msg.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
