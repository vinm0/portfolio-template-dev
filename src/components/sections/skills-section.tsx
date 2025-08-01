"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils/utils"
import AnimatedGrid from "../ui/animations/AnimatedGrid"

interface Skill {
  name: string
  level: number
  years: number
  category: "languages" | "frameworks" | "devops" | "databases"
}

const skills: Skill[] = [
  { name: "Python", level: 95, years: 6, category: "languages" },
  { name: "TypeScript", level: 90, years: 4, category: "languages" },
  { name: "Go", level: 80, years: 2, category: "languages" },
  { name: "JavaScript", level: 88, years: 5, category: "languages" },
  { name: "React", level: 92, years: 4, category: "frameworks" },
  { name: "Next.js", level: 85, years: 3, category: "frameworks" },
  { name: "FastAPI", level: 90, years: 3, category: "frameworks" },
  { name: "Django", level: 85, years: 4, category: "frameworks" },
  { name: "Node.js", level: 82, years: 3, category: "frameworks" },
  { name: "Docker", level: 88, years: 4, category: "devops" },
  { name: "Kubernetes", level: 75, years: 2, category: "devops" },
  { name: "AWS", level: 80, years: 3, category: "devops" },
  { name: "CI/CD", level: 85, years: 4, category: "devops" },
  { name: "PostgreSQL", level: 85, years: 5, category: "databases" },
  { name: "MongoDB", level: 78, years: 3, category: "databases" },
  { name: "Redis", level: 80, years: 3, category: "databases" },
]

const categories = [
  { key: "all", label: "All Technologies", icon: "🚀" },
  { key: "languages", label: "Languages", icon: "💻" },
  { key: "frameworks", label: "Frameworks", icon: "⚛️" },
  { key: "devops", label: "DevOps", icon: "🔧" },
  { key: "databases", label: "Databases", icon: "🗄️" },
]

export function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const filteredSkills = useMemo(() =>
    selectedCategory === "all"
      ? skills
      : skills.filter(skill => skill.category === selectedCategory)
    , [selectedCategory])

  const handleCategoryChange = (newCategory: string) => {
    if (newCategory === selectedCategory) return

    setIsTransitioning(true)

    // Delay the category change to allow exit animation
    setTimeout(() => {
      setSelectedCategory(newCategory)
      setIsTransitioning(false)
    }, 200)
  }

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Tech Stack
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Technologies I use to build scalable, performant applications
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => handleCategoryChange(category.key)}
              className={cn(
                "px-6 py-3 rounded-full font-medium transition-all duration-200",
                "border-2 flex items-center gap-2",
                selectedCategory === category.key
                  ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                  : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-600 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400"
              )}
            >
              <span className="text-sm">{category.icon}</span>
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <AnimatedGrid
            mode="wait"
            gridClassName="grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-12"
            items={filteredSkills}
            getItemKey={(skill) => `${selectedCategory}-${skill.name}`}
            renderItem={(skill) => (
              <div
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <div className="text-center">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    {skill.name}
                  </h3>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {skill.level}%
                  </div>
                </div>

                {hoveredSkill === skill.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-2 right-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs px-2 py-1 rounded-md z-20"
                  >
                    {skill.years} years
                  </motion.div>
                )}
              </div>
            )}
          />
        </motion.div>

        {/* Skill Categories with Progress Bars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 text-center mb-8">
            Expertise Areas
          </h3>

          {[
            { name: "Backend Development", level: 90, gradient: "bg-gradient-to-r from-red-700 to-orange-400" },
            { name: "Frontend Development", level: 85, gradient: "bg-gradient-to-r from-yellow-700 to-green-400" },
            { name: "DevOps & Cloud", level: 75, gradient: "bg-gradient-to-r from-cyan-700 to-blue-400" },
            { name: "System Architecture", level: 80, gradient: "bg-gradient-to-r from-indigo-700 to-purple-400" },
          ].map((area, index) => (
            <motion.div
              key={area.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center gap-4"
            >
              <div className="w-40 text-right">
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  {area.name}
                </span>
              </div>
              <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${area.level}%` }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                  viewport={{ once: true }}
                  className={cn("h-full rounded-full", area.gradient)}
                />
              </div>
              <div className="w-12 text-left">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {area.level}%
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
