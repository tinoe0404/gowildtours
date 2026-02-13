import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";

export const metadata = {
    title: "Admin Dashboard | Go Wild Tours",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <AdminSidebar />
            <div className="ml-[260px] transition-all duration-300">
                <AdminTopbar />
                <main className="p-6">{children}</main>
            </div>
        </div>
    );
}
