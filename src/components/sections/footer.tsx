"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Twitter, ArrowUp, Heart } from "lucide-react"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { cn } from "@/lib/utils/utils"
import { AUTHOR, CONTACT, SOCIALS } from "@/lib/constants/brand"

const quickLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Blog", href: "#blog" },
  { name: "Contact", href: "#contact" }
]

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="md:col-span-2"
            >
              <h3 className="text-2xl font-bold text-white mb-4">
                {AUTHOR.FULL_NAME}
              </h3>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Senior Software Engineer passionate about building scalable systems
                and solving complex problems with modern technologies. Always excited
                to collaborate on innovative projects.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                {Object.keys(SOCIALS).map((key) => {
                  const social = SOCIALS[key as keyof typeof SOCIALS]
                  return (
                    <motion.a
                      key={key}
                      href={social.HREF}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={cn(
                        "p-2 rounded-lg bg-slate-800 text-slate-400",
                        "transition-colors duration-200",
                        social.COLOR
                      )}
                      aria-label={key}
                    >
                      <social.ICON className="w-5 h-5" />
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold text-white mb-4">Get in Touch</h4>
              <div className="space-y-2">
                <p className="text-slate-400">
                  <a
                    href={CONTACT.EMAIL.HREF}
                    className="hover:text-white transition-colors duration-200"
                  >
                    {CONTACT.EMAIL.ADDRESS}
                  </a>
                </p>
                <p className="text-slate-400">{CONTACT.ADDRESS.LABEL}</p>
                <div className="flex items-center gap-2 mt-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm text-green-400">Available for opportunities</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-slate-800 py-6"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-slate-400">
              <span>© {currentYear} {AUTHOR.FULL_NAME}. Made with</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>and lots of coffee</span>
            </div>

            <div className="flex items-center gap-4">
              <ThemeToggle />

              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "p-2 rounded-lg bg-slate-800 text-slate-400",
                  "hover:bg-slate-700 hover:text-white",
                  "transition-colors duration-200"
                )}
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
