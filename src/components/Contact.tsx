import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState, useRef } from 'react';
// import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
// import { fadeInUp, staggerContainer } from '../utils/animations';



export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    try {
      setIsSubmitting(true);
      const form = e.currentTarget;
      const formData = new FormData(form);
      formData.append("access_key", "a052d102-3ab1-4558-b663-076b09530515");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const result = await response.json();
      if ( result.success) {
        toast.success("Message sent successfully!");
        formRef.current.reset();
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Get In Touch
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          initial="hidden"
          animate="visible"
        >
          <motion.div className="space-y-8">
            <h3 className="text-2xl font-bold text-gray-900">Let's talk about everything!</h3>
            <p className="text-gray-600">
              Feel free to reach out for collaborations, opportunities, or just a friendly chat.
            </p>

            <div className="space-y-6">
              <motion.div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="text-gray-900 font-medium">abiramk4572@gmail.com</p>
                </div>
              </motion.div>

              <motion.div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="text-gray-900 font-medium">Kerala, India</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                defaultValue=""
                className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="mt-1 block w-full p-2  rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Sending..." : <>Send Message<Send className="w-5 h-5" /></>}
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}
