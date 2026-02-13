'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
            <div className="bg-red-50 p-6 rounded-full mb-6">
                <AlertTriangle className="h-16 w-16 text-red-500" />
            </div>
            <h2 className="text-3xl font-display font-bold text-dark-deep mb-4">Something went wrong!</h2>
            <p className="text-warm-gray text-lg max-w-md mb-8">
                We encountered an unexpected error. Our team has been notified.
            </p>
            <div className="flex gap-4">
                <Button
                    onClick={() => reset()}
                    variant="primary"
                >
                    <RefreshCw className="h-4 w-4" />
                    Try Again
                </Button>
                <Button
                    onClick={() => window.location.href = '/'}
                    variant="outline"
                >
                    Go Home
                </Button>
            </div>
        </div>
    )
}
