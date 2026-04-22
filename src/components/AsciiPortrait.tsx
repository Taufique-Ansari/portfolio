"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// ASCII char ramp — dark=dense, light=sparse
// Inverted: dark pixels (face/hair) → dense chars, white bg → spaces
const ASCII_CHARS = " .·:-=+*o$&%#W@";

interface AsciiPortraitProps {
    cols?: number;
    src?: string;
    className?: string;
}

export function AsciiPortrait({
    cols = 250,
    src = "/hero_img.png",
    className = "",
}: AsciiPortraitProps) {
    const [asciiLines, setAsciiLines] = useState<string[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        hasAnimated.current = false;
    }, [cols, src]);

    // ── Convert image → ASCII ────────────────────────────────────────
    useEffect(() => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = src;

        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            // Portrait is taller than wide; 0.5 corrects monospace char aspect ratio
            const aspectRatio = img.naturalHeight / img.naturalWidth;
            const rows = Math.round(cols * aspectRatio * 0.8);

            canvas.width = cols;
            canvas.height = rows;

            // Fill white so transparent areas become white (spaces)
            ctx.fillStyle = "#ffffffff";
            ctx.fillRect(0, 0, cols, rows);
            ctx.drawImage(img, 0, 0, cols, rows);

            const { data } = ctx.getImageData(0, 0, cols, rows);
            const lines: string[] = [];

            for (let y = 0; y < rows; y++) {
                let line = "";
                for (let x = 0; x < cols; x++) {
                    const idx = (y * cols + x) * 4;
                    const r = data[idx];
                    const g = data[idx + 1];
                    const b = data[idx + 2];

                    // Luminance
                    const lum = 0.299 * r + 0.587 * g + 0.114 * b;

                    // INVERTED mapping: dark pixels → dense chars, white → space
                    // lum 0 (black) → ASCII_CHARS last char (@), lum 255 (white) → space
                    const charIdx = Math.floor(
                        ((255 - lum) / 255) * (ASCII_CHARS.length - 1)
                    );
                    line += ASCII_CHARS[charIdx];
                }
                lines.push(line);
            }

            setAsciiLines(lines);
        };
    }, [cols, src]);

    // ── Line-sweep reveal animation ──────────────────────────────────
    useEffect(() => {
        if (asciiLines.length === 0 || hasAnimated.current) return;
        if (!containerRef.current) return;
        hasAnimated.current = true;

        const lineEls = containerRef.current.querySelectorAll<HTMLElement>(".ascii-line");
        if (lineEls.length === 0) return;

        gsap.set(lineEls, { opacity: 0, y: -4 });
        gsap.to(lineEls, {
            opacity: 1,
            y: 0,
            duration: 0.04,
            stagger: 0.012,
            ease: "power1.out",
        });
    }, [asciiLines]);

    if (asciiLines.length === 0) return null;

    return (
        <div
            ref={containerRef}
            className={`select-none pointer-events-none ${className}`}
            aria-hidden="true"
            style={{
                // Font size: at 1440px viewport → ~0.45vw × 1440 = ~6.5px per char
                // 150 cols × 6.5px ≈ 975px to fill the hero nicely
                fontSize: "clamp(5px, 3vw, 6px)",
                lineHeight: 0.8,
                fontFamily: "'Courier New', Courier, monospace",
                whiteSpace: "pre",
                letterSpacing: "0.02em",
                color: "rgba(160, 0, 0, 0.45)",
            }}
        >
            {asciiLines.map((line, i) => (
                <div key={i} className="ascii-line" style={{ opacity: 0 }}>
                    {line}
                </div>
            ))}
        </div>
    );
}
