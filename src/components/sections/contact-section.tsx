"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, MapPin, Phone, Send, CheckCircle, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { CONTACT } from "@/lib/constants/brand"

interface FormData {
  name: string
  email: string
  message: string
}

interface FormStatus {
  type: "idle" | "loading" | "success" | "error"
  message: string
}

export function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: ""
  })
  const [status, setStatus] = useState<FormStatus>({
    type: "idle",
    message: ""
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.message) {
      setStatus({
        type: "error",
        message: "Please fill in all fields"
      })
      return
    }

    setStatus({
      type: "loading",
      message: "Sending message..."
    })

    try {
      // Send to API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      setStatus({
        type: "success",
        message: data.message || "Message sent successfully! I'll get back to you soon."
      })

      setFormData({ name: "", email: "", message: "" })
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Failed to send message. Please try again."
      })
    }
  }

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Ready to discuss your next project or explore collaboration opportunities?
            I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                Let's start a conversation
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Whether you're looking for a senior engineer to join your team,
                need consultation on system architecture, or want to discuss
                potential collaboration, I'm always open to meaningful conversations
                about technology and innovation.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
              >
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="font-medium text-slate-900 dark:text-slate-100">Email</div>
                  <a
                    href={CONTACT.EMAIL.HREF}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {CONTACT.EMAIL.ADDRESS}
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
              >
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Phone className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="font-medium text-slate-900 dark:text-slate-100">Phone</div>
                  <a
                    href={CONTACT.PHONE.LINK}
                    className="text-green-600 dark:text-green-400 hover:underline"
                  >
                    {CONTACT.PHONE.NUMBER}
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
              >
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <div className="font-medium text-slate-900 dark:text-slate-100">Location</div>
                  <div className="text-slate-600 dark:text-slate-400">{CONTACT.ADDRESS.LABEL}</div>
                </div>
              </motion.div>
            </div>

            {/* Availability Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium">Available for new opportunities</span>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700 shadow-lg"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={cn(
                      "w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600",
                      "bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100",
                      "focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20",
                      "transition-colors duration-200"
                    )}
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={cn(
                      "w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600",
                      "bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100",
                      "focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20",
                      "transition-colors duration-200"
                    )}
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className={cn(
                    "w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600",
                    "bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100",
                    "focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20",
                    "transition-colors duration-200 resize-none"
                  )}
                  placeholder="Tell me about your project or how I can help..."
                />
              </div>

              <button
                type="submit"
                disabled={status.type === "loading"}
                className={cn(
                  "w-full flex items-center justify-center gap-2 px-8 py-4 rounded-lg",
                  "bg-blue-600 text-white font-semibold",
                  "hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed",
                  "transform hover:scale-105 disabled:hover:scale-100",
                  "transition-all duration-200 shadow-lg hover:shadow-xl"
                )}
              >
                {status.type === "loading" ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>

              {/* Status Message */}
              {status.type !== "idle" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex items-center gap-2 p-4 rounded-lg",
                    status.type === "success"
                      ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                      : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
                  )}
                >
                  {status.type === "success" ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <AlertCircle className="w-5 h-5" />
                  )}
                  <span className="text-sm font-medium">{status.message}</span>
                </motion.div>
              )}
            </form>

            {/* Alternative Contact */}
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700 text-center">
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Prefer email? Reach out directly at{" "}
                <a
                  href={CONTACT.EMAIL.HREF}
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  {CONTACT.EMAIL.ADDRESS}
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
