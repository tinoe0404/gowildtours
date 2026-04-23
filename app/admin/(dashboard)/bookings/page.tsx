"use client";

import { useEffect, useState } from "react";
import DataTable, { Column } from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

type Booking = {
    id: string;
    bookingReference: string;
    customerName: string;
    customerEmail: string;
    type: string;
    checkInDate: string;
    checkOutDate: string;
    numberOfAdults: number;
    totalPrice: number;
    subtotal: number;
    paymentStatus: string;
    paymentMethod: string;
    bookingStatus: string;
    createdAt: string;
    metadata: {
        depositPaid?: number;
        remainingBalance?: number;
        paypalOrderId?: string;
        paypalCaptureId?: string;
    } | null;
};

const statusFilters = ["all", "pending", "confirmed", "completed", "cancelled"];

export default function BookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [activeFilter, setActiveFilter] = useState("all");
    const router = useRouter();

    useEffect(() => {
        const params = new URLSearchParams();
        if (activeFilter !== "all") params.set("status", activeFilter);
        fetch(`/api/admin/bookings?${params}`)
            .then((r) => r.json())
            .then((d) => setBookings(d.bookings || []))
            .catch(console.error);
    }, [activeFilter]);

    /** Extract deposit paid from metadata or subtotal field */
    const getDepositPaid = (r: Booking) => {
        const deposit = r.metadata?.depositPaid || (r.paymentStatus === "deposit_paid" ? Number(r.subtotal) : 0);
        return deposit > 0 ? `$${Number(deposit).toLocaleString()}` : "—";
    };

    /** Extract remaining balance from metadata or calculate it */
    const getRemainingBalance = (r: Booking) => {
        if (r.metadata?.remainingBalance != null) return `$${Number(r.metadata.remainingBalance).toLocaleString()}`;
        if (r.paymentStatus === "deposit_paid" && r.totalPrice && r.subtotal) {
            return `$${(Number(r.totalPrice) - Number(r.subtotal)).toLocaleString()}`;
        }
        return "—";
    };

    const columns: Column<Booking>[] = [
        { key: "bookingReference", label: "Reference", sortable: true },
        { key: "customerName", label: "Customer", sortable: true },
        { key: "type", label: "Type", render: (r) => <StatusBadge status={r.type} /> },
        { key: "checkInDate", label: "Check-in", sortable: true, render: (r) => r.checkInDate ? format(new Date(r.checkInDate), "MMM d, yyyy") : "—" },
        { key: "totalPrice", label: "Total", render: (r) => r.totalPrice ? `$${Number(r.totalPrice).toLocaleString()}` : "—" },
        {
            key: "subtotal", label: "Deposit Paid", render: (r) => (
                <span className={r.paymentStatus === "deposit_paid" ? "text-green-700 font-semibold" : ""}>
                    {getDepositPaid(r)}
                </span>
            )
        },
        {
            key: "paymentMethod" as any, label: "Balance Due", render: (r) => (
                <span className={r.metadata?.remainingBalance ? "text-amber-600 font-semibold" : ""}>
                    {getRemainingBalance(r)}
                </span>
            )
        },
        {
            key: "paymentStatus", label: "Payment", render: (r) => (
                <div className="flex items-center gap-1.5">
                    <StatusBadge status={r.paymentStatus} />
                    {r.paymentMethod === "paypal" && (
                        <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-medium">PayPal</span>
                    )}
                </div>
            )
        },
        { key: "bookingStatus", label: "Status", render: (r) => <StatusBadge status={r.bookingStatus} /> },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
                    <p className="text-sm text-gray-500">Manage all customer bookings and PayPal deposits</p>
                </div>
                <button
                    onClick={() => router.push("/admin/bookings/new")}
                    className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                >
                    <Plus className="h-4 w-4" /> New Booking
                </button>
            </div>

            <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
                {statusFilters.map((f) => (
                    <button
                        key={f}
                        onClick={() => setActiveFilter(f)}
                        className={`px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-colors ${activeFilter === f ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-800"
                            }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            <DataTable
                columns={columns}
                data={bookings}
                selectable
                onRowClick={(row) => router.push(`/admin/bookings/${row.id}`)}
            />
        </div>
    );
}
