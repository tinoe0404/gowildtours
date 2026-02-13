import Link from 'next/link'
import { Map, Home } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function NotFound() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
            <div className="bg-beige/30 p-6 rounded-full mb-6 relative">
                <Map className="h-16 w-16 text-primary" />
                <div className="absolute -bottom-2 -right-2 bg-accent text-white p-2 rounded-full h-10 w-10 flex items-center justify-center">
                    <span className="text-xl font-bold">?</span>
                </div>
            </div>
            <h2 className="text-4xl font-display font-bold text-dark-deep mb-4">Page Not Found</h2>
            <p className="text-warm-gray text-lg max-w-md mb-8">
                Effectively lost in the wild. We couldn't find the page you're looking for.
            </p>
            <Link href="/">
                <Button variant="primary" size="lg">
                    <Home className="h-4 w-4" />
                    Return Base
                </Button>
            </Link>
        </div>
    )
}
