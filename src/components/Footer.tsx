"use client";

import { Code2, Heart, Linkedin, Github, Mail } from "lucide-react";

const footerLinks = [
    { name: "Home", href: "#home" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" },
];

const socialLinks = [
    { icon: Linkedin, href: "https://linkedin.com/in/taufique-ansari1", label: "LinkedIn" },
    { icon: Github, href: "https://github.com/taufiqueansari451", label: "GitHub" },
    { icon: Mail, href: "mailto:Taufiqueansari451@gmail.com", label: "Email" },
];

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative py-12 px-4 md:px-8 lg:px-16 border-t border-primary/10 bg-gradient-to-t from-background to-background/50">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <a href="#home" className="flex items-center gap-2 group">
                            <div className="p-2 rounded-lg bg-red-500/10 group-hover:bg-red-500/20 transition-colors">
                                <Code2 className="w-5 h-5 text-red-500" />
                            </div>
                            <span className="font-bold font-hedvig text-xl text-black">
                                Taufique<span className="text-[rgba(255,0,0,0.8)]">.</span>
                            </span>
                        </a>
                        <p className="text-sm font-doto text-[#555] leading-relaxed">
                            Full-Stack Developer passionate about building scalable web applications
                            and enterprise software solutions.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="font-bold font-hedvig text-xl text-black">Quick Links</h4>
                        <div className="grid grid-cols-2 gap-2">
                            {footerLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-sm font-doto font-bold text-[#555] hover:text-red-500 transition-colors tracking-widest"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="space-y-4">
                        <h4 className="font-bold font-hedvig text-xl text-black">Connect</h4>
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 rounded-xl bg-primary/5 hover:bg-red-500/10 border border-primary/10 hover:border-red-500/30 transition-all group"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-5 h-5 text-[#555] group-hover:text-red-500 transition-colors" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="pt-8 border-t border-primary/10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-doto font-bold text-[#555]">
                        <p>© {currentYear} Taufique Ansari. All rights reserved.</p>
                        <p className="flex items-center gap-1">
                            Built with <Heart className="w-4 h-4 text-[rgba(255,0,0,0.8)] fill-current" /> using Next.js & Tailwind CSS
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
