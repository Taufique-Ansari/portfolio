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
                            <div className="p-2 rounded-lg bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors">
                                <Code2 className="w-5 h-5 text-emerald-500" />
                            </div>
                            <span className="font-bold text-lg text-foreground">
                                Taufique<span className="text-emerald-500">.</span>
                            </span>
                        </a>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Full-Stack Developer passionate about building scalable web applications
                            and enterprise software solutions.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="font-bold text-foreground">Quick Links</h4>
                        <div className="grid grid-cols-2 gap-2">
                            {footerLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-sm text-muted-foreground hover:text-emerald-500 transition-colors"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="space-y-4">
                        <h4 className="font-bold text-foreground">Connect</h4>
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 rounded-xl bg-primary/5 hover:bg-emerald-500/10 border border-primary/10 hover:border-emerald-500/30 transition-all group"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-emerald-500 transition-colors" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="pt-8 border-t border-primary/10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                        <p>© {currentYear} Taufique Ansari. All rights reserved.</p>
                        <p className="flex items-center gap-1">
                            Built with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> using Next.js & Tailwind CSS
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
