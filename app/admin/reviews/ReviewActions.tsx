'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Trash2, X } from 'lucide-react';
import { toast } from 'sonner';

export default function ReviewActions({ reviewId, isApproved }: { reviewId: string; isApproved: boolean }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleAction = async (action: 'approve' | 'reject' | 'delete') => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/reviews/${reviewId}`, {
        method: action === 'delete' ? 'DELETE' : 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: action !== 'delete' ? JSON.stringify({ isApproved: action === 'approve' }) : undefined,
      });

      if (res.ok) {
        toast.success(`Review ${action}d successfully`);
        router.refresh();
      } else {
        toast.error(`Failed to ${action} review`);
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {!isApproved ? (
        <button 
          className="flex items-center text-sm font-medium border border-green-200 text-green-700 bg-white hover:bg-green-50 px-3 py-1.5 rounded-md transition-colors disabled:opacity-50"
          onClick={() => handleAction('approve')} 
          disabled={isLoading}
        >
          <Check className="h-4 w-4 mr-1" /> Approve
        </button>
      ) : (
        <button 
          className="flex items-center text-sm font-medium border border-orange-200 text-orange-700 bg-white hover:bg-orange-50 px-3 py-1.5 rounded-md transition-colors disabled:opacity-50"
          onClick={() => handleAction('reject')} 
          disabled={isLoading}
        >
          <X className="h-4 w-4 mr-1" /> Unapprove
        </button>
      )}
      <button 
        className="flex items-center text-sm font-medium border border-red-200 text-red-700 bg-white hover:bg-red-50 px-3 py-1.5 rounded-md transition-colors disabled:opacity-50"
        onClick={() => handleAction('delete')} 
        disabled={isLoading}
      >
        <Trash2 className="h-4 w-4 mr-1" /> Delete
      </button>
    </div>
  );
}
