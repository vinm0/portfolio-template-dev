"use client"

import { useState, useEffect } from "react"
import { ChevronDown, Download, Mail } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { AUTHOR } from "@/lib/constants/brand"

const taglines = [
  "I build scalable systems with Python, Next.js, and Kubernetes",
  "Full-stack engineer passionate about clean code and performance",
  "Architecting solutions that scale from startup to enterprise"
]

export function HeroSection() {
  const [currentTagline, setCurrentTagline] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    let timeout: NodeJS.Timeout
    const currentText = taglines[currentTagline]

    if (isTyping) {
      if (displayedText.length < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentText.slice(0, displayedText.length + 1))
        }, 20)
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false)
        }, 3000)
      }
    } else {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1))
        }, 10)
      } else {
        setCurrentTagline((prev) => (prev + 1) % taglines.length)
        setIsTyping(true)
      }
    }

    return () => clearTimeout(timeout)
  }, [displayedText, isTyping, currentTagline])

  const scrollToNextSection = () => {
    const nextSection = document.getElementById("skills")
    nextSection?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-slate-900 via-blue-600 to-slate-900 bg-clip-text text-transparent dark:from-slate-100 dark:via-blue-400 dark:to-slate-100">
              {AUTHOR.FULL_NAME}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-4 text-xl sm:text-2xl text-slate-600 dark:text-slate-300 font-medium"
          >
            {AUTHOR.TITLE}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-8 h-16 flex items-center justify-center"
          >
            <p className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 max-w-3xl">
              {displayedText}
              <span className={cn(
                "inline-block w-0.5 h-6 bg-blue-600 ml-1",
                "animate-pulse"
              )} />
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button className={cn(
              "inline-flex items-center gap-2 px-8 py-4 rounded-xl",
              "bg-blue-600 text-white font-semibold",
              "hover:bg-blue-700 transform hover:scale-105",
              "transition-all duration-200 shadow-lg hover:shadow-xl",
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
              "dark:focus:ring-offset-slate-900"
            )}>
              <Download className="w-5 h-5" />
              Download Resume
            </button>

            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className={cn(
                "inline-flex items-center gap-2 px-8 py-4 rounded-xl",
                "border-2 border-slate-300 text-slate-700 font-semibold",
                "dark:border-slate-600 dark:text-slate-300",
                "hover:border-blue-600 hover:text-blue-600",
                "dark:hover:border-blue-400 dark:hover:text-blue-400",
                "transform hover:scale-105 transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                "dark:focus:ring-offset-slate-900"
              )}
            >
              <Mail className="w-5 h-5" />
              Contact Me
            </button>
          </motion.div>
        </motion.div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        onClick={scrollToNextSection}
        className={cn(
          "absolute bottom-8 left-1/2 transform -translate-x-1/2",
          "p-2 rounded-full text-slate-400 hover:text-blue-600",
          "dark:hover:text-blue-400 transition-colors duration-200",
          "animate-bounce focus:outline-none focus:ring-2 focus:ring-blue-500"
        )}
        aria-label="Scroll to next section"
      >
        <ChevronDown className="w-6 h-6" />
      </motion.button>
    </section>
  )
}
