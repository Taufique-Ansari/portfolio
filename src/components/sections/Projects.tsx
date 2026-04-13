"use client";

import { ExternalLink, Github, Layers, Database, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
    {
        title: "Digital Book Store Management System",
        subtitle: "Full-Stack Web Application",
        description:
            "A comprehensive book store management system built using enterprise-grade technologies for robust backend data management and secure user access.",
        technologies: ["Spring Boot", "Spring Data JPA", "Hibernate", "MySQL", "Angular", "JWT", "Maven", "Git"],
        features: [
            "Built using Spring Boot, integrating Spring Data JPA, Hibernate, and MySQL for backend data management",
            "Implemented Spring Security with JWT authentication for secure and role-based user access",
            "Developed RESTful APIs and connected them with an Angular frontend for seamless interaction",
        ],
        icon: Database,
        gradient: "from-red-500 to-neutral-500",
    },
    {
        title: "BrandMate",
        subtitle: "Influencer Marketing Simulation Platform",
        description:
            "A full-stack web application to simulate influencer-brand collaboration, featuring modern UI and robust backend services.",
        technologies: ["React", "Redux", "Express.js", "MongoDB", "Node.js"],
        features: [
            "Developed a full-stack web application to simulate influencer-brand collaboration",
            "Implemented UI using React and state management with Redux",
            "Designed backend services using Express.js and MongoDB",
        ],
        icon: Globe,
        gradient: "from-red-500 to-neutral-500",
        link: "https://brandmate-platform.vercel.app",
    },
];

export function Projects() {
    return (
        <section id="projects" className="py-20 px-4 md:px-8 lg:px-16 relative bg-gradient-to-b from-background to-background/50">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-[rgba(255,0,0,0.8)] font-doto font-bold text-sm uppercase tracking-widest">Portfolio</span>
                    <h2 className="font-hedvig text-4xl md:text-5xl font-bold mt-2 text-black">
                        Featured Projects
                    </h2>
                    <p className="text-[#555] font-doto mt-4 max-w-2xl mx-auto">
                        Showcasing my work in full-stack development, from enterprise applications to modern web platforms
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="group relative rounded-2xl border border-primary/10 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm overflow-hidden hover:border-red-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/10"
                        >
                            {/* Gradient overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                            {/* Content */}
                            <div className="relative p-6 md:p-8">
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`p-3 rounded-xl bg-gradient-to-br ${project.gradient} opacity-80`}>
                                        <project.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex gap-2">
                                        {project.link && (
                                            <a href={project.link} target="_blank" rel="noopener noreferrer">
                                                <Button variant="ghost" size="icon" className="hover:bg-red-500/10 hover:text-red-500">
                                                    <ExternalLink className="w-5 h-5" />
                                                </Button>
                                            </a>
                                        )}
                                        <Button variant="ghost" size="icon" className="hover:bg-red-500/10 hover:text-red-500">
                                            <Github className="w-5 h-5" />
                                        </Button>
                                    </div>
                                </div>

                                <h3 className="text-xl md:text-2xl font-hedvig font-bold text-[#222] group-hover:text-red-500 transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-[rgba(255,0,0,0.8)] font-doto text-sm font-bold mt-1">{project.subtitle}</p>

                                <p className="text-[#555] font-doto mt-4 text-sm leading-relaxed">
                                    {project.description}
                                </p>

                                <ul className="mt-4 space-y-2">
                                    {project.features.map((feature, i) => (
                                        <li key={i} className="flex items-start text-sm text-[#333] font-doto leading-relaxed">
                                            <Layers className="w-4 h-4 mr-2 mt-0.5 text-[rgba(255,0,0,0.8)] flex-shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                {/* Technologies */}
                                <div className="flex flex-wrap gap-2 mt-6">
                                    {project.technologies.map((tech, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 text-xs font-bold font-doto bg-red-500/5 text-[#555] rounded-full border border-red-500/10 hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-500 transition-colors cursor-default"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
