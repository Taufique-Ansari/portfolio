"use client";

import { GraduationCap, MapPin, Calendar, Award } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const education = [
    {
        degree: "Bachelor of Technology in Computer Science",
        institution: "Sandip University",
        location: "Nashik, India",
        period: "Aug 2021 - June 2025",
        gpa: "8.5/10",
        coursework: ["Database", "Software Engineering", "Operating Systems", "Algorithms", "Artificial Intelligence"],
        highlight: true,
    },
    {
        degree: "Higher Secondary Certificate (HSC)",
        institution: "Global Public School",
        location: "Nashik, India",
        period: "June 2019 - June 2021",
        gpa: "88.83%",
        coursework: [],
    },
    {
        degree: "Secondary School Certificate (SSC)",
        institution: "Dawn Breakers High School",
        location: "Nashik, India",
        period: "Till June 2019",
        gpa: "80.60%",
        coursework: [],
    },
];

export function Education() {
    const headerRef = useScrollReveal<HTMLDivElement>({ y: 40, stagger: 0.1 });
    const cardsRef = useScrollReveal<HTMLDivElement>({ y: 50, stagger: 0.15, duration: 0.9 });

    return (
        <section id="education" className="py-20 px-4 md:px-8 lg:px-16 relative bg-white">
            <div className="max-w-6xl mx-auto">
                <div ref={headerRef} className="text-center mb-16">
                    <span data-reveal className="text-[rgba(255,0,0,0.8)] font-doto font-bold text-sm uppercase tracking-widest">Background</span>
                    <h2 data-reveal className="font-hedvig text-4xl md:text-5xl font-bold mt-2 text-[#111]">
                        Education
                    </h2>
                    <p data-reveal className="text-[#444] font-doto mt-4 max-w-2xl mx-auto">
                        Academic foundation in Computer Science with strong technical fundamentals
                    </p>
                </div>

                <div ref={cardsRef} className="space-y-6">
                    {education.map((edu, index) => (
                        <div
                            key={index}
                            data-reveal
                            className={`group relative p-6 md:p-8 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:shadow-xl ${edu.highlight
                                    ? "border-red-500/30 bg-gradient-to-br from-red-500/5 to-[#f9f9f9] hover:shadow-red-500/10"
                                    : "border-[#e0e0e0] bg-[#f9f9f9] hover:border-red-500/30 hover:shadow-red-500/5"
                                }`}
                        >
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                <div className="flex items-start gap-4">
                                    <div className={`p-3 rounded-xl ${edu.highlight ? "bg-red-500" : "bg-[#eee]"}`}>
                                        <GraduationCap className={`w-6 h-6 ${edu.highlight ? "text-white" : "text-red-500"}`} />
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-hedvig font-bold text-[#111] group-hover:text-red-500 transition-colors">
                                            {edu.degree}
                                        </h3>
                                        <p className="text-lg text-[rgba(255,0,0,0.8)] font-doto font-bold mt-1">{edu.institution}</p>

                                        <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-[#444] font-doto">
                                            <span className="flex items-center">
                                                <MapPin className="w-4 h-4 mr-1 text-red-500" />
                                                {edu.location}
                                            </span>
                                            <span className="flex items-center">
                                                <Calendar className="w-4 h-4 mr-1 text-red-500" />
                                                {edu.period}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="md:text-right">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 font-doto">
                                        <Award className="w-4 h-4 text-red-500" />
                                        <span className="text-red-500 font-bold">{edu.gpa}</span>
                                    </div>
                                </div>
                            </div>

                            {edu.coursework.length > 0 && (
                                <div className="mt-6 pt-6 border-t border-[#e0e0e0]">
                                    <h4 className="text-sm font-bold text-[#222] font-doto mb-3 uppercase tracking-wider">Relevant Coursework</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {edu.coursework.map((course, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1.5 text-xs font-bold font-doto bg-red-500/5 text-[#444] rounded-lg border border-red-500/10 hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-500 transition-colors"
                                            >
                                                {course}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
