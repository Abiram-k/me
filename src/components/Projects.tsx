import { useState } from "react";
import { Github, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
// import { projectsData } from '../data/projects';
import ProjectModal from "./ProjectModal";
// import type { ProjectItem } from '../types';

type ProjectItem = {
  title: string;
  description: string;
  image: string;
  tech: string[];
  github: string;
  live: string;
};

const projectsData: ProjectItem[] = [
  {
    title: "StackNest – Real-time Dev Community",
    description:
      "A collaborative platform for developers to connect, join rooms, share projects and articles, and engage in real-time discussions. Built using React, Redux, Node.js, and MongoDB. Followed by clean repository architecture (SOLID)",
    image: "stacknest.png",
    tech: [
      "React",
      "Node.js",
      "MongoDB",
      "Express",
      "DSA",
      "OAuth",
      "Jwt",
      "Tailwind CSS",
    ],
    github: "https://github.com/Abiram-k/StackNest",
    live: "https://stacknest.abiram.website",
  },
  {
    title: "Gaming Products E-Commerce",
    description:
      "A dynamic e-commerce website for gaming products, built with React, Redux, Node.js, and MongoDB.",
    image: "firstProject.png",
    tech: [
      "React",
      "Redux",
      "Node.js",
      "MongoDB",
      "Tailwind CSS",
      "Typescript",
    ],
    github: "https://github.com/Abiram-k/SkillPulse",
    live: "https://skillpulse.abiram.website",
  },
  {
    title: "OCR - Aadhaar",
    description:
      "An intelligent OCR system that extracts and validates Aadhaar card details using Google Cloud Vision API. Built with React, TypeScript, and Express, offering fast and accurate text recognition.",
    image: "ocr-adhaar.png",
    tech: ["React", "Typescript", "Google Cloud Vision", "Express"],
    github: "https://github.com/Abiram-k/OCR-System",
    live: "https://ocr-system-476z.onrender.com/",
  },
  {
    title: "Mapty",
    description:
      "This is a miniproject that i build using javascript, HTML and CSS, and also i used the power of ES6 class in this project ",
    image: "mapty.png",
    tech: ["Java Script (ES6 Classes)", "HTML", "CSS"],
    github: "https://github.com/Abiram-k/mapty.git",
    live: " https://abiram-k.github.io/mapty/",
  },
  {
    title: "Smolink - URL Shortener",
    description:
      "A minimalistic and efficient URL shortener that generates unique short links with QR code support and clipboard copying. Built with React, Express, and MongoDB.",
    image: "url-shortner.jpeg",
    tech: ["React", "Express", "MongoDB", "ShortID", "QR Code"],
    github: "https://github.com/Abiram-k/URL_Shortner",
    live: "",
  },
  {
    title: "Student Portal",
    description:
      "A comprehensive portal for students to show their details. Built with the MERN stack and supports user roles, real-time updates, and responsive design.",
    image: "student-portal.jpeg",
    tech: ["React", "Redux", "Node.js", "Express", "SQL", "Typescript"],
    github: "https://github.com/Abiram-k/student_mangment",
    live: "",
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null
  );

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Selected Projects
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.2 },
            },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {projectsData.map((project, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -8 }}
              onClick={() => setSelectedProject(project)}
              className="group relative bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github className="w-5 h-5" />
                    Code
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="w-5 h-5" />
                    Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
