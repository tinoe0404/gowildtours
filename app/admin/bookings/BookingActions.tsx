'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, CheckCircle, Clock, XCircle } from 'lucide-react';
import { toast } from 'sonner';

interface BookingActionsProps {
  bookingId: string;
  reference: string;
  currentStatus: string;
}

export default function BookingActions({ bookingId, reference, currentStatus }: BookingActionsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleStatusChange = async (newStatus: string) => {
    if (newStatus === currentStatus) return;
    setIsLoading(true);

    try {
      const res = await fetch(`/api/admin/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        toast.success(`Booking ${reference} marked as ${newStatus}`);
        router.refresh();
      } else {
        const data = await res.json().catch(() => null);
        toast.error(data?.error || 'Failed to update booking status');
      }
    } catch (error) {
      toast.error('An error occurred while updating status');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to permanently delete booking #${reference}? This cannot be undone.`
    );
    if (!confirmed) return;

    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/bookings/${bookingId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        toast.success(`Booking #${reference} deleted successfully`);
        router.refresh();
      } else {
        const data = await res.json().catch(() => null);
        toast.error(data?.error || 'Failed to delete booking');
      }
    } catch (error) {
      toast.error('An error occurred while deleting booking');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Quick Status Selector */}
      <select
        value={currentStatus}
        onChange={(e) => handleStatusChange(e.target.value)}
        disabled={isLoading}
        className="text-xs font-medium border border-gray-300 bg-white text-gray-700 rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-green-500 cursor-pointer disabled:opacity-50"
      >
        <option value="PENDING">Status: PENDING</option>
        <option value="CONFIRMED">Status: CONFIRMED</option>
        <option value="CANCELLED">Status: CANCELLED</option>
      </select>

      {/* Delete Button */}
      <button
        type="button"
        onClick={handleDelete}
        disabled={isLoading}
        className="flex items-center text-xs font-medium border border-red-200 text-red-600 bg-white hover:bg-red-50 hover:border-red-300 px-3 py-1.5 rounded-md transition-colors disabled:opacity-50 cursor-pointer"
        title="Delete booking permanently"
      >
        <Trash2 className="h-3.5 w-3.5 mr-1" />
        {isLoading ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  );
}
