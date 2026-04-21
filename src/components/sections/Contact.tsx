"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Linkedin, Github, Code2, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const contactInfo = [
    {
        icon: Mail,
        label: "Email",
        value: "Taufiqueansari451@gmail.com",
        href: "mailto:Taufiqueansari451@gmail.com",
    },
    {
        icon: Phone,
        label: "Phone",
        value: "+91-9307746782",
        href: "tel:+919307746782",
    },
    {
        icon: MapPin,
        label: "Location",
        value: "Nashik, India",
        href: "#",
    },
];

const socialLinks = [
    {
        icon: Linkedin,
        label: "LinkedIn",
        href: "https://linkedin.com/in/taufique-ansari1",
        username: "@taufique-ansari1",
    },
    {
        icon: Github,
        label: "GitHub",
        href: "https://github.com/taufique-ansari",
        username: "@taufique-ansari",
    },
    {
        icon: Code2,
        label: "LeetCode",
        href: "https://leetcode.com/u/taufiqueansari451",
        username: "@taufiqueansari451",
    },
];

export function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const headerRef = useScrollReveal<HTMLDivElement>({ y: 40, stagger: 0.1 });
    const leftRef = useScrollReveal<HTMLDivElement>({ x: -40, y: 20, stagger: 0.15 });
    const rightRef = useScrollReveal<HTMLDivElement>({ x: 40, y: 20, duration: 0.9 });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 3000);
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <section id="contact" className="py-20 px-4 md:px-8 lg:px-16 relative bg-white">
            <div className="max-w-6xl mx-auto">
                <div ref={headerRef} className="text-center mb-16">
                    <span data-reveal className="text-[rgba(255,0,0,0.8)] font-doto font-bold text-sm uppercase tracking-widest">Get In Touch</span>
                    <h2 data-reveal className="font-hedvig text-4xl md:text-5xl font-bold mt-2 text-[#111]">
                        Contact Me
                    </h2>
                    <p data-reveal className="text-[#444] font-doto mt-4 max-w-2xl mx-auto">
                        I&apos;m always interested in new opportunities. Let&apos;s connect and discuss how I can contribute to your team.
                    </p>
                </div>

                <div className="grid lg:grid-cols-5 gap-8">
                    {/* Contact Info */}
                    <div ref={leftRef} className="lg:col-span-2 space-y-6">
                        <div data-reveal className="p-6 rounded-2xl border border-[#e0e0e0] bg-[#f9f9f9]">
                            <h3 className="text-xl font-hedvig font-bold text-[#111] mb-6">Contact Information</h3>

                            <div className="space-y-4">
                                {contactInfo.map((info, index) => (
                                    <a
                                        key={index}
                                        href={info.href}
                                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-red-500/10 transition-colors group"
                                    >
                                        <div className="p-2 rounded-lg bg-red-500/10 group-hover:bg-red-500/20 transition-colors">
                                            <info.icon className="w-5 h-5 text-red-500" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-[rgba(255,0,0,0.8)] font-doto font-bold uppercase tracking-wider">{info.label}</p>
                                            <p className="text-sm font-doto text-[#222] font-bold">{info.value}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div data-reveal className="p-6 rounded-2xl border border-[#e0e0e0] bg-[#f9f9f9]">
                            <h3 className="text-xl font-hedvig font-bold text-[#111] mb-6">Social Profiles</h3>

                            <div className="space-y-3">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-red-500/10 transition-colors group"
                                    >
                                        <div className="p-2 rounded-lg bg-red-500/10 group-hover:bg-red-500/20 transition-colors">
                                            <social.icon className="w-5 h-5 text-red-500" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-doto text-[#222] font-bold">{social.label}</p>
                                            <p className="text-xs text-[rgba(255,0,0,0.8)] font-doto font-bold">{social.username}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div ref={rightRef} className="lg:col-span-3">
                        <form data-reveal onSubmit={handleSubmit} className="p-8 rounded-2xl border border-[#e0e0e0] bg-[#f9f9f9]">
                            <h3 className="text-xl font-hedvig font-bold text-[#111] mb-6">Send a Message</h3>

                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-bold font-doto text-[#444] mb-2">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-white border border-[#ddd] text-[#222] font-doto placeholder-[#aaa] focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all shadow-sm"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-bold font-doto text-[#444] mb-2">
                                        Your Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-white border border-[#ddd] text-[#222] font-doto placeholder-[#aaa] focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all shadow-sm"
                                        placeholder="john@example.com"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-bold font-doto text-[#444] mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        rows={5}
                                        className="w-full px-4 py-3 rounded-xl bg-white border border-[#ddd] text-[#222] font-doto placeholder-[#aaa] focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all resize-none shadow-sm"
                                        placeholder="Tell me about your project or opportunity..."
                                        required
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-red-600 hover:bg-red-700 text-white font-doto font-bold tracking-widest py-6 shadow-md shadow-red-500/20"
                                    disabled={isSubmitted}
                                >
                                    {isSubmitted ? (
                                        <>
                                            <CheckCircle className="w-5 h-5 mr-2" />
                                            Message Sent!
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5 mr-2" />
                                            Send Message
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
