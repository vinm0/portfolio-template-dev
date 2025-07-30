import { HeroSection } from "components/sections/hero-section"
import { SkillsSection } from "components/sections/skills-section"
import { ProjectsSection } from "components/sections/projects-section"
import { ArchitectureSection } from "components/sections/architecture-section"
import { BlogSection } from "components/sections/blog-section"
import { ContactSection } from "components/sections/contact-section"
import { Footer } from "components/sections/footer"
import { ThemeToggle } from "components/ui/theme-toggle"
import { HeroSectionNew } from "@/components/sections/hero-section-new"

export default function Home() {
  return (
    <main className="relative">
      {/* Theme Toggle - Fixed Position */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Navigation */}
      <nav className="fixed top-6 left-6 z-50">
        <div className="flex items-center gap-4 px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full border border-slate-200 dark:border-slate-700">
          <a
            href="#hero"
            className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Home
          </a>
          <a
            href="#skills"
            className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Skills
          </a>
          <a
            href="#projects"
            className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Projects
          </a>
          <a
            href="#blog"
            className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Blog
          </a>
          <a
            href="#contact"
            className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Contact
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <div id="hero">
        <HeroSectionNew />
        {/* <HeroSection /> */}
      </div>

      <SkillsSection />
      <ProjectsSection />
      <ArchitectureSection />
      <BlogSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
