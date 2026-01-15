"use client";

import { GraduationCap, MapPin, Calendar, Award } from "lucide-react";

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
    return (
        <section id="education" className="py-20 px-4 md:px-8 lg:px-16 relative bg-gradient-to-b from-background to-background/50">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-emerald-500 font-medium text-sm uppercase tracking-wider">Background</span>
                    <h2 className="text-3xl md:text-4xl font-bold mt-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                        Education
                    </h2>
                    <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                        Academic foundation in Computer Science with strong technical fundamentals
                    </p>
                </div>

                <div className="space-y-6">
                    {education.map((edu, index) => (
                        <div
                            key={index}
                            className={`group relative p-6 md:p-8 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:shadow-xl ${edu.highlight
                                    ? "border-emerald-500/30 bg-gradient-to-br from-emerald-500/5 to-card/40 hover:shadow-emerald-500/10"
                                    : "border-primary/10 bg-gradient-to-br from-card/80 to-card/40 hover:border-emerald-500/30 hover:shadow-emerald-500/5"
                                }`}
                        >
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                <div className="flex items-start gap-4">
                                    <div className={`p-3 rounded-xl ${edu.highlight ? "bg-emerald-500" : "bg-primary/10"}`}>
                                        <GraduationCap className={`w-6 h-6 ${edu.highlight ? "text-white" : "text-emerald-500"}`} />
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold text-foreground group-hover:text-emerald-500 transition-colors">
                                            {edu.degree}
                                        </h3>
                                        <p className="text-lg text-muted-foreground mt-1">{edu.institution}</p>

                                        <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
                                            <span className="flex items-center">
                                                <MapPin className="w-4 h-4 mr-1 text-emerald-500" />
                                                {edu.location}
                                            </span>
                                            <span className="flex items-center">
                                                <Calendar className="w-4 h-4 mr-1 text-emerald-500" />
                                                {edu.period}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="md:text-right">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                                        <Award className="w-4 h-4 text-emerald-500" />
                                        <span className="text-emerald-500 font-bold">{edu.gpa}</span>
                                    </div>
                                </div>
                            </div>

                            {edu.coursework.length > 0 && (
                                <div className="mt-6 pt-6 border-t border-primary/10">
                                    <h4 className="text-sm font-medium text-muted-foreground mb-3">Relevant Coursework</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {edu.coursework.map((course, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1.5 text-xs font-medium bg-primary/5 text-muted-foreground rounded-lg border border-primary/10 hover:border-emerald-500/30 hover:bg-emerald-500/10 hover:text-emerald-500 transition-colors"
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
