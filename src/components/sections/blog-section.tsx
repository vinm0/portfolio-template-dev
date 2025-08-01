"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Clock, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils/utils"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  publishDate: string
  readTime: number
  tags: string[]
  featured: boolean
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Optimizing Next.js Performance with Advanced Caching Strategies",
    excerpt: "Learn how to implement sophisticated caching mechanisms in Next.js applications to achieve sub-second page loads and improve user experience.",
    content: "In this comprehensive guide, we'll explore advanced caching strategies for Next.js applications, including ISR, edge caching, and database query optimization. We'll cover real-world scenarios and performance benchmarks that demonstrate the impact of proper caching implementation...",
    publishDate: "2024-01-15",
    readTime: 8,
    tags: ["Next.js", "Performance", "Caching", "Web Development"],
    featured: true
  },
  {
    id: "2",
    title: "Building Scalable GraphQL APIs with Python and FastAPI",
    excerpt: "A deep dive into creating high-performance GraphQL APIs using Python, FastAPI, and modern database optimization techniques.",
    content: "GraphQL has revolutionized how we think about API design. In this article, we'll build a production-ready GraphQL API using FastAPI, implementing advanced features like N+1 query resolution, custom directives, and real-time subscriptions...",
    publishDate: "2024-01-08",
    readTime: 12,
    tags: ["GraphQL", "Python", "FastAPI", "API Design"],
    featured: true
  },
  {
    id: "3",
    title: "Kubernetes Deployment Strategies for High-Availability Applications",
    excerpt: "Master deployment patterns that ensure zero-downtime updates and robust failover mechanisms in production Kubernetes clusters.",
    content: "Production Kubernetes deployments require careful planning and execution. This guide covers blue-green deployments, canary releases, and circuit breaker patterns that ensure your applications remain available during updates and unexpected failures...",
    publishDate: "2024-01-01",
    readTime: 15,
    tags: ["Kubernetes", "DevOps", "High Availability", "Deployment"],
    featured: false
  },
  {
    id: "4",
    title: "Real-time Data Processing with Apache Kafka and Python",
    excerpt: "Build robust event-driven architectures using Kafka for high-throughput data streaming and processing.",
    content: "Event-driven architectures are essential for modern applications. Learn how to implement reliable message processing, handle backpressure, and ensure exactly-once delivery semantics using Apache Kafka and Python...",
    publishDate: "2023-12-20",
    readTime: 10,
    tags: ["Kafka", "Python", "Streaming", "Event-Driven"],
    featured: false
  }
]

export function BlogSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [expandedPost, setExpandedPost] = useState<BlogPost | null>(null)

  const featuredPosts = blogPosts.filter(post => post.featured)
  const currentPost = featuredPosts[currentIndex]

  const nextPost = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredPosts.length)
  }

  const prevPost = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredPosts.length) % featuredPosts.length)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Latest Articles
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Sharing insights on software engineering, system design, and emerging technologies
          </p>
        </motion.div>

        {/* Featured Post Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative mb-12"
        >
          <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPost.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-8"
              >
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full">
                        Featured
                      </span>
                      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                        <Calendar className="w-4 h-4" />
                        {formatDate(currentPost.publishDate)}
                      </div>
                      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                        <Clock className="w-4 h-4" />
                        {currentPost.readTime} min read
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4 leading-tight">
                      {currentPost.title}
                    </h3>

                    <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                      {currentPost.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {currentPost.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => setExpandedPost(currentPost)}
                      className={cn(
                        "inline-flex items-center gap-2 text-blue-600 dark:text-blue-400",
                        "hover:text-blue-700 dark:hover:text-blue-300 font-medium",
                        "transition-colors duration-200"
                      )}
                    >
                      Read More <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="lg:w-80">
                    <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <div className="text-white text-4xl font-bold opacity-20">
                        {currentPost.title.split(' ')[0].charAt(0)}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Carousel Navigation */}
            <div className="flex items-center justify-between px-8 pb-6">
              <button
                onClick={prevPost}
                className={cn(
                  "p-2 rounded-full bg-slate-100 dark:bg-slate-700",
                  "text-slate-600 dark:text-slate-400",
                  "hover:bg-slate-200 dark:hover:bg-slate-600",
                  "transition-colors duration-200"
                )}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex gap-2">
                {featuredPosts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-colors duration-200",
                      index === currentIndex
                        ? "bg-blue-600"
                        : "bg-slate-300 dark:bg-slate-600"
                    )}
                  />
                ))}
              </div>

              <button
                onClick={nextPost}
                className={cn(
                  "p-2 rounded-full bg-slate-100 dark:bg-slate-700",
                  "text-slate-600 dark:text-slate-400",
                  "hover:bg-slate-200 dark:hover:bg-slate-600",
                  "transition-colors duration-200"
                )}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* All Posts Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 mb-12"
        >
          {blogPosts.slice(0, 4).map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
                ease: "easeOut"
              }}
              viewport={{ once: true }}
              className={cn(
                "bg-white dark:bg-slate-800 rounded-xl p-6 relative overflow-hidden",
                "border border-slate-200 dark:border-slate-700",
                "hover:shadow-lg hover:border-blue-600 dark:hover:border-blue-400",
                "transition-all duration-200 cursor-pointer group"
              )}
              onClick={() => setExpandedPost(post)}
            >
              {/* Shimmer effect */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1 + 0.6,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none z-10"
              />

              <div className="relative z-20">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm mb-3">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.publishDate)}
                  <Clock className="w-4 h-4 ml-2" />
                  {post.readTime} min
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* View All Articles Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a
            href="/blog"
            className={cn(
              "inline-flex items-center gap-2 px-8 py-4 rounded-xl",
              "bg-blue-600 text-white font-semibold",
              "hover:bg-blue-700 transform hover:scale-105",
              "transition-all duration-200 shadow-lg hover:shadow-xl"
            )}
          >
            View All Articles <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>

        {/* Article Modal */}
        <AnimatePresence>
          {expandedPost && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setExpandedPost(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white dark:bg-slate-800 rounded-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                          <Calendar className="w-4 h-4" />
                          {formatDate(expandedPost.publishDate)}
                        </div>
                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                          <Clock className="w-4 h-4" />
                          {expandedPost.readTime} min read
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
                        {expandedPost.title}
                      </h3>
                    </div>
                    <button
                      onClick={() => setExpandedPost(null)}
                      className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {expandedPost.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="prose-custom">
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {expandedPost.content}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                    <a
                      href={`/blog/${expandedPost.id}`}
                      className={cn(
                        "inline-flex items-center gap-2 px-6 py-3 rounded-lg",
                        "bg-blue-600 text-white font-medium",
                        "hover:bg-blue-700 transition-colors"
                      )}
                    >
                      Read Full Article <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
