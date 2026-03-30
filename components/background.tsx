"use client";

import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

export function Background() {
  return (
    <div className="fixed inset-0 z-0 bg-[#02050b]">
      <StarsBackground 
        starDensity={0.0005}
        allStarsTwinkle={true}
        className="absolute inset-0"
      />
      <ShootingStars 
        minDelay={500}
        maxDelay={1500}
        starColor="#FFFFFF"
        trailColor="#00BFFF"
        className="absolute inset-0"
      />
    </div>
  );
}
