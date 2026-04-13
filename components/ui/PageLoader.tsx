import Image from "next/image";
import { siteConfig } from "@/lib/constants";

export default function PageLoader() {
  return (
    <div className="page-loader" aria-hidden="true">
      <div className="page-loader__logo">
        {/* We use siteConfig.logos.light if available or fallback */}
        <Image 
          src={siteConfig?.logos?.light || "/images/logo/go-wild-tours-full-white.svg"} 
          alt="Go Wild Tours" 
          width={160} 
          height={48} 
          priority 
        />
      </div>
      <div className="page-loader__bar">
        <div className="page-loader__bar-fill" />
      </div>
    </div>
  );
}
