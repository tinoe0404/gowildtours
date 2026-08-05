import { prisma } from '@/lib/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';

export const dynamic = 'force-dynamic';

export default async function AdminBookings() {
  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Bookings</h1>
      
      {bookings.length === 0 ? (
        <p className="text-gray-500">No bookings yet.</p>
      ) : (
        <div className="grid gap-4">
          {bookings.map((booking) => (
            <Card key={booking.id}>
              <CardHeader className="pb-2 flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Ref: {booking.reference}</CardTitle>
                  <p className="text-sm text-gray-500">
                    {format(new Date(booking.createdAt), 'MMM dd, yyyy HH:mm')}
                  </p>
                </div>
                <div className="mt-2 md:mt-0 font-semibold text-green-700 bg-green-50 px-3 py-1 rounded-full w-fit">
                  ${booking.totalPrice.toFixed(2)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium">Customer Details</h3>
                    <p className="text-sm">Name: {booking.customerName}</p>
                    <p className="text-sm">Email: {booking.customerEmail}</p>
                    {booking.customerPhone && <p className="text-sm">Phone: {booking.customerPhone}</p>}
                    {booking.nationality && <p className="text-sm">Nationality: {booking.nationality}</p>}
                  </div>
                  <div>
                    <h3 className="font-medium">Booking Info</h3>
                    <p className="text-sm">Status: {booking.status}</p>
                    <div className="text-sm mt-2">
                      <span className="font-medium">Items:</span>
                      <pre className="bg-gray-50 p-2 rounded text-xs mt-1 overflow-x-auto">
                        {JSON.stringify(booking.items, null, 2)}
                      </pre>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
