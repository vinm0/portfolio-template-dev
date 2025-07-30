"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ExternalLink, Github, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import AnimatedGrid from "../ui/animations/AnimatedGrid"
import Modal from "../ui/Modal"

interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  technologies: string[]
  category: "web" | "backend" | "mobile" | "devops"
  githubUrl: string
  liveUrl?: string
  imageUrl: string
  challenges: string[]
  solutions: string[]
  featured: boolean
}

const projects: Project[] = [
  {
    id: "1",
    title: "NAFRIS - Resale Inventory System",
    description: "Modernized Air Force inventory management system tracking $2.5M annual inventory across 1,000+ warehouses",
    longDescription: "Replaced legacy Windows Server system with a modern web-based solution that tracks $2.5M annual inventory across 1,000+ warehouses with 99.9% uptime. Modernized transaction processing for receive, transfer in/out, and inventory adjustments across all Air Force service bases.",
    technologies: ["TypeScript", "React", "PnPjs", "ExcelJS", "SharePoint REST API", "Microsoft 365"],
    category: "web",
    githubUrl: "https://github.com/vinm0/nafris-demo",
    imageUrl: "/api/placeholder/600/400",
    challenges: [
      "Replacing legacy Windows Server system with 99.9% uptime requirement",
      "Processing complex inventory transactions across 1,000+ warehouses",
      "Ensuring data accuracy for $2.5M annual inventory tracking",
      "Maintaining compatibility with existing Air Force workflows"
    ],
    solutions: [
      "Built modern React-based web application with TypeScript for type safety",
      "Implemented robust SharePoint REST API integration for data management",
      "Used ExcelJS for seamless data import/export compatibility",
      "Designed modular architecture for scalability across service bases"
    ],
    featured: true
  },
  {
    id: "2",
    title: "Commercial Sponsorship Management System",
    description: "Automated compliance tracking system managing $500K+ in 2,000+ annual commercial agreements",
    longDescription: "Automated compliance tracking for Air Force Instruction 34-108, managing $500K+ in 2,000+ annual commercial agreements. Integrated approval workflows and comprehensive reporting for all sponsorship, donation, and advertisement activities with full audit compliance.",
    technologies: ["TypeScript", "React", "PnPjs", "SharePoint REST API", "Automated Workflows", "Compliance Reporting"],
    category: "web",
    githubUrl: "https://github.com/vinm0/sponsorship-system",
    imageUrl: "/api/placeholder/600/400",
    challenges: [
      "Ensuring compliance with Air Force Instruction 34-108 regulations",
      "Managing complex approval workflows for 2,000+ annual agreements",
      "Tracking $500K+ in commercial activities with audit requirements",
      "Integrating with existing Air Force administrative systems"
    ],
    solutions: [
      "Implemented automated compliance checking against AFI 34-108",
      "Built intuitive React interfaces with guided approval workflows",
      "Created comprehensive audit trails and reporting dashboards",
      "Designed modular component architecture reducing development time by 30%"
    ],
    featured: true
  },
  {
    id: "3",
    title: "Air Force Budget Tool",
    description: "Financial planning system for 200+ MWR activities processing $15M+ in quarterly budgets",
    longDescription: "Streamlined financial planning for 200+ MWR (Morale, Welfare, and Recreation) activities, processing $15M+ in quarterly budgets. Enhanced budget preparation, review, and approval workflow with real-time Budgeted vs Actual comparisons and automated financial benchmarking.",
    technologies: ["TypeScript", "React", "PnPjs", "ExcelJS", "SharePoint REST API", "Financial Analytics"],
    category: "web",
    githubUrl: "https://github.com/vinm0/budget-tool",
    imageUrl: "/api/placeholder/600/400",
    challenges: [
      "Processing $15M+ in quarterly budgets across 200+ activities",
      "Implementing real-time budget vs actual comparisons",
      "Creating automated financial benchmarking and reporting",
      "Ensuring accuracy and compliance in financial data handling"
    ],
    solutions: [
      "Built comprehensive budget management workflow system",
      "Implemented real-time financial analytics and comparison tools",
      "Created automated benchmarking algorithms for financial planning",
      "Integrated Excel compatibility for seamless data migration"
    ],
    featured: false
  },
  {
    id: "4",
    title: "W-2 Generation Tool",
    description: "IRS compliance system processing $5M in gaming winnings annually with NIST security controls",
    longDescription: "Automated IRS compliance system for gaming activities that processes $5M in winnings annually, generating 4,000+ W-2s for transactions $1,200 and above. Implemented NIST SP 800-171 controls for PII handling, comprehensive audit trails, and regulatory compliance reporting.",
    technologies: ["TypeScript", "React", "PnPjs", "SharePoint REST API", "NIST Security Controls", "PII Protection"],
    category: "backend",
    githubUrl: "https://github.com/vinm0/w2-generation",
    imageUrl: "/api/placeholder/600/400",
    challenges: [
      "Processing $5M in gaming winnings with IRS compliance requirements",
      "Handling sensitive PII data with NIST SP 800-171 security controls",
      "Generating 4,000+ W-2 forms annually with accuracy requirements",
      "Maintaining comprehensive audit trails for regulatory compliance"
    ],
    solutions: [
      "Implemented NIST SP 800-171 security framework for PII protection",
      "Built automated W-2 generation system with IRS validation",
      "Created comprehensive audit logging and compliance reporting",
      "Designed secure data handling workflows with role-based access"
    ],
    featured: false
  },
  {
    id: "5",
    title: "Fancy Path - URL Parser",
    description: "Fancy Path is a url path parser written for Go web apps. It provides a simple way to parse URL paths and extract parameters.",
    longDescription: "Fancy Path is a URL path parser written in Go for web applications. It provides a simple way to parse URL paths and extract parameters, making it easier to handle dynamic routes in web applications.",
    technologies: ["Go", "Regex", "HTTP Routing"],
    category: "backend",
    githubUrl: "https://github.com/vinm0/fancypath",
    imageUrl: "/api/placeholder/600/400",
    challenges: [
      "Creating a flexible URL parsing solution for Go web apps",
      "Handling dynamic routes with variable parameters",
      "Ensuring performance and reliability in URL parsing",
      "Integrating with existing Go web frameworks",
      "Gorilla Mux requires specific patterns for each route handler",
      "Need for more general pattern matching without listing every possible route",
      "Handlers often need to make decisions based on the full request path",
      "Traditional routers lack flexibility for dynamic path handling within handlers"
    ],
    solutions: [
      "Developed a lightweight Go library for URL path parsing",
      "Implemented regex-based parameter extraction for dynamic routes",
      "Optimized performance for high-traffic web applications",
      "Provided comprehensive documentation and examples for easy integration",
      "Created general pattern matching that allows handlers to decide path handling",
      "Enabled variable definition within handlers instead of requiring router-level specificity",
      "Built flexible matching for patterns like '/edit/' while preserving path variables",
      "Allowed single handlers to process multiple related route patterns dynamically"
    ],
    featured: false
  },
  {
    id: "6",
    title: "ittyurl – URL Shortener Web Application",
    description: "A full-stack web application for generating, sharing, and managing short URLs.",
    longDescription: "ittyurl is a robust URL shortening service built with a Go backend and a responsive HTML/SCSS/JavaScript frontend. It allows users to easily transform long URLs into short, shareable links. The project features user accounts with tiered privileges, input validation, abuse prevention, and a clean, user-friendly interface. Custom URLs and additional features are available to signed-in users, with strong safeguards against misuse through policy and technical controls. The codebase demonstrates practical skills in backend session management, database interaction, frontend templating, and security best practices.",
    technologies: ["Go", "HTML", "SCSS", "JavaScript"],
    category: "web",
    githubUrl: "https://github.com/vinm0/ittyurl",
    imageUrl: "/api/placeholder/600/400",
    challenges: [
      "Implementing secure user input validation and managing URL generation at scale.",
      "Preventing abuse, such as spam or malicious links, while preserving ease of use.",
      "Designing a system for tiered user privileges with seamless session and account management.",
      "Creating a responsive and intuitive frontend experience."
    ],
    solutions: [
      "Utilized Go for efficient backend handling, including user session management and database integration.",
      "Integrated input validation and abuse prevention both in code and through clear terms of service.",
      "Implemented account-based rate limiting and privilege tiers to balance features and security.",
      "Developed modular HTML templates and modern SCSS styling for a professional, accessible UI."
    ],
    featured: false
  },
  {
    id: "7",
    title: "Lobbo – Lobby-Based Social Platform",
    description: "A Go web application for creating, joining, and managing lobby-style collaborative spaces.",
    longDescription: "Lobbo is a full-stack social networking platform designed to help leaders organize collaborative lobbies for projects, events, or social gatherings. Each user is a 'Leader' who can create and manage lobbies, invite colleagues, and collaborate in real time. Key features include lobby creation/editing (with details like summary, date, time, and location), colleague management, lobby and colleague search, and grouping functionalities. The app is built with a Go backend, dynamic HTML templating, responsive SCSS, and JavaScript for interactivity. Although primarily styled for mobile, Lobbo demonstrates advanced session management, role-based access, flexible privacy controls (planned), and modular frontend architecture. The codebase highlights architectural patterns for scalable web apps and emphasizes leadership, collaboration, and usability.",
    category: "web",
    imageUrl: "/api/placeholder/600/400",
    technologies: ["Go", "HTML", "SCSS", "JavaScript"],
    githubUrl: "https://github.com/vinm0/lobbo",
    challenges: [
      "Designing a flexible lobby system that allows dynamic membership and role management.",
      "Implementing real-time collaboration and invitation flows with privacy considerations.",
      "Ensuring modular, maintainable code despite rapid prototyping and evolving requirements.",
      "Balancing performance with dynamic page rendering and database interactions."
    ],
    solutions: [
      "Used a robust Go backend for session, user, and lobby management, enabling scalable, secure collaboration.",
      "Leveraged HTML templating and SCSS for a mobile-first, dynamic user interface.",
      "Implemented a modular architecture with reusable components for lobby, colleague, and group management.",
      "Planned and partially implemented privacy, visibility, and invitation-based access controls to support future enhancements."
    ],
    featured: false
  },
  {
    id: "8",
    title: "VincentInspired",
    description: "A visually-rich, interactive portfolio and content management site leveraging Django, advanced CSS, and JavaScript.",
    longDescription: "VincentInspired is a dynamic personal web project showcasing modern front-end and back-end development. It features a Django backend for robust content management, including email services and user authentication, and integrates advanced CSS/JavaScript for a highly interactive and responsive user experience. The project employs a modular architecture, uses CKEditor for WYSIWYG editing, integrates highlight.js for code syntax highlighting, and supports seamless email communication through Django’s email backends. The codebase demonstrates expertise in integrating complex packages, managing static and media assets, and delivering polished, production-quality web experiences.",
    category: "web",
    imageUrl: "/api/placeholder/600/400",
    technologies: ["Django", "Python", "CSS", "JavaScript", "HTML", "CKEditor", "highlight.js"],
    githubUrl: "https://github.com/vinm0/vincentinspired",
    challenges: [
      "Integrating robust Django backend services including email, user management, and dynamic content editing.",
      "Managing complex static and media asset pipelines for a seamless user experience.",
      "Customizing and integrating third-party packages like CKEditor and highlight.js for enhanced content creation and presentation.",
      "Delivering a visually engaging and maintainable frontend across devices and browsers."
    ],
    solutions: [
      "Utilized Django’s admin and email services for secure content management and communication.",
      "Integrated CKEditor for rich text editing and highlight.js for live code syntax highlighting.",
      "Built a modular, responsive frontend using advanced CSS and JavaScript.",
      "Streamlined static/media asset handling for efficient delivery and maintainability."
    ],
    featured: false
  },
  {
    id: "9",
    title: "Modern Portfolio Template",
    description: "Open-source Next.js portfolio template with advanced animations, responsive design, and easy customization for software engineers",
    longDescription: "A comprehensive, production-ready portfolio template built with Next.js, TypeScript, and Tailwind CSS. Features advanced Framer Motion animations, interactive system architecture diagrams, responsive design, and modular component architecture. Designed for easy customization and deployment, allowing software engineers to quickly establish a professional online presence. Includes automated build processes, SEO optimization, dark mode support, and comprehensive documentation for seamless setup and personalization.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "React", "CSS Animations", "Responsive Design"],
    category: "web",
    githubUrl: "https://github.com/vinm0/portfolio-template-dev",
    liveUrl: "https://portfolio-template-demo.vercel.app",
    imageUrl: "/api/placeholder/600/400",
    challenges: [
      "Creating a highly customizable template that works for diverse professional backgrounds",
      "Implementing advanced animations without compromising performance or accessibility",
      "Designing modular components that are both feature-rich and easy to modify",
      "Ensuring responsive design across all devices and screen sizes",
      "Balancing visual appeal with professional presentation standards",
      "Providing comprehensive documentation for non-technical customization"
    ],
    solutions: [
      "Built modular component architecture using TypeScript for type safety and maintainability",
      "Implemented performant animations with Framer Motion and optimized loading strategies",
      "Created comprehensive configuration system for easy content and styling customization",
      "Used Tailwind CSS for consistent, responsive design patterns across all components",
      "Integrated interactive SVG diagrams and animated grids for engaging user experience",
      "Developed clear documentation and configuration guides for quick deployment and setup"
    ],
    featured: true
  },
  {
    id: "10",
    title: "Air Force DevOps Pipeline",
    description: "Automated CI/CD pipeline for Air Force applications with Azure DevOps, reducing deployment time by 75%",
    longDescription: "Comprehensive DevOps solution for Air Force Services Center applications including NAFRIS, Budget Tool, and Commercial Sponsorship systems. Implemented automated build, test, and deployment pipelines using Azure DevOps, containerization with Docker, and infrastructure as code. Features automated testing, security scanning, rollback capabilities, and monitoring across development, staging, and production environments.",
    technologies: ["Azure DevOps", "Docker", "PowerShell", "YAML", "Git", "SharePoint", "Monitoring"],
    category: "devops",
    githubUrl: "https://github.com/vinm0/af-devops-pipeline",
    imageUrl: "/api/placeholder/600/400",
    challenges: [
      "Standardizing deployment processes across multiple Air Force applications",
      "Implementing security compliance scanning in automated pipelines",
      "Managing complex SharePoint deployment dependencies and configurations",
      "Ensuring zero-downtime deployments for critical DoD systems",
      "Integrating legacy systems with modern DevOps practices",
      "Maintaining audit trails and compliance documentation"
    ],
    solutions: [
      "Built standardized Azure DevOps pipelines using YAML templates for consistency",
      "Integrated automated security scanning and compliance checks at every stage",
      "Created containerized deployment packages for SharePoint applications",
      "Implemented blue-green deployment strategies for zero-downtime releases",
      "Developed custom PowerShell modules for SharePoint automation",
      "Created comprehensive logging and monitoring dashboards for audit compliance"
    ],
    featured: false
  },
  {
    id: "11",
    title: "Infrastructure as Code - Portfolio Platform",
    description: "Automated cloud infrastructure deployment for Next.js portfolio applications using Terraform and GitHub Actions",
    longDescription: "Complete infrastructure automation solution for deploying and managing Next.js portfolio applications across multiple cloud providers. Features Terraform modules for AWS/Azure/GCP deployment, automated SSL certificate management, CDN configuration, and monitoring setup. Includes cost optimization, security hardening, and multi-environment management capabilities.",
    technologies: ["Terraform", "GitHub Actions", "AWS", "Azure", "Docker", "Kubernetes", "Monitoring"],
    category: "devops",
    githubUrl: "https://github.com/vinm0/portfolio-iac",
    imageUrl: "/api/placeholder/600/400",
    challenges: [
      "Creating reusable infrastructure modules across multiple cloud providers",
      "Implementing cost-effective auto-scaling for variable traffic loads",
      "Managing SSL certificates and DNS configuration automatically",
      "Ensuring security best practices across all infrastructure components",
      "Providing disaster recovery and backup strategies",
      "Optimizing performance with global CDN distribution"
    ],
    solutions: [
      "Developed modular Terraform configurations for AWS, Azure, and GCP deployment",
      "Implemented auto-scaling policies based on traffic patterns and cost optimization",
      "Automated SSL certificate provisioning using Let's Encrypt and cloud native services",
      "Integrated security scanning and compliance checks into infrastructure deployment",
      "Created automated backup and disaster recovery procedures",
      "Configured global CDN with intelligent routing for optimal performance"
    ],
    featured: false
  }
]

const categories = [
  { key: "all", label: "All Projects" },
  { key: "web", label: "Web Apps" },
  { key: "backend", label: "Backend" },
  { key: "devops", label: "DevOps" },
]

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [showAll, setShowAll] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const filteredProjects = selectedCategory === "all"
    ? projects
    : projects.filter(project => project.category === selectedCategory)

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 3)

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            A selection of projects that showcase my technical skills and problem-solving approach
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
              onClick={() => setSelectedCategory(category.key)}
              className={cn(
                "px-6 py-3 rounded-full font-medium transition-all duration-200",
                selectedCategory === category.key
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              )}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <AnimatedGrid
            items={displayedProjects}
            gridClassName="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-12"
            getItemKey={(project) => project.title}
            renderItem={(project) => (
              <div key={project.title} onClick={() => setSelectedProject(project)}>
                <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-6xl font-bold opacity-20">
                      {project.title.charAt(0)}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-md">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href={project.githubUrl}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span className="text-sm">Code</span>
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span className="text-sm">Live</span>
                      </a>
                    )}
                  </div>
                </div>

                {project.featured && (
                  <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
                    Featured
                  </div>
                )}
              </div>
            )}
          />
        </motion.div>

        {/* Show More/Less Button */}
        {filteredProjects.length > 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className={cn(
                "inline-flex items-center gap-2 px-8 py-4 rounded-xl",
                "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300",
                "hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200",
                "font-medium"
              )}
            >
              {showAll ? (
                <>
                  Show Less <ChevronUp className="w-5 h-5" />
                </>
              ) : (
                <>
                  View More Projects <ChevronDown className="w-5 h-5" />
                </>
              )}
            </button>
          </motion.div>
        )}

        {/* Project Modal */}
        {selectedProject && (
          <Modal
            title={selectedProject?.title || ""}
            description={selectedProject?.longDescription || ""}
            body={{
              "Challenges": selectedProject?.challenges || [],
              "Solutions": selectedProject?.solutions || []
            }}
            tags={{ "Technologies Used": selectedProject?.technologies || [] }}
            isOpen={!!selectedProject}
            onClose={() => setSelectedProject(null)}
            actionButtons={
              <>
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex items-center gap-2 px-6 py-3 rounded-lg",
                    "bg-slate-900 dark:bg-slate-700 text-white",
                    "hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors"
                  )}
                >
                  <Github className="w-5 h-5" />
                  View Code
                </a>
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "inline-flex items-center gap-2 px-6 py-3 rounded-lg",
                      "bg-blue-600 text-white",
                      "hover:bg-blue-700 transition-colors"
                    )}
                  >
                    <ExternalLink className="w-5 h-5" />
                    Live Demo
                  </a>
                )}
              </>
            }
          />
        )}
      </div>
    </section>
  )
}
