import { prisma } from '@/lib/prisma';
import { format } from 'date-fns';

export const dynamic = 'force-dynamic';

export default async function AdminBookings() {
  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Bookings</h1>
      
      {bookings.length === 0 ? (
        <p className="text-gray-500">No bookings yet.</p>
      ) : (
        <div className="grid gap-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="pb-4 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Ref: {booking.reference}</h3>
                  <p className="text-sm text-gray-500">
                    {format(new Date(booking.createdAt), 'MMM dd, yyyy HH:mm')}
                  </p>
                </div>
                <div className="mt-2 md:mt-0 font-semibold text-green-700 bg-green-50 px-3 py-1 rounded-full w-fit">
                  ${booking.totalPrice.toFixed(2)}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Customer Details</h4>
                  <p className="text-sm text-gray-700"><span className="font-medium text-gray-900">Name:</span> {booking.customerName}</p>
                  <p className="text-sm text-gray-700"><span className="font-medium text-gray-900">Email:</span> {booking.customerEmail}</p>
                  {booking.customerPhone && <p className="text-sm text-gray-700"><span className="font-medium text-gray-900">Phone:</span> {booking.customerPhone}</p>}
                  {booking.nationality && <p className="text-sm text-gray-700"><span className="font-medium text-gray-900">Nationality:</span> {booking.nationality}</p>}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Booking Info</h4>
                  <p className="text-sm text-gray-700"><span className="font-medium text-gray-900">Status:</span> {booking.status}</p>
                  <div className="text-sm mt-2">
                    <span className="font-medium text-gray-900 block mb-1">Items:</span>
                    <pre className="bg-gray-50 p-3 rounded-md text-xs overflow-x-auto border border-gray-100 text-gray-700">
                      {JSON.stringify(booking.items, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
