import { Github, Linkedin, Twitter } from "lucide-react"

const DOMAIN = "vincemartinez.dev" as const

const AUTHOR = {
    FULL_NAME: "Vincent E Martinez",
    FIRST_NAME: "Vincent",
    LAST_NAME: "Martinez",
    SHORT_NAME: "Vince",
    TITLE: "Software Engineer",
    BIO: "Senior Software Engineer passionate about building scalable systems and solving complex problems with modern technologies.",
    EMAIL: `vince@${DOMAIN}`,
} as const

const SOCIALS = {
    GITHUB: {
        HREF: "https://github.com/vinm0",
        HANDLE: "@vinm0",
        ICON: Github,
        COLOR: "hover:text-slate-900 dark:hover:text-slate-100"
    },
    LINKEDIN: {
        HREF: "https://www.linkedin.com/in/vincent-e-martinez/",
        HANDLE: "@vincent-e-martinez",
        ICON: Linkedin,
        COLOR: "hover:text-blue-600"
    },
    TWITTER: {
        HREF: "https://twitter.com/vincemartinez",
        HANDLE: "@vincemartinez",
        ICON: Twitter,
        COLOR: "hover:text-blue-400"
    },
} as const

const CONTACT = {
    EMAIL: {
        ADDRESS: `hello@${DOMAIN}`,
        HREF: `mailto:hello@${DOMAIN}`,
        LABEL: "Email Me"
    },
    RESUME: {
        LINK: "/resume.pdf",
        LABEL: "Download Resume"
    },
    ADDRESS: {
        STREET: "",
        CITY: "San Antonio",
        STATE: "TX",
        ZIP: "78212",
        LABEL: "San Antonio, TX"
    },
    PHONE: {
        NUMBER: "+1 (210) 624 - 9243",
        LINK: "tel:+12106249243",
        LABEL: "Call Me"
    }
} as const

export {
    DOMAIN,
    AUTHOR,
    SOCIALS,
    CONTACT
}