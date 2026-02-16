"use client";

import ContentListPage from "@/components/admin/ContentListPage";

export default function PackagesPage() {
    return <ContentListPage type="packages" apiPath="/api/admin/content/packages" />;
}
