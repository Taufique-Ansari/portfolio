"use client";

import { Code2, Server, Wrench, GitBranch } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const skillCategories = [
    {
        title: "Programming Languages",
        icon: Code2,
        gradient: "from-red-500 to-teal-500",
        skills: ["Java", "C++", "JavaScript", "SQL"],
    },
    {
        title: "Frameworks & Libraries",
        icon: Server,
        gradient: "from-blue-500 to-indigo-500",
        skills: ["Spring Boot", "Spring MVC", "JPA/Hibernate", "Spring Security", "React.js", "Redux"],
    },
    {
        title: "Tools & DevOps",
        icon: Wrench,
        gradient: "from-red-500 to-neutral-500",
        skills: ["Git", "GitHub", "Postman", "Maven", "NPM", "Vercel"],
    },
    {
        title: "Methodologies",
        icon: GitBranch,
        gradient: "from-orange-500 to-amber-500",
        skills: ["Agile (Scrum)", "SDLC", "TDD", "REST APIs", "Microservices"],
    },
];

export function Skills() {
    const headerRef = useScrollReveal<HTMLDivElement>({ y: 40, stagger: 0.1 });
    const gridRef = useScrollReveal<HTMLDivElement>({ y: 50, stagger: 0.12 });
    const barsRef = useScrollReveal<HTMLDivElement>({ y: 40, duration: 0.9, delay: 0.1 });

    return (
        <section id="skills" className="py-20 px-4 md:px-8 lg:px-16 relative bg-[#f9f9f9]">
            <div className="max-w-6xl mx-auto">
                <div ref={headerRef} className="text-center mb-16">
                    <span data-reveal className="text-[rgba(255,0,0,0.8)] font-doto font-bold text-sm uppercase tracking-widest">Expertise</span>
                    <h2 data-reveal className="font-hedvig text-4xl md:text-5xl font-bold mt-2 text-[#111]">
                        Skills & Technologies
                    </h2>
                    <p data-reveal className="text-[#444] font-doto mt-4 max-w-2xl mx-auto">
                        A comprehensive toolkit for building modern, scalable applications
                    </p>
                </div>

                <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {skillCategories.map((category, index) => (
                        <div
                            key={index}
                            data-reveal
                            className="group relative p-6 rounded-2xl border border-[#e0e0e0] bg-white/80 backdrop-blur-sm hover:border-red-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/5 hover:-translate-y-1"
                        >
                            {/* Icon */}
                            <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${category.gradient} opacity-80 mb-4`}>
                                <category.icon className="w-6 h-6 text-white" />
                            </div>

                            <h3 className="text-lg font-hedvig font-bold text-[#111] group-hover:text-red-500 transition-colors mb-4">
                                {category.title}
                            </h3>

                            <div className="flex flex-wrap gap-2">
                                {category.skills.map((skill, i) => (
                                    <span
                                        key={i}
                                        className="px-3 py-1.5 text-xs font-bold font-doto bg-red-500/5 text-[#444] rounded-lg border border-red-500/10 hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-500 transition-colors cursor-default"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Skill bars for key technologies */}
                <div ref={barsRef} className="mt-16 p-8 rounded-2xl border border-[#e0e0e0] bg-white/80 backdrop-blur-sm">
                    <h3 data-reveal className="text-xl font-hedvig font-bold text-[#111] mb-8 text-center">Core Competencies</h3>

                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 max-w-4xl mx-auto">
                        {[
                            { name: "Java & Spring Boot", level: 85 },
                            { name: "React.js", level: 75 },
                            { name: "Database (MySQL/MongoDB)", level: 80 },
                            { name: "RESTful APIs", level: 85 },
                            { name: "Git & Version Control", level: 80 },
                            { name: "Agile/Scrum", level: 75 },
                        ].map((skill, index) => (
                            <div key={index} data-reveal className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#222] font-doto font-bold">{skill.name}</span>
                                    <span className="text-[rgba(255,0,0,0.8)] font-doto font-bold">{skill.level}%</span>
                                </div>
                                <div className="h-2 bg-[#eee] rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-red-500 to-teal-500 rounded-full transition-all duration-1000 ease-out"
                                        style={{ width: `${skill.level}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
