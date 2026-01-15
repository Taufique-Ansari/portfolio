"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Linkedin, Github, Code2, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

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
        href: "https://github.com/taufiqueansari451",
        username: "@taufiqueansari451",
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 3000);
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <section id="contact" className="py-20 px-4 md:px-8 lg:px-16 relative bg-gradient-to-b from-background to-background/50">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-emerald-500 font-medium text-sm uppercase tracking-wider">Get In Touch</span>
                    <h2 className="text-3xl md:text-4xl font-bold mt-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                        Contact Me
                    </h2>
                    <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                        I&apos;m always interested in new opportunities. Let&apos;s connect and discuss how I can contribute to your team.
                    </p>
                </div>

                <div className="grid lg:grid-cols-5 gap-8">
                    {/* Contact Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="p-6 rounded-2xl border border-primary/10 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm">
                            <h3 className="text-lg font-bold text-foreground mb-6">Contact Information</h3>

                            <div className="space-y-4">
                                {contactInfo.map((info, index) => (
                                    <a
                                        key={index}
                                        href={info.href}
                                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-emerald-500/10 transition-colors group"
                                    >
                                        <div className="p-2 rounded-lg bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors">
                                            <info.icon className="w-5 h-5 text-emerald-500" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">{info.label}</p>
                                            <p className="text-sm text-foreground font-medium">{info.value}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl border border-primary/10 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm">
                            <h3 className="text-lg font-bold text-foreground mb-6">Social Profiles</h3>

                            <div className="space-y-3">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-emerald-500/10 transition-colors group"
                                    >
                                        <div className="p-2 rounded-lg bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors">
                                            <social.icon className="w-5 h-5 text-emerald-500" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-foreground font-medium">{social.label}</p>
                                            <p className="text-xs text-muted-foreground">{social.username}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-3">
                        <form onSubmit={handleSubmit} className="p-8 rounded-2xl border border-primary/10 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm">
                            <h3 className="text-lg font-bold text-foreground mb-6">Send a Message</h3>

                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-background/50 border border-primary/10 text-foreground placeholder-muted-foreground focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">
                                        Your Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-background/50 border border-primary/10 text-foreground placeholder-muted-foreground focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                                        placeholder="john@example.com"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        rows={5}
                                        className="w-full px-4 py-3 rounded-xl bg-background/50 border border-primary/10 text-foreground placeholder-muted-foreground focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all resize-none"
                                        placeholder="Tell me about your project or opportunity..."
                                        required
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6"
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
