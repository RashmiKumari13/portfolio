"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ScrollVideoSync() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoHeroRef = useRef<HTMLVideoElement>(null);
  const videoJourneyRef = useRef<HTMLVideoElement>(null);
  const videoCtaRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial opacities
      gsap.set(videoHeroRef.current, { opacity: 1 });
      gsap.set(videoJourneyRef.current, { opacity: 0 });
      gsap.set(videoCtaRef.current, { opacity: 0 });

      // Crossfade from Hero Video to Journey Video
      ScrollTrigger.create({
        trigger: "#section-journey",
        start: "top bottom",
        end: "top center",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(videoHeroRef.current, { opacity: 1 - progress });
          gsap.set(videoJourneyRef.current, { opacity: progress });
        },
      });

      // Crossfade from Journey Video to CTA Video
      ScrollTrigger.create({
        trigger: "#section-cta",
        start: "top bottom",
        end: "top center",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(videoJourneyRef.current, { opacity: 1 - progress });
          gsap.set(videoCtaRef.current, { opacity: progress });
        },
      });
    }, containerRef);

    // Trigger video playback explicitly on mount to bypass aggressive autoplay blockers
    const playVideo = (v: HTMLVideoElement | null) => {
      if (v) {
        v.play().catch(() => {
          // If browser blocks initial play, trigger it on first interaction
          const resumePlay = () => {
            v.play().catch(() => {});
            window.removeEventListener("pointerdown", resumePlay);
          };
          window.addEventListener("pointerdown", resumePlay);
        });
      }
    };

    playVideo(videoHeroRef.current);
    playVideo(videoJourneyRef.current);
    playVideo(videoCtaRef.current);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 w-full h-full -z-50 overflow-hidden bg-black">
      {/* Cinematic dark overlay to enhance text readability and design reflection */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80 z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.85)_100%) z-10 pointer-events-none" />

      {/* Video 1: Hero Intro */}
      <video
        ref={videoHeroRef}
        src="/videos/hero.mp4"
        muted
        loop
        playsInline
        autoPlay
        className="absolute inset-0 w-full h-full object-cover select-none transition-opacity duration-300"
        poster="/images/hero_bg.png"
      />

      {/* Video 2: Engineering Journey */}
      <video
        ref={videoJourneyRef}
        src="/videos/journey.mp4"
        muted
        loop
        playsInline
        autoPlay
        className="absolute inset-0 w-full h-full object-cover select-none transition-opacity duration-300"
      />

      {/* Video 3: Final Call To Action */}
      <video
        ref={videoCtaRef}
        src="/videos/cta.mp4"
        muted
        loop
        playsInline
        autoPlay
        className="absolute inset-0 w-full h-full object-cover select-none transition-opacity duration-300"
      />
    </div>
  );
}
