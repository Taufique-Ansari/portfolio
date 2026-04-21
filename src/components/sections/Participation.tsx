"use client";

import { Trophy, Users, Award, Target } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const achievements = [
    {
        title: "Top 10 in Blockchain Hackathon",
        description:
            "Led a team that achieved a Top 10 position in a prestigious blockchain-based hackathon, showcasing leadership, technical expertise, and innovation.",
        icon: Trophy,
        gradient: "from-red-600 to-red-400",
    },
    {
        title: "Hackathon Manager",
        description:
            "Managed two successful hackathons and led a team of over 100 students, demonstrating exceptional leadership, event planning, and organizational skills.",
        icon: Users,
        gradient: "from-red-500 to-stone-800",
    },
];

export function Participation() {
    const headerRef = useScrollReveal<HTMLDivElement>({ y: 40, stagger: 0.1 });
    const cardsRef = useScrollReveal<HTMLDivElement>({ y: 60, stagger: 0.2 });
    const statsRef = useScrollReveal<HTMLDivElement>({ y: 40, stagger: 0.1, delay: 0.15, scale: 0.95 });

    return (
        <section id="achievements" className="py-20 px-4 md:px-8 lg:px-16 relative bg-[#f9f9f9]">
            <div className="max-w-6xl mx-auto">
                <div ref={headerRef} className="text-center mb-16">
                    <span data-reveal className="text-[rgba(255,0,0,0.8)] font-doto font-bold text-sm uppercase tracking-widest">Recognition</span>
                    <h2 data-reveal className="font-hedvig text-4xl md:text-5xl font-bold mt-2 text-[#111]">
                        Participation & Achievements
                    </h2>
                    <p data-reveal className="text-[#444] font-doto mt-4 max-w-2xl mx-auto">
                        Leadership experiences and competitive achievements that shaped my professional growth
                    </p>
                </div>

                <div ref={cardsRef} className="grid md:grid-cols-2 gap-8">
                    {achievements.map((achievement, index) => (
                        <div
                            key={index}
                            data-reveal
                            className="group relative p-8 rounded-2xl border border-[#e0e0e0] bg-white/80 backdrop-blur-sm hover:border-red-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/5 hover:-translate-y-1"
                        >
                            {/* Decorative gradient */}
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${achievement.gradient} opacity-5 rounded-2xl blur-2xl group-hover:opacity-10 transition-opacity`}></div>

                            <div className="relative">
                                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${achievement.gradient} opacity-80 mb-6`}>
                                    <achievement.icon className="w-8 h-8 text-white" />
                                </div>

                                <h3 className="text-xl font-hedvig font-bold text-[#111] group-hover:text-red-500 transition-colors mb-4">
                                    {achievement.title}
                                </h3>

                                <p className="text-[#333] font-doto leading-relaxed">
                                    {achievement.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Stats section */}
                <div ref={statsRef} className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { label: "Projects Completed", value: "5+", icon: Target },
                        { label: "Hackathons", value: "3+", icon: Trophy },
                        { label: "Team Members Led", value: "100+", icon: Users },
                        { label: "Technologies", value: "15+", icon: Award },
                    ].map((stat, index) => (
                        <div
                            key={index}
                            data-reveal
                            className="text-center p-6 rounded-2xl border border-[#e0e0e0] bg-white/80 backdrop-blur-sm hover:border-red-500/30 transition-all duration-300"
                        >
                            <stat.icon className="w-8 h-8 mx-auto mb-3 text-red-500" />
                            <div className="text-3xl font-hedvig font-bold text-[#111]">{stat.value}</div>
                            <div className="text-sm font-doto text-[rgba(255,0,0,0.8)] font-bold tracking-wider mt-1">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
