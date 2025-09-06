import { Briefcase, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

const timelineData = [
  {
    year: "2021 - 2024",
    title: "BSc Computer Science",
    company: "Bharathiar University (MG University)",
    description:
      "Pursuing a degree in Computer Science with a focus on software development, algorithms, and web technologies.",
    icon: "education",
  },
  {
    year: "2024 - 2025",
    title: "MERN Stack Developer",
    company: "Brototype",
    description:
      "Worked as a MERN stack developer intern, building full-stack applications and gaining hands-on experience in React, Node.js, and MongoDB.",
    icon: "work",
  },
  {
    year: "2025",
    title: "Full Stack Engineer",
    company: "Annam Ai",
    description:
      "Contributing as a Full Stack Engineer, driving the development of scalable web applications and delivering seamless user experiences. Currently working on the 'Vibe' project, where I focus on building impactful features, improving performance, and ensuring product reliability.",
    icon: "work",
  },
];

export default function Timeline() {
  return (
    <section
      id="timeline"
      className="py-20 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Experience & Education
        </motion.h2>

        <div className="relative">
          {/* Vertical Line - hidden on mobile, visible from md breakpoint */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-200 hidden md:block" />

          <div className="space-y-12">
            {timelineData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className="w-full md:w-1/2 px-4 md:px-8">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white p-6 rounded-lg shadow-md text-left md:text-left lg:text-right"
                  >
                    <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium mb-2">
                      {item.year}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-indigo-600 font-medium">
                      {item.company}
                    </p>
                    <p className="text-gray-600 mt-2">{item.description}</p>
                  </motion.div>
                </div>

                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center z-10 my-4 md:my-0"
                >
                  {item.icon === "work" ? (
                    <Briefcase className="w-6 h-6 text-white" />
                  ) : (
                    <GraduationCap className="w-6 h-6 text-white" />
                  )}
                </motion.div>

                {/* Empty space for the other side - hidden on mobile, visible from md breakpoint */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
