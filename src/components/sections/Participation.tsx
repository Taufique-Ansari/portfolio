"use client";

import { Trophy, Users, Award, Target } from "lucide-react";

const achievements = [
    {
        title: "Top 10 in Blockchain Hackathon",
        description:
            "Led a team that achieved a Top 10 position in a prestigious blockchain-based hackathon, showcasing leadership, technical expertise, and innovation.",
        icon: Trophy,
        gradient: "from-amber-500 to-orange-500",
    },
    {
        title: "Hackathon Manager",
        description:
            "Managed two successful hackathons and led a team of over 100 students, demonstrating exceptional leadership, event planning, and organizational skills.",
        icon: Users,
        gradient: "from-blue-500 to-indigo-500",
    },
];

export function Participation() {
    return (
        <section id="achievements" className="py-20 px-4 md:px-8 lg:px-16 relative">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-emerald-500 font-medium text-sm uppercase tracking-wider">Recognition</span>
                    <h2 className="text-3xl md:text-4xl font-bold mt-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                        Participation & Achievements
                    </h2>
                    <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                        Leadership experiences and competitive achievements that shaped my professional growth
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {achievements.map((achievement, index) => (
                        <div
                            key={index}
                            className="group relative p-8 rounded-2xl border border-primary/10 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm hover:border-emerald-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/5 hover:-translate-y-1"
                        >
                            {/* Decorative gradient */}
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${achievement.gradient} opacity-5 rounded-2xl blur-2xl group-hover:opacity-10 transition-opacity`}></div>

                            <div className="relative">
                                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${achievement.gradient} opacity-80 mb-6`}>
                                    <achievement.icon className="w-8 h-8 text-white" />
                                </div>

                                <h3 className="text-xl font-bold text-foreground group-hover:text-emerald-500 transition-colors mb-4">
                                    {achievement.title}
                                </h3>

                                <p className="text-muted-foreground leading-relaxed">
                                    {achievement.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Stats section */}
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { label: "Projects Completed", value: "5+", icon: Target },
                        { label: "Hackathons", value: "3+", icon: Trophy },
                        { label: "Team Members Led", value: "100+", icon: Users },
                        { label: "Technologies", value: "15+", icon: Award },
                    ].map((stat, index) => (
                        <div
                            key={index}
                            className="text-center p-6 rounded-2xl border border-primary/10 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm hover:border-emerald-500/30 transition-all duration-300"
                        >
                            <stat.icon className="w-8 h-8 mx-auto mb-3 text-emerald-500" />
                            <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                            <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
