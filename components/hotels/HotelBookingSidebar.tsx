'use client';

import React from 'react';
import { Calendar, Users, ChevronDown, ShieldCheck, Zap, Info, MessageSquare, Phone } from 'lucide-react';
import { Hotel } from '../../lib/types/hotel';
import SafariBadge from '../ui/SafariBadge';

interface HotelBookingSidebarProps {
    hotel: Hotel;
}

export const HotelBookingSidebar: React.FC<HotelBookingSidebarProps> = ({ hotel }) => {
    const [guests, setGuests] = React.useState(2);
    const [rooms, setRooms] = React.useState(1);

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sticky top-24 overflow-hidden">
            {/* Price Header */}
            <div className="flex items-baseline justify-between mb-6">
                <div>
                    <span className="text-3xl font-bold text-gray-900">${hotel.pricing.pricePerNightFrom}</span>
                    <span className="text-gray-500 ml-1 text-sm font-medium">/ night</span>
                </div>
                <SafariBadge variant="success" className="text-[10px] font-bold uppercase py-1 px-2">Available</SafariBadge>
            </div>

            {/* Booking Form Shell */}
            <div className="space-y-4 mb-8">
                <div className="grid grid-cols-2 gap-0 border border-gray-200 rounded-xl overflow-hidden">
                    <button className="p-3 text-left border-r border-gray-200 hover:bg-gray-50 transition-colors">
                        <span className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Check-in</span>
                        <span className="text-sm font-medium text-gray-900 flex items-center">
                            <Calendar className="w-3.5 h-3.5 mr-2 text-primary-600" />
                            Add date
                        </span>
                    </button>
                    <button className="p-3 text-left hover:bg-gray-50 transition-colors">
                        <span className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Check-out</span>
                        <span className="text-sm font-medium text-gray-900 flex items-center">
                            <Calendar className="w-3.5 h-3.5 mr-2 text-primary-600" />
                            Add date
                        </span>
                    </button>
                    <button className="col-span-2 p-3 text-left border-t border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-between">
                        <div>
                            <span className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Guests</span>
                            <span className="text-sm font-medium text-gray-900 flex items-center">
                                <Users className="w-3.5 h-3.5 mr-2 text-primary-600" />
                                {guests} Guests, {rooms} Room
                            </span>
                        </div>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                    </button>
                </div>

                <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-primary-600/20 transform active:scale-[0.98]">
                    Reserve Now
                </button>
                <p className="text-center text-xs text-gray-500">You won't be charged yet</p>
            </div>

            {/* Price Breakdown (Partial) */}
            <div className="space-y-3 mb-8">
                <div className="flex justify-between text-sm text-gray-600">
                    <span className="underline decoration-gray-300 underline-offset-4 cursor-help">${hotel.pricing.pricePerNightFrom} x 3 nights</span>
                    <span>${hotel.pricing.pricePerNightFrom * 3}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                    <span className="underline decoration-gray-300 underline-offset-4 cursor-help">Taxes & fees</span>
                    <span>$85</span>
                </div>
                <div className="pt-3 border-t border-gray-100 flex justify-between font-bold text-gray-900">
                    <span>Total</span>
                    <span>${hotel.pricing.pricePerNightFrom * 3 + 85}</span>
                </div>
            </div>

            {/* Trust Items */}
            <div className="space-y-4 pt-6 border-t border-gray-100">
                <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                        <ShieldCheck className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                        <h5 className="text-xs font-bold text-gray-900">Secure booking</h5>
                        <p className="text-[10px] text-gray-500">Your details are protected by 256-bit SSL encryption</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <Zap className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                        <h5 className="text-xs font-bold text-gray-900">Instant confirmation</h5>
                        <p className="text-[10px] text-gray-500">Most bookings are confirmed immediately after payment</p>
                    </div>
                </div>
            </div>

            {/* Alternative Actions */}
            <div className="mt-8 flex flex-col gap-2">
                <button className="w-full border border-gray-200 hover:bg-gray-50 text-gray-700 py-3 rounded-lg text-sm font-bold transition-colors flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Request a Quote
                </button>
                <div className="flex items-center justify-center gap-4 mt-4 text-gray-500 text-xs">
                    <a href="#" className="hover:text-primary-600 flex items-center"><Phone className="w-3 h-3 mr-1" /> Call Us</a>
                    <span className="w-1 h-1 bg-gray-300 rounded-full" />
                    <a href="#" className="hover:text-primary-600 flex items-center"><Info className="w-3 h-3 mr-1" /> FAQ</a>
                </div>
            </div>
        </div>
    );
};
