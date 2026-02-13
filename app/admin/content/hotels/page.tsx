"use client";

import ContentListPage from "@/components/admin/ContentListPage";

export default function HotelsPage() {
    return <ContentListPage type="hotels" apiPath="/api/admin/content/hotels" />;
}
