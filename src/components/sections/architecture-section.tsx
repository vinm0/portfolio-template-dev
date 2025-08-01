"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils/utils"

interface ArchNode {
  id: string
  name: string
  category: string
  layer: "frontend" | "backend" | "infrastructure"
  position: { x: number; y: number }
  description: string
  technologies: string[]
  role: string
}

const nodes: ArchNode[] = [
  // Frontend
  {
    id: "ui",
    name: "UI Development",
    category: "UI",
    layer: "frontend",
    position: { x: 80, y: 70 },
    description: "Modern user interface development with component-based architecture and responsive design",
    technologies: ["React", "Vue.js", "Angular", "TypeScript", "HTML5", "CSS3"],
    role: "Built responsive, accessible interfaces with modern frameworks and design systems"
  },
  {
    id: "ux",
    name: "UX Design",
    category: "UX",
    layer: "frontend",
    position: { x: 80, y: 190 },
    description: "User experience design focusing on usability, accessibility, and user-centered design principles",
    technologies: ["Figma", "Tailwind CSS", "Framer Motion", "WCAG", "Design Systems"],
    role: "Designed intuitive user experiences with accessibility compliance and smooth animations"
  },

  // Backend
  {
    id: "server",
    name: "Server",
    category: "Server",
    layer: "backend",
    position: { x: 400, y: 50 },
    description: "Scalable server applications with RESTful APIs, microservices, and event-driven architecture",
    technologies: ["Node.js", "Python", "FastAPI", "Express.js", "NestJS"],
    role: "Developed high-performance APIs and microservices handling millions of requests"
  },
  {
    id: "services",
    name: "Services",
    category: "Services",
    layer: "backend",
    position: { x: 400, y: 150 },
    description: "Integration services, message queues, and third-party API management",
    technologies: ["GraphQL", "REST APIs", "WebSockets", "Kafka", "RabbitMQ"],
    role: "Built scalable service architectures with real-time communication and event streaming"
  },
  {
    id: "database",
    name: "Database",
    category: "Database",
    layer: "backend",
    position: { x: 400, y: 250 },
    description: "Data storage solutions including relational and NoSQL databases with optimization strategies",
    technologies: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "Elasticsearch"],
    role: "Designed efficient database schemas and implemented caching strategies for optimal performance"
  },

  // Infrastructure
  {
    id: "cloud",
    name: "Cloud Platform",
    category: "Cloud",
    layer: "infrastructure",
    position: { x: 720, y: 50 },
    description: "Cloud infrastructure management with auto-scaling, monitoring, and deployment automation",
    technologies: ["AWS", "Google Cloud", "Azure", "Docker", "Kubernetes"],
    role: "Deployed applications on cloud platforms with CI/CD pipelines and infrastructure as code"
  },
  {
    id: "devops",
    name: "DevOps",
    category: "DevOps",
    layer: "infrastructure",
    position: { x: 720, y: 150 },
    description: "Development operations including CI/CD, monitoring, logging, and deployment strategies",
    technologies: ["GitHub Actions", "Jenkins", "Terraform", "Prometheus", "Grafana"],
    role: "Implemented automated deployment pipelines and monitoring solutions for production systems"
  },
  {
    id: "security",
    name: "Security",
    category: "Security",
    layer: "infrastructure",
    position: { x: 720, y: 250 },
    description: "Application security including authentication, authorization, and data protection",
    technologies: ["OAuth 2.0", "JWT", "SSL/TLS", "OWASP", "Encryption"],
    role: "Implemented secure authentication systems and followed security best practices"
  },
]

const connections = [
  // Frontend connections
  { from: "ux", to: "ui" },
  { from: "ui", to: "services" },

  // Backend connections
  { from: "server", to: "services" },
  { from: "server", to: "ui" },
  { from: "services", to: "server" },
  { from: "services", to: "database" },
  { from: "database", to: "services" },

  // Infrastructure connections
  { from: "security", to: "server" },
  { from: "security", to: "database" },
  { from: "security", to: "services" },
  { from: "security", to: "devops" },
  { from: "security", to: "cloud" },
  { from: "cloud", to: "database" },
  { from: "cloud", to: "server" },
  { from: "cloud", to: "services" },
  { from: "cloud", to: "devops" }
]

const layerColors = {
  frontend: "bg-gradient-to-br from-blue-500 to-blue-600",
  backend: "bg-gradient-to-br from-green-500 to-green-600",
  infrastructure: "bg-gradient-to-br from-purple-500 to-purple-600"
}

const categoryColors = {
  "UI": "bg-blue-500 hover:bg-blue-600",
  "UX": "bg-indigo-500 hover:bg-indigo-600",
  "Server": "bg-green-500 hover:bg-green-600",
  "Database": "bg-emerald-500 hover:bg-emerald-600",
  "Services": "bg-teal-500 hover:bg-teal-600",
  "Cloud": "bg-purple-500 hover:bg-purple-600",
  "DevOps": "bg-violet-500 hover:bg-violet-600",
  "Security": "bg-orange-500 hover:bg-orange-600"
}

const layerLabels = {
  frontend: "Frontend",
  backend: "Backend",
  infrastructure: "Infrastructure"
}

const categoryLabels = {
  "UI": "User Interface",
  "UX": "User Experience",
  "Server": "Server Applications",
  "Database": "Data Storage",
  "Services": "Integration Services",
  "Cloud": "Cloud Platform",
  "DevOps": "Development Operations",
  "Security": "Security & Auth"
}

const layerBounds = {
  frontend: { x: 20, y: 0, width: 280, height: 280 },
  backend: { x: 340, y: 0, width: 280, height: 320 },
  infrastructure: { x: 660, y: 0, width: 280, height: 320 }
}

export function ArchitectureSection() {
  const [selectedNode, setSelectedNode] = useState<ArchNode | null>(null)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  // Function to get connected node IDs for a given node
  const getConnectedNodeIds = (nodeId: string): string[] => {
    const connectedIds: string[] = []
    connections.forEach(connection => {
      if (connection.from === nodeId) {
        connectedIds.push(connection.to)
      }
      if (connection.to === nodeId) {
        connectedIds.push(connection.from)
      }
    })
    return connectedIds
  }

  // Function to check if a node should be dimmed
  const shouldDimNode = (nodeId: string): boolean => {
    if (!hoveredNode) return false
    if (nodeId === hoveredNode) return false
    const connectedIds = getConnectedNodeIds(hoveredNode)
    return !connectedIds.includes(nodeId)
  }

  return (
    <section id="architecture" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            System Architecture
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Interactive diagram showcasing my full-stack expertise and system design skills
          </p>
        </motion.div>

        {/* Architecture Diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="relative bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg mb-8 overflow-x-auto"
        >
          <svg viewBox="0 0 960 330" className="w-full h-auto min-w-[900px]">
            {/* Layer backgrounds */}
            {Object.entries(layerBounds).map(([layer, bounds]) => (
              <motion.g key={layer}>
                {/* Layer background */}
                <rect
                  x={bounds.x}
                  y={bounds.y}
                  width={bounds.width}
                  height={bounds.height}
                  rx="12"
                  className={layerColors[layer as keyof typeof layerColors]}
                  opacity="0.9"
                />
                {/* Layer title */}
                <text
                  x={bounds.x + bounds.width / 2}
                  y={bounds.y + 30}
                  textAnchor="middle"
                  className="fill-white font-bold text-xl pointer-events-none"
                >
                  {layerLabels[layer as keyof typeof layerLabels]}
                </text>
              </motion.g>
            ))}

            {/* Connections */}
            {connections.map((connection, index) => {
              const fromNode = nodes.find(n => n.id === connection.from)
              const toNode = nodes.find(n => n.id === connection.to)
              if (!fromNode || !toNode) return null

              const isActive = hoveredNode === connection.from || hoveredNode === connection.to
              const isConnectedToHovered = hoveredNode && (connection.from === hoveredNode || connection.to === hoveredNode)
              const shouldDimConnection = hoveredNode && !isConnectedToHovered

              const strokeColor = isActive ? "#3b82f6" : "#64748b"
              const strokeWidth = isActive ? "3" : "2"
              const opacity = shouldDimConnection ? 0.2 : 1

              // Calculate connection points at node edges
              const fromCenterX = fromNode.position.x + 80
              const fromCenterY = fromNode.position.y + 25
              const toCenterX = toNode.position.x + 80
              const toCenterY = toNode.position.y + 25

              // Calculate direction vector
              const dx = toCenterX - fromCenterX
              const dy = toCenterY - fromCenterY
              const distance = Math.sqrt(dx * dx + dy * dy)

              if (distance === 0) return null // Avoid division by zero

              // Normalize direction vector
              const unitX = dx / distance
              const unitY = dy / distance

              // Node dimensions
              const nodeWidth = 160
              const nodeHeight = 50

              // Calculate intersection with rectangular node boundaries
              const halfWidth = nodeWidth / 2
              const halfHeight = nodeHeight / 2

              // For 'from' node - find exit point
              let fromX, fromY
              if (Math.abs(unitX) > Math.abs(unitY)) {
                // Intersect with left/right edge
                fromX = fromCenterX + (unitX > 0 ? halfWidth : -halfWidth)
                fromY = fromCenterY + unitY * (halfWidth / Math.abs(unitX))
              } else {
                // Intersect with top/bottom edge
                fromX = fromCenterX + unitX * (halfHeight / Math.abs(unitY))
                fromY = fromCenterY + (unitY > 0 ? halfHeight : -halfHeight)
              }

              // For 'to' node - find entry point
              let toX, toY
              if (Math.abs(unitX) > Math.abs(unitY)) {
                // Intersect with left/right edge
                toX = toCenterX - (unitX > 0 ? halfWidth : -halfWidth)
                toY = toCenterY - unitY * (halfWidth / Math.abs(unitX))
              } else {
                // Intersect with top/bottom edge
                toX = toCenterX - unitX * (halfHeight / Math.abs(unitY))
                toY = toCenterY - (unitY > 0 ? halfHeight : -halfHeight)
              }

              // Add small padding to ensure arrows are visible
              const padding = 8
              fromX += unitX * padding
              fromY += unitY * padding
              toX -= unitX * padding
              toY -= unitY * padding

              return (
                <motion.line
                  key={`${connection.from}-${connection.to}`}
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: opacity }}
                  viewport={{ once: true }}
                  animate={{ opacity }}
                  x1={fromX}
                  y1={fromY}
                  x2={toX}
                  y2={toY}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  className="transition-all"
                  markerEnd={isActive ? "url(#arrowhead-active)" : "url(#arrowhead)"}
                />
              )
            })}

            {/* Arrow markers */}
            <defs>
              <marker
                id="arrowhead"
                markerWidth="8"
                markerHeight="4"
                refX="4"
                refY="2"
                orient="auto"
                markerUnits="strokeWidth"
              >
                <polygon
                  points="0 0, 8 2, 0 4"
                  fill="#64748b"
                  className="transition-all"
                />
              </marker>
              <marker
                id="arrowhead-active"
                markerWidth="8"
                markerHeight="4"
                refX="4"
                refY="2"
                orient="auto"
                markerUnits="strokeWidth"
              >
                <polygon
                  points="0 0, 8 2, 0 4"
                  fill="#3b82f6"
                  className="transition-all"
                />
              </marker>
            </defs>

            {/* Component nodes */}
            {nodes.map((node, index) => {
              const isDimmed = shouldDimNode(node.id)
              const isHovered = hoveredNode === node.id

              return (
                <motion.g
                  key={node.id}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, type: "spring" }}
                  viewport={{ once: true }}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={() => setSelectedNode(node)}
                  style={{
                    transformOrigin: `${node.position.x + 80}px ${node.position.y + 25}px`
                  }}
                  animate={{
                    scale: isHovered ? 1.1 : 1,
                    opacity: isDimmed ? 0.3 : 1,
                    transition: { duration: 0.2, ease: "easeOut" }
                  }}
                >
                  {/* Node shadow */}
                  <rect
                    x={node.position.x + 3}
                    y={node.position.y + 3}
                    width="160"
                    height="50"
                    rx="8"
                    fill="rgba(0,0,0,0.1)"
                    opacity={isDimmed ? 0.3 : 1}
                  />

                  {/* Node background */}
                  <rect
                    x={node.position.x}
                    y={node.position.y}
                    width="160"
                    height="50"
                    rx="8"
                    className={cn(
                      "transition-all duration-200 cursor-pointer",
                      "fill-white dark:fill-slate-100"
                    )}
                    stroke={isHovered ? "#3b82f6" : "#e2e8f0"}
                    strokeWidth={isHovered ? "2" : "1"}
                    filter={isHovered ? "drop-shadow(0 4px 8px rgba(0,0,0,0.1))" : "none"}
                    opacity={isDimmed ? 0.4 : 1}
                  />

                  {/* Node text */}
                  <text
                    x={node.position.x + 80}
                    y={node.position.y + 30}
                    textAnchor="middle"
                    className="fill-slate-800 dark:fill-slate-800 font-semibold text-sm pointer-events-none"
                    opacity={isDimmed ? 0.4 : 1}
                  >
                    {node.name}
                  </text>
                </motion.g>
              )
            })}
          </svg>

          <div className="text-center mt-6">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Click on any technology to see implementation details and specific contributions
            </p>
          </div>
        </motion.div>

        {/* Node Details Modal */}
        <AnimatePresence>
          {selectedNode && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedNode(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white dark:bg-slate-800 rounded-xl max-w-2xl w-full p-8"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-4 h-4 rounded-full", categoryColors[selectedNode.category as keyof typeof categoryColors].split(' ')[0])} />
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                      {selectedNode.name}
                    </h3>
                    <span className="px-2 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-md">
                      {categoryLabels[selectedNode.category as keyof typeof categoryLabels]}
                    </span>
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-md">
                      {layerLabels[selectedNode.layer as keyof typeof layerLabels]}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedNode(null)}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xl"
                  >
                    ✕
                  </button>
                </div>

                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  {selectedNode.description}
                </p>

                <div className="mb-6">
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedNode.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">
                    My Role & Contributions
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400">
                    {selectedNode.role}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Key Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          {[
            {
              title: "Multi-Layer Architecture",
              description: "Implemented separation of concerns with distinct frontend, middleware, and backend layers",
              icon: "🏗️"
            },
            {
              title: "Event-Driven Design",
              description: "Real-time communication between services using Kafka for scalable data processing",
              icon: "⚡"
            },
            {
              title: "Cloud-Native Deployment",
              description: "Leveraged Google Cloud for auto-scaling, monitoring, and global content delivery",
              icon: "☁️"
            }
          ].map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.8 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 text-center border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-3xl mb-3">{achievement.icon}</div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
                {achievement.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                {achievement.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
