"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface LoadingScreenProps {
    onComplete: () => void;
}

/**
 * Build a clip-path that covers the full viewport EXCEPT a rounded-rect hole
 * in the centre.  Uses SVG path with evenodd fill-rule so the inner rect is
 * transparent while the surrounding frame receives backdrop-filter + bg color.
 */
function buildFrameClip(w: number, h: number, r: number): string {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const cx = vw / 2;
    const cy = vh / 2;
    const hw = w / 2;
    const hh = h / 2;

    // Clamp radius so it never exceeds half the smaller dimension
    const cr = Math.min(r, hw, hh);

    const x1 = cx - hw;
    const y1 = cy - hh;
    const x2 = cx + hw;
    const y2 = cy + hh;

    // Outer rect (full viewport, clockwise) + inner rounded rect (counter-clockwise = hole)
    return `path(evenodd, "M 0 0 L ${vw} 0 L ${vw} ${vh} L 0 ${vh} Z M ${x1 + cr} ${y1} L ${x2 - cr} ${y1} Q ${x2} ${y1} ${x2} ${y1 + cr} L ${x2} ${y2 - cr} Q ${x2} ${y2} ${x2 - cr} ${y2} L ${x1 + cr} ${y2} Q ${x1} ${y2} ${x1} ${y2 - cr} L ${x1} ${y1 + cr} Q ${x1} ${y1} ${x1 + cr} ${y1} Z")`;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const textContainerRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<HTMLSpanElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const windowRef = useRef<HTMLDivElement>(null);

    const name = "TAUFIQUE";

    useEffect(() => {
        const letters = textContainerRef.current?.children;
        if (!letters || !containerRef.current) return;

        // Separate the letter spans from the cursor
        const letterEls = Array.from(letters).filter((_, i) => i < name.length);

        const tl = gsap.timeline();

        // ━━━ Phase 1: Typing animation ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        tl.set(textContainerRef.current, { opacity: 1 });
        tl.set(cursorRef.current, { opacity: 1 });

        // Each letter appears one by one (like typing)
        letterEls.forEach((letter, i) => {
            tl.to(letter, {
                opacity: 1,
                duration: 0.01,
                delay: i === 0 ? 0.3 : 0.08, // initial pause, then fast typing
            });
        });

        // ━━━ Phase 2: Hold for a beat ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        tl.to({}, { duration: 0.5 });

        // ━━━ Phase 3: Backspace animation ━━━━━━━━━━━━━━━━━━━━━━━━━━━
        // Letters disappear from right to left (like backspacing)
        for (let i = letterEls.length - 1; i >= 0; i--) {
            tl.to(letterEls[i], {
                opacity: 0,
                duration: 0.01,
                delay: 0.06,
            });
        }

        // Hide cursor after backspace
        tl.to(cursorRef.current, { opacity: 0, duration: 0.15 });

        // ━━━ Phase 4: Fade content + instantly show window ━━━━━━━━━━
        tl.to(contentRef.current, {
            opacity: 0,
            duration: 0.2,
            ease: "power2.in",
        });

        // Show the clip-path frame FIRST, then hide the overlay behind it
        tl.set(windowRef.current, { opacity: 1 });
        tl.set(overlayRef.current, { opacity: 0 });

        // ━━━ Phase 5: Window scales in 3 steps ━━━━━━━━━━━━━━━━━━━━━━
        // We animate a plain object and rebuild the clip-path on every tick.
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const hole = { w: 100, h: 60, r: 24 };

        function updateClip() {
            if (windowRef.current) {
                windowRef.current.style.clipPath = buildFrameClip(hole.w, hole.h, hole.r);
            }
        }

        // Set initial clip-path
        tl.call(updateClip);

        // Step 1 → Small
        tl.to(hole, {
            w: vw * 0.35,
            h: vh * 0.3,
            r: 16,
            duration: 1,
            ease: "power4.inOut",
            onUpdate: updateClip,
        });

        // Step 2 → Medium
        tl.to(hole, {
            w: vw * 0.7,
            h: vh * 0.65,
            r: 8,
            duration: 1,
            ease: "power4.inOut",
            onUpdate: updateClip,
        });

        // ━━━ Fire onComplete so hero text + SVG morph start as step 3 begins ━
        tl.call(() => {
            onComplete();
        });

        // Step 3 → Full (hole expands to cover viewport = frame disappears)
        tl.to(hole, {
            w: vw,
            h: vh,
            r: 0,
            duration: 1,
            ease: "power4.inOut",
            onUpdate: updateClip,
            onComplete: () => {
                // Hide entire container after window is fully open
                if (containerRef.current) {
                    containerRef.current.style.display = "none";
                }
            },
        });

        return () => {
            tl.kill();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 z-[1000]">
            {/* Solid overlay background (shown during typing phase) */}
            <div
                ref={overlayRef}
                className="absolute inset-0"
                style={{
                    background: "rgba(255, 255, 255, 0.31)",
                    backdropFilter: "blur(5px)",
                    WebkitBackdropFilter: "blur(5px)",
                }}
            />

            {/* Content layer: typing text */}
            <div
                ref={contentRef}
                className="absolute inset-0 flex items-center justify-center"
                style={{ zIndex: 10 }}
            >
                {/* Text "TAUFIQUE" with typing cursor */}
                <div
                    ref={textContainerRef}
                    className="flex items-center"
                    style={{ opacity: 0 }}
                >
                    {name.split("").map((letter, i) => (
                        <span
                            key={`letter-${i}`}
                            className="text-3xl md:text-5xl font-bold tracking-[0.15em]"
                            style={{
                                fontFamily: "'Doto', monospace",
                                color: "#1a1a1a",
                                opacity: 0,
                                display: "inline-block",
                            }}
                        >
                            {letter}
                        </span>
                    ))}
                    {/* Blinking cursor */}
                    <span
                        ref={cursorRef}
                        className="text-3xl md:text-5xl font-bold ml-0.5 rounded-full"
                        style={{
                            fontFamily: "'Doto', monospace",
                            color: "#cc0000",
                            opacity: 0,
                            display: "inline-block",
                            animation: "blink 0.6s step-end infinite",
                        }}
                    >
                        •
                    </span>
                </div>
            </div>

            {/*
              Window frame — full-screen div with backdrop-filter blur.
              clip-path(evenodd) cuts a hole in the centre so the blur
              only applies to the FRAME area, not the hero visible through
              the window.
            */}
            <div
                ref={windowRef}
                className="fixed inset-0"
                style={{
                    background: "rgba(255, 255, 255, 0.31)",
                    backdropFilter: "blur(5px)",
                    WebkitBackdropFilter: "blur(5px)",
                    opacity: 0,
                    zIndex: 5,
                }}
            />

            <style>{`
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
            `}</style>
        </div>
    );
}
