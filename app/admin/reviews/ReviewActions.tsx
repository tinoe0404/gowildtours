'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
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
        <Button size="sm" variant="outline" className="text-green-600 border-green-200 hover:bg-green-50" onClick={() => handleAction('approve')} disabled={isLoading}>
          <Check className="h-4 w-4 mr-1" /> Approve
        </Button>
      ) : (
        <Button size="sm" variant="outline" className="text-orange-600 border-orange-200 hover:bg-orange-50" onClick={() => handleAction('reject')} disabled={isLoading}>
          <X className="h-4 w-4 mr-1" /> Unapprove
        </Button>
      )}
      <Button size="sm" variant="destructive" onClick={() => handleAction('delete')} disabled={isLoading}>
        <Trash2 className="h-4 w-4 mr-1" /> Delete
      </Button>
    </div>
  );
}
