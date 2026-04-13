"use client";

import { Briefcase, Calendar, MapPin } from "lucide-react";

const experiences = [
    {
        title: "Programmer Analyst Trainee (PAT)",
        company: "Cognizant Technology Solutions",
        location: "India",
        period: "July 2025 – Present",
        current: true,
        responsibilities: [
            "Gaining hands-on experience in enterprise-level software development",
            "Working with Java and Spring Boot for backend services and APIs",
            "Practicing Agile methodology (Scrum, sprints, stand-ups, retrospectives)",
            "Learning SDLC practices including requirements, version control, testing, deployment",
            "Exposure to microservices architecture, REST APIs, and database integration",
        ],
    },
];

export function Experience() {
    return (
        <section id="experience" className="py-20 px-4 md:px-8 lg:px-16 relative">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-[rgba(255,0,0,0.8)] font-doto font-bold text-sm uppercase tracking-widest">Career</span>
                    <h2 className="font-hedvig text-4xl md:text-5xl font-bold mt-2 text-black">
                        Work Experience
                    </h2>
                    <p className="text-[#555] font-doto mt-4 max-w-2xl mx-auto">
                        Building real-world software solutions and gaining enterprise development experience
                    </p>
                </div>

                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-red-500 via-red-500/50 to-transparent"></div>

                    {experiences.map((exp, index) => (
                        <div
                            key={index}
                            className={`relative flex flex-col md:flex-row gap-8 mb-12 ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                }`}
                        >
                            {/* Timeline dot */}
                            <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-red-500 border-4 border-background shadow-lg shadow-red-500/30">
                                {exp.current && (
                                    <span className="absolute -inset-1 rounded-full animate-ping bg-red-500/30"></span>
                                )}
                            </div>

                            {/* Content */}
                            <div className="ml-8 md:ml-0 md:w-1/2 md:px-8">
                                <div className="group p-6 rounded-2xl border border-primary/10 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm hover:border-red-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/5">
                                    <div className="flex flex-wrap items-center gap-3 mb-4">
                                        {exp.current && (
                                            <span className="px-3 py-1 font-doto text-xs font-bold bg-red-500/10 text-red-500 rounded-full border border-red-500/20">
                                                Current
                                            </span>
                                        )}
                                        <div className="flex items-center text-sm text-[#555] font-doto">
                                            <Calendar className="w-4 h-4 mr-1" />
                                            {exp.period}
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-hedvig font-bold text-[#222] group-hover:text-red-500 transition-colors">
                                        {exp.title}
                                    </h3>

                                    <div className="flex items-center gap-4 mt-2 text-[#555] font-doto">
                                        <span className="flex items-center">
                                            <Briefcase className="w-4 h-4 mr-1" />
                                            {exp.company}
                                        </span>
                                        <span className="flex items-center">
                                            <MapPin className="w-4 h-4 mr-1" />
                                            {exp.location}
                                        </span>
                                    </div>

                                    <ul className="mt-4 space-y-2">
                                        {exp.responsibilities.map((resp, i) => (
                                            <li key={i} className="flex items-start text-sm text-[#333] font-doto leading-relaxed">
                                                <span className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500 flex-shrink-0"></span>
                                                {resp}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
