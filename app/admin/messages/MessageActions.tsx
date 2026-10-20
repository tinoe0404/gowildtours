'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCheck, Mail, Trash2, MailOpen, Eye } from 'lucide-react';
import { toast } from 'sonner';

interface MessageActionsProps {
  messageId: string;
  isRead: boolean;
  email: string;
  subject: string;
  name: string;
}

export default function MessageActions({
  messageId,
  isRead,
  email,
  subject,
  name,
}: MessageActionsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleToggleRead = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/messages/${messageId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRead: !isRead }),
      });

      if (res.ok) {
        toast.success(isRead ? 'Marked as unread' : 'Marked as read');
        router.refresh();
      } else {
        const data = await res.json().catch(() => null);
        toast.error(data?.error || 'Failed to update message status');
      }
    } catch {
      toast.error('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(`Are you sure you want to delete this message from ${name}?`);
    if (!confirmed) return;

    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/messages/${messageId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        toast.success('Message deleted successfully');
        router.refresh();
      } else {
        const data = await res.json().catch(() => null);
        toast.error(data?.error || 'Failed to delete message');
      }
    } catch {
      toast.error('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const mailtoLink = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(
    `Re: ${subject || 'Your Inquiry with GoWild Tours'}`
  )}`;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <a
        href={mailtoLink}
        className="flex items-center text-sm font-medium border border-blue-200 text-blue-700 bg-white hover:bg-blue-50 px-3 py-1.5 rounded-md transition-colors"
        title="Reply via Email"
      >
        <Mail className="h-4 w-4 mr-1 text-blue-600" /> Reply
      </a>

      <button
        onClick={handleToggleRead}
        disabled={isLoading}
        className={`flex items-center text-sm font-medium border px-3 py-1.5 rounded-md transition-colors disabled:opacity-50 ${
          isRead
            ? 'border-gray-300 text-gray-700 bg-white hover:bg-gray-100'
            : 'border-green-200 text-green-700 bg-white hover:bg-green-50'
        }`}
        title={isRead ? 'Mark as Unread' : 'Mark as Read'}
      >
        {isRead ? (
          <>
            <Eye className="h-4 w-4 mr-1 text-gray-500" /> Mark Unread
          </>
        ) : (
          <>
            <CheckCheck className="h-4 w-4 mr-1 text-green-600" /> Mark Read
          </>
        )}
      </button>

      <button
        onClick={handleDelete}
        disabled={isLoading}
        className="flex items-center text-sm font-medium border border-red-200 text-red-700 bg-white hover:bg-red-50 px-3 py-1.5 rounded-md transition-colors disabled:opacity-50"
        title="Delete message"
      >
        <Trash2 className="h-4 w-4 mr-1 text-red-600" /> Delete
      </button>
    </div>
  );
}
