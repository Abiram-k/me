import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "../utils/animations";

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-16"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          About Me
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.div
            className="aspect-square rounded-2xl overflow-hidden"
            variants={fadeInUp}
          >
            <img
              src="aboutme.jpg" // Replace with the path to your coding image
              alt="Coding Illustration"
              className="w-full h-full object-cover rounded-2xl"
            />
          </motion.div>

          <motion.div className="space-y-6" variants={staggerContainer}>
            <motion.p className="text-lg text-gray-600" variants={fadeInUp}>
              - An independent and self-motivated hardworking individual
              dedicated towards goals!
            </motion.p>
            <motion.p className="text-lg text-gray-600" variants={fadeInUp}>
              Hi, I'm Abiram, a software developer with a strong
              passion for learning and building impactful solutions. I am
              currently working as an intern at Brototype, where I'm gaining
              valuable industry experience and honing my technical skills.
              Additionally, I am a self-taught developer, continuously learning
              new technologies and refining my expertise to stay ahead in the
              ever-evolving tech industry.
            </motion.p>

            <motion.p className="text-lg text-gray-600" variants={fadeInUp}>
              With a strong foundation in modern web technologies and a
              commitment to continuous growth, I aim to contribute to innovative
              projects and collaborate with teams to solve real-world problems
              through technology.
            </motion.p>

            <motion.div
              className="grid grid-cols-2 gap-4 pt-4"
              variants={fadeInUp}
            >
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-bold text-xl text-gray-900">1+</h3>
                <p className="text-gray-600">Year Experience</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-bold text-xl text-gray-900">Full Stack Engineer</h3>
                <p className="text-gray-600">Crafting modern, user-focused applications</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
