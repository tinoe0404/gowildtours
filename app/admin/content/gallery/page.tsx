"use client";

import ContentListPage from "@/components/admin/ContentListPage";

export default function GalleryAdminPage() {
    return (
        <ContentListPage
            type="gallery"
            apiPath="/api/admin/content/gallery"
            title="Gallery Management"
            description="Manage your website's gallery images and categories."
        />
    );
}
