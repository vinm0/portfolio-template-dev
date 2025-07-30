# Modern Software Engineer Portfolio

> ⚠️ **Under Construction**: This repository is currently being actively developed. Some features may be incomplete or subject to change.

A sleek, modern portfolio website built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion. Perfect for software engineers, full-stack developers, and DevOps professionals.

## ✨ Features

- **Modern Design**: Clean, professional design with dark/light mode support
- **Fully Responsive**: Optimized for all devices and screen sizes
- **Interactive Components**: Smooth animations and engaging user interactions
- **Blog Management**: Full blog system with post creation, editing, and dynamic pages
- **Project Showcases**: Detailed project pages with in-depth case studies
- **Performance Optimized**: Built with Next.js 15 and optimized for speed
- **SEO Ready**: Proper meta tags and semantic HTML structure
- **Type Safe**: Written in TypeScript for better development experience

## 🚀 Sections

### 1. Hero Section
- Animated gradient name display
- Terminal-style typing animation for taglines
- Call-to-action buttons for resume download and contact

### 2. Skills Matrix
- Interactive skill categories with filtering
- Progress bars showing expertise levels
- Hover effects displaying years of experience
- Visual skill level indicators

### 3. Featured Projects
- Project cards with expandable details
- Technology tag filtering
- Project modal with detailed case studies
- GitHub and live demo links
- **Individual project showcase pages** with comprehensive documentation
- Project timeline and development process
- Technical architecture breakdowns

### 4. System Architecture
- Interactive architecture diagram
- Clickable components showing your role
- Technology stack visualization
- Achievement highlights

### 5. Blog Management System
- **Blog post creation form** with rich text editor
- **Dynamic blog post pages** with SEO optimization
- Featured article carousel on main blog page
- Blog post previews with expandable content
- Tag-based categorization and filtering
- Reading time estimates and publication dates
- **Admin interface** for managing blog content
- Draft/publish workflow for blog posts

### 6. Contact Section
- Working contact form with API integration
- Alternative contact methods
- Availability status indicator
- Form validation and error handling

### 7. Footer
- Social media links
- Quick navigation
- Theme toggle
- Scroll to top functionality

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4.0
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Theme**: next-themes for dark/light mode

## 📄 Advanced Features

### Blog Management
- **Dynamic Blog Pages**: Individual blog post pages with SEO optimization
- **Blog Creation Form**: Rich text editor with preview functionality
- **Content Management**: Draft/publish workflow with metadata management
- **Tag System**: Categorization and filtering for easy content discovery
- **Reading Analytics**: Reading time estimates and engagement tracking

### Project Showcases
- **Detailed Project Pages**: Comprehensive case studies for each project
- **Technical Documentation**: Architecture diagrams and implementation details
- **Development Process**: Timeline, challenges, and solutions
- **Interactive Demos**: Embedded demos and live previews where applicable
- **Technology Deep-dives**: In-depth explanations of tech stack choices

### Content Management
- **SEO Optimization**: Dynamic meta tags and structured data
- **Performance Monitoring**: Core Web Vitals tracking
- **Analytics Integration**: Google Analytics and custom tracking
- **Content Versioning**: Git-based content management workflow

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio-template.git
cd portfolio-template
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎨 Customization

### Personal Information

Update the following files with your personal information:

1. **Layout metadata** (`src/app/(main)/layout.tsx`):
```tsx
export const metadata: Metadata = {
  title: "Your Name - Senior Software Engineer",
  description: "Your description here",
};
```

2. **Hero Section** (`src/components/sections/hero-section.tsx`):
- Update the name in the gradient text
- Modify taglines array with your specializations
- Update contact information

3. **Skills Section** (`src/components/sections/skills-section.tsx`):
- Update the skills array with your technologies
- Modify experience levels and years
- Customize skill categories

4. **Projects Section** (`src/components/sections/projects-section.tsx`):
- Replace project data with your actual projects
- Update GitHub URLs and live demo links
- Modify project descriptions and technologies

5. **Architecture Section** (`src/components/sections/architecture-section.tsx`):
- Customize the system architecture to match your experience
- Update node descriptions and your role
- Modify achievement metrics

6. **Blog Management** (`src/app/blog/` and `src/components/blog/`):
- **Blog post pages**: Replace sample content with your actual blog posts
- **Blog creation form**: Customize the rich text editor and metadata fields
- **Blog API routes**: Update content management endpoints
- **Tag system**: Modify categories and filtering logic

7. **Project Showcases** (`src/app/work/[slug]/`):
- **Individual project pages**: Create detailed case studies for each project
- **Project documentation**: Update technical specifications and architecture
- **Demo integration**: Add interactive demos or embedded previews
- **Development timeline**: Document the project development process

8. **Footer** (`src/components/sections/footer.tsx`):
- Update contact information (email, phone, location)
- Modify availability status
- Customize contact form behavior

8. **Footer** (`src/components/sections/footer.tsx`):
- Update social media links
- Modify contact information
- Customize footer content

### Styling and Colors

The portfolio uses a modern color scheme with CSS custom properties. You can customize colors by updating the CSS variables in `src/styles/globals.css`.

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

## 📝 Environment Variables

Create a `.env.local` file for local development:

```env
# Contact form (optional)
SENDGRID_API_KEY=your_sendgrid_key
RESEND_API_KEY=your_resend_key

# Admin authentication
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
JWT_SECRET=your_jwt_secret_key_minimum_32_characters

# Blog management (optional)
BLOG_ADMIN_PASSWORD=your_admin_password
GITHUB_TOKEN=your_github_token_for_content_management

# Analytics (optional)
GOOGLE_ANALYTICS_ID=your_ga_id
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_vercel_analytics_id
```

## 🔧 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Blog management commands
npm run blog:create    # Create a new blog post
npm run blog:build     # Build blog content
npm run blog:deploy    # Deploy blog updates
```

## 🔄 Content Management Workflow

### Admin Access
1. Navigate to `/admin/login` to access the admin panel
2. Login with your admin credentials (set in environment variables)
3. Use the dashboard to manage all site content

### Blog Posts
1. Use the blog creation form at `/admin/blog/new`
2. Write content using the rich text editor with Markdown support
3. Add tags, metadata, and SEO information
4. Save as draft or publish immediately
5. Individual blog posts are accessible at `/blog/[slug]`

### Site Settings
1. Access site configuration at `/admin/settings`
2. Update contact information, social links, and availability status
3. Manage resume URL and site metadata
4. Configure site-wide settings and preferences

### Project Showcases
1. Create detailed project documentation in `/work/[slug]`
2. Include technical specifications, architecture diagrams
3. Add interactive demos and code samples
4. Document development process and challenges
5. Link from main projects section for detailed view

**Happy coding!** 🚀
