"use client";

import ContentListPage from "@/components/admin/ContentListPage";

export default function ActivitiesPage() {
    return <ContentListPage type="activities" apiPath="/api/admin/content/activities" />;
}
