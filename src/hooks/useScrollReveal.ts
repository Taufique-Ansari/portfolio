"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
    y?: number;
    x?: number;
    scale?: number;
    duration?: number;
    delay?: number;
    ease?: string;
    stagger?: number;
    start?: string;
}

/**
 * Hook to reveal elements on scroll using GSAP ScrollTrigger.
 * Attach the returned ref to a container element,
 * and all direct children with `data-reveal` will animate in.
 */
export function useScrollReveal<T extends HTMLElement>(
    options: ScrollRevealOptions = {}
) {
    const ref = useRef<T>(null);

    const {
        y = 60,
        x = 0,
        scale = 1,
        duration = 0.8,
        delay = 0,
        ease = "power3.out",
        stagger = 0.12,
        start = "top 85%",
    } = options;

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const children = el.querySelectorAll("[data-reveal]");
        const targets = children.length > 0 ? Array.from(children) : [el];

        gsap.set(targets, { opacity: 0, y, x, scale });

        const trigger = ScrollTrigger.create({
            trigger: el,
            start,
            once: true,
            onEnter: () => {
                gsap.to(targets, {
                    opacity: 1,
                    y: 0,
                    x: 0,
                    scale: 1,
                    duration,
                    delay,
                    ease,
                    stagger,
                });
            },
        });

        return () => {
            trigger.kill();
        };
    }, [y, x, scale, duration, delay, ease, stagger, start]);

    return ref;
}
