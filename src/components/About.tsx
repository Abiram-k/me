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
              Hi, I'm Abiram, an aspiring software developer with a passion for
              learning and building impactful solutions. Currently, I am working
              as an intern at Brototype for the past 6 months, where I am honing
              my skills and gaining valuable industry experience.
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
                <h3 className="font-bold text-xl text-gray-900">6</h3>
                <p className="text-gray-600">Months Experience</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-bold text-xl text-gray-900">Aspiring</h3>
                <p className="text-gray-600">Software Developer</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

