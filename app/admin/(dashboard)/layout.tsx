import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";

export const dynamic = "force-dynamic";
import { getSession } from "@/lib/admin/auth";
import { redirect } from "next/navigation";

export const metadata = {
    title: "Admin Dashboard | Go Wild Tours",
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await getSession();

    if (!session) {
        redirect("/admin/login");
    }

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
