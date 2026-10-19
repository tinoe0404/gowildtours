import { prisma } from '@/lib/prisma';
import { format } from 'date-fns';
import BookingActions from './BookingActions';

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
              <div className="pb-4 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Ref: {booking.reference}</h3>
                  <p className="text-sm text-gray-500">
                    {format(new Date(booking.createdAt), 'MMM dd, yyyy HH:mm')}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="font-semibold text-green-700 bg-green-50 px-3 py-1 rounded-full text-sm">
                    ${booking.totalPrice.toFixed(2)}
                  </div>
                  <BookingActions 
                    bookingId={booking.id} 
                    reference={booking.reference} 
                    currentStatus={booking.status} 
                  />
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
                  <p className="text-sm text-gray-700 mb-3">
                    <span className="font-medium text-gray-900">Status: </span> 
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${
                      booking.status === 'CONFIRMED' 
                        ? 'bg-green-100 text-green-800' 
                        : booking.status === 'CANCELLED' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {booking.status}
                    </span>
                  </p>
                  {booking.specialRequests && (
                    <p className="text-sm text-gray-700 mb-3">
                      <span className="font-medium text-gray-900">Special Requests: </span>
                      {booking.specialRequests}
                    </p>
                  )}
                  <span className="font-medium text-gray-900 text-sm block mb-2">Booked Tours:</span>
                  <div className="space-y-2">
                    {((Array.isArray(booking.items) ? booking.items : []) as Array<{
                      name?: string;
                      date?: string;
                      duration?: string;
                      travelers?: number | string;
                      pricePerPerson?: number | string;
                    }>).map((item, idx) => (
                      <div key={idx} className="bg-gray-50 border border-gray-100 rounded-lg p-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 text-sm truncate">{String(item.name || 'Tour')}</p>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-xs text-gray-500">
                            {item.date ? (
                              <span>📅 {String(item.date)}</span>
                            ) : null}
                            {item.duration ? (
                              <span>🕐 {String(item.duration)}</span>
                            ) : null}
                            {item.travelers ? (
                              <span>👥 {String(item.travelers)} traveler{Number(item.travelers) !== 1 ? 's' : ''}</span>
                            ) : null}
                          </div>
                        </div>
                        {item.pricePerPerson ? (
                          <div className="text-sm font-semibold text-green-700 whitespace-nowrap">
                            ${Number(item.pricePerPerson).toLocaleString()} <span className="text-xs font-normal text-gray-400">/person</span>
                          </div>
                        ) : null}
                      </div>
                    ))}
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
