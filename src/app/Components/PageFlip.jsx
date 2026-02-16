"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

/**
 * Wraps navigation in a page-flip animation.
 * Usage:
 *   <PageFlip href="/login">
 *     <span>Sign In</span>
 *   </PageFlip>
 */
export default function PageFlip({ href, children, className = "" }) {
  const router = useRouter();
  const [flipping, setFlipping] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setFlipping(true);
    // wait for the flip-out animation, then navigate
    setTimeout(() => {
      router.push(href);
    }, 500);
  };

  return (
    <>
      {/* Overlay that plays the flip animation */}
      {flipping && (
        <div className="page-flip-overlay">
          <div className="page-flip-page" />
        </div>
      )}
      <a href={href} onClick={handleClick} className={className}>
        {children}
      </a>
    </>
  );
}
