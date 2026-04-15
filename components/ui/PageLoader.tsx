import Image from "next/image";
import { siteConfig } from "@/lib/constants";

export default function PageLoader() {
  return (
    <div className="page-loader" aria-hidden="true">
      <div className="page-loader__logo">
        {/* We use siteConfig.logos.light if available or fallback */}
        <Image 
          src="/logo.png" 
          alt="Go Wild Tours" 
          width={180} 
          height={56} 
          style={{ filter: "brightness(0) invert(1)" }}
          priority 
        />
      </div>
      <div className="page-loader__bar">
        <div className="page-loader__bar-fill" />
      </div>
    </div>
  );
}
