"use client";

import { useEffect } from "react";
import { renderCanvas } from "@/components/ui/canvas";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Download, Mail } from "lucide-react";

export function Hero() {
    useEffect(() => {
        renderCanvas();
    }, []);

    return (
        <section id="home" className="relative min-h-screen overflow-hidden">
            <div className="animate-fadeIn mt-20 flex flex-col items-center justify-center px-4 text-center md:mt-20">
                <div className="z-10 mb-6 mt-10 sm:justify-center md:mb-4 md:mt-20">
                    <div className="relative flex items-center whitespace-nowrap rounded-full border border-primary/20 bg-popover/80 backdrop-blur-sm px-3 py-1 text-xs leading-6 text-primary/60">
                        <Sparkles className="h-4 w-4 mr-1 text-emerald-500" />
                        Open to opportunities
                        <a
                            href="#contact"
                            className="hover:text-emerald-400 ml-1 flex items-center font-semibold text-emerald-500 transition-colors"
                        >
                            <div className="absolute inset-0 flex" aria-hidden="true" />
                            Get in touch{" "}
                            <span aria-hidden="true">
                                <ArrowRight className="h-4 w-4 ml-1" />
                            </span>
                        </a>
                    </div>
                </div>

                <div className="mb-10 mt-4 md:mt-6">
                    <div className="px-2">
                        <div className="relative mx-auto h-full max-w-7xl border border-primary/10 p-6 rounded-2xl bg-gradient-to-b from-background/50 to-background/30 backdrop-blur-sm [mask-image:radial-gradient(800rem_96rem_at_center,white,transparent)] md:px-12 md:py-20">
                            <div className="absolute -left-3 -top-3 h-6 w-6 border-l-2 border-t-2 border-emerald-500/50"></div>
                            <div className="absolute -bottom-3 -left-3 h-6 w-6 border-l-2 border-b-2 border-emerald-500/50"></div>
                            <div className="absolute -right-3 -top-3 h-6 w-6 border-r-2 border-t-2 border-emerald-500/50"></div>
                            <div className="absolute -bottom-3 -right-3 h-6 w-6 border-r-2 border-b-2 border-emerald-500/50"></div>

                            <h1 className="flex select-none flex-col px-3 py-2 text-center text-4xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
                                Full-Stack Developer
                                <span className="text-emerald-500 mt-2">& Software Engineer</span>
                            </h1>

                            <div className="flex items-center justify-center gap-2 mt-4">
                                <span className="relative flex h-3 w-3 items-center justify-center">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75"></span>
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                                </span>
                                <p className="text-sm text-emerald-500 font-medium">Available for Hire</p>
                            </div>
                        </div>
                    </div>

                    <h2 className="mt-8 text-xl md:text-2xl font-medium">
                        Hi, I&apos;m{" "}
                        <span className="text-emerald-500 font-bold">Taufique Ansari</span>
                    </h2>

                    <p className="md:text-lg mx-auto mb-10 mt-4 max-w-2xl px-6 text-base text-muted-foreground sm:px-6 md:max-w-3xl md:px-10 lg:text-lg leading-relaxed">
                        A motivated and technically skilled Computer Science graduate with hands-on experience
                        in enterprise software development. Currently working as a <span className="text-foreground font-medium">Programmer Analyst Trainee at Cognizant</span>,
                        building scalable backend services with Java and Spring Boot.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a href="#projects">
                            <Button variant="default" size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 group">
                                View My Work
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </a>
                        <a href="#contact">
                            <Button variant="outline" size="lg" className="border-emerald-500/30 hover:bg-emerald-500/10 hover:border-emerald-500/50 px-8">
                                <Mail className="mr-2 h-4 w-4" />
                                Contact Me
                            </Button>
                        </a>
                        <a href="/resume.pdf" download>
                            <Button variant="ghost" size="lg" className="hover:bg-primary/10 px-8">
                                <Download className="mr-2 h-4 w-4" />
                                Resume
                            </Button>
                        </a>
                    </div>
                </div>
            </div>

            <canvas
                className="pointer-events-none absolute inset-0 mx-auto"
                id="canvas"
            ></canvas>
        </section>
    );
}
