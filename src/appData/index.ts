// Data for portfolio
import {
  JavaScriptIcon,
  NextjsIcon,
  NodejsIcon,
  ReactIcon,
  TailwindCSS,
  TypescriptIcon,
} from '../utils/icons'
import {
  SiCss,
  SiDjango,
  SiExpress,
  SiFigma,
  SiFlask,
  SiGit,
  SiGithub,
  SiGitlab,
  SiHtml5,
  SiJavascript,
  SiJquery,
  SiLaravel,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiPostman,
  SiPython,
  SiReact,
  SiRedux,
  SiSqlite,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from 'react-icons/si'
import { VscVscode } from 'react-icons/vsc'

// Project Data
export const projects = [
  {
    priority: 1,
    title: 'Weather App',
    shortDescription:
      'Introducing our cutting-edge Weather App – your ultimate companion for staying informed about weather conditions wherever you are! With sleek design and powerful features, our app provides you with accurate and up-to-date weather forecasts to help you plan your day effectively.',
    cover:
      'https://images.unsplash.com/photo-1592210454359-9043f067919b?q=80&w=2070&auto=format&fit=crop',
    livePreview: '',
    githubLink: 'https://github.com/varsilsuvagiya/react-weather-app',
    type: 'React 🔥',
  },
  {
    priority: 2,
    title: 'Calender App',
    shortDescription:
      'Elevate your productivity with our dynamic JavaScript Calendar App. Seamlessly organize tasks, events, and appointments. Enjoy intuitive navigation, customizable views, and real-time syncing. Effortlessly manage your schedule, boost efficiency, and never miss a beat. Streamline your days with our empowering Calendar App.',
    cover:
      'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=2068&auto=format&fit=crop',
    livePreview: '',
    githubLink: 'https://github.com/varsilsuvagiya/calenedar',
    type: 'JavaScript 🔥',
  },
  {
    priority: 3,
    title: 'Digital Clock',
    shortDescription:
      'Experience time in elegance with our Digital Clock. A sleek display of accurate time, it graces any space with modern simplicity. Clear visibility, 24/7. Perfect for desks, bedside tables, or walls. Embrace the future of timekeeping with this minimalist marvel.',
    cover:
      'https://images.unsplash.com/photo-1495364141860-b0d03dea454d?q=80&w=2070&auto=format&fit=crop',
    livePreview: '',
    githubLink: 'https://github.com/varsilsuvagiya/Digital-Clock',
    type: 'Web 🔥',
  },
  {
    priority: 4,
    title: 'Stop Watch',
    shortDescription:
      'Unleash precision with our Stopwatch. Master time with split-second accuracy for sports, fitness, and more. User-friendly interface, tactile controls. Count up or down effortlessly, track laps, and achieve goals. Elevate your timing game with this essential tool for measurement and progress.',
    cover:
      'https://images.unsplash.com/photo-1627844642677-9b43697eeb46?q=80&w=2070&auto=format&fit=crop',
    livePreview: '',
    githubLink: 'https://github.com/varsilsuvagiya/react-stopwatch',
    type: 'React 🔥',
  },
  {
    priority: 5,
    title: "Job's Hub",
    shortDescription:
      "Job'sHub is company which provide online platform for you if you need any job or you want to hire someone for your work.",
    cover:
      'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop',
    livePreview: '',
    githubLink: 'https://github.com/varsilsuvagiya/jobshubpyfront',
    type: 'Full Stack 🔥',
  },
  {
    priority: 6,
    title: 'Matching Game',
    shortDescription:
      'Engage your mind with our captivating object matching game. Sharpen memory and concentration as you pair identical objects within a thrilling timeframe. Diverse levels challenge all ages. Vibrant visuals and intuitive gameplay offer hours of entertainment. Elevate fun and cognitive skills – play now and conquer the match!',
    cover:
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop',
    livePreview: '',
    githubLink: 'https://github.com/varsilsuvagiya/match-game',
    type: 'Game 🔥',
  },
  {
    priority: 7,
    title: 'Student Management System',
    shortDescription:
      "Developed in Django, the Student Management System is a comprehensive platform designed to streamline and optimize the management of student records, attendance, and performance. It offers user-friendly interfaces for administrators, teachers, and students, enabling efficient data handling and reporting. This robust system enhances educational institutions' ability to manage academic and administrative tasks effectively.",
    cover:
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop',
    livePreview: '',
    githubLink: 'https://github.com/varsilsuvagiya/student-management-system',
    type: 'Django 🔥',
  },
  {
    priority: 8,
    title: 'CipherNet',
    shortDescription:
      'Ciphernet is a modern and sleek React JS template designed for VPN and cybersecurity services. It offers a clean, responsive layout to showcase features like powerful online protection, borderless internet access, and unlimited usage. Ideal for startups or businesses offering secure digital solutions.',
    cover:
      'https://images.unsplash.com/photo-1563206767-5b18f21f7ab2?q=80&w=2071&auto=format&fit=crop',
    livePreview: '',
    githubLink: 'https://github.com/varsilsuvagiya/cipherNet',
    type: 'React 🔥',
  },
  {
    priority: 9,
    title: 'WebGlide',
    shortDescription:
      'WebGlide is your ultimate online Health & Fitness companion, offering free guidance via its active Facebook Group and premium personal training programs through its website. As the first-ever digital fitness manifesto, WebGlide aims to be your go-to destination whenever you think about getting fit—anytime, anywhere.',
    cover:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop',
    livePreview: '',
    githubLink: 'https://github.com/varsilsuvagiya/webGlide',
    type: 'Web 🔥',
  },
]

// Service Data
export const serviceData = [
  {
    icon: JavaScriptIcon,
    title: 'JavaScript Development',
    shortDescription: 'Creating dynamic and interactive web applications using JavaScript.',
  },
  {
    icon: ReactIcon,
    title: 'React.js Development',
    shortDescription: 'Building modern and responsive user interfaces with React.js.',
  },
  {
    icon: NodejsIcon,
    title: 'Node.js Backend',
    shortDescription: 'Developing scalable server-side applications using Node.js.',
  },
  {
    icon: NextjsIcon,
    title: 'Next.js Development',
    shortDescription: 'Creating server-rendered React applications with Next.js.',
  },
  {
    icon: SiPython,
    title: 'Python & Django Backend',
    shortDescription: 'Building powerful and secure web backends using Python and Django.',
  },
  {
    icon: SiLaravel,
    title: 'PHP & Laravel Development',
    shortDescription: 'Developing robust and maintainable web applications with PHP and Laravel.',
  },
  {
    icon: SiMongodb,
    title: 'Database Management',
    shortDescription: 'Expertise in SQL and NoSQL databases like MySQL and MongoDB.',
  },
  {
    icon: SiFigma,
    title: 'UI/UX Design',
    shortDescription: 'Designing intuitive and beautiful user experiences using Figma.',
  },
  {
    icon: TypescriptIcon,
    title: 'TypeScript Development',
    shortDescription: 'Ensuring robust and maintainable code with TypeScript.',
  },
  {
    icon: TailwindCSS,
    title: 'Tailwind CSS Styling',
    shortDescription: 'Designing beautiful and responsive interfaces with Tailwind CSS.',
  },
]

// Skill List
export const skillList = [
  { name: 'JavaScript', icon: SiJavascript, color: '#f7df1e' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178c6' },
  { name: 'PHP', icon: SiPhp, color: '#777bb4' },
  { name: 'Python', icon: SiPython, color: '#3776ab' },
  { name: 'CSS3', icon: SiCss, color: '#1572b6' },
  { name: 'HTML5', icon: SiHtml5, color: '#e34f26' },
  { name: 'React.js', icon: SiReact, color: '#61dafb' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
  { name: 'Redux', icon: SiRedux, color: '#764abc' },
  { name: 'jQuery', icon: SiJquery, color: '#0769ad' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06b6d4' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
  { name: 'Express.js', icon: SiExpress, color: '#000000' },
  { name: 'Django', icon: SiDjango, color: '#092e20' },
  { name: 'Flask', icon: SiFlask, color: '#000000' },
  { name: 'Laravel', icon: SiLaravel, color: '#ff2d20' },
  { name: 'MySQL', icon: SiMysql, color: '#4479a1' },
  { name: 'Sqlite', icon: SiSqlite, color: '#003b57' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47a248' },
  { name: 'Git', icon: SiGit, color: '#f05032' },
  { name: 'GitHub', icon: SiGithub, color: '#181717' },
  { name: 'GitLab', icon: SiGitlab, color: '#e24329' },
  { name: 'Postman', icon: SiPostman, color: '#ff6c37' },
  { name: 'Vercel', icon: SiVercel, color: '#000000' },
  { name: 'Figma', icon: SiFigma, color: '#f24e1e' },
  { name: 'VS Code', icon: VscVscode, color: '#007acc' },
]

export const footerLinks = [
  { title: 'About', href: '#' },
  { title: 'Projects', href: '#projects' },
  { title: 'Testimonials', href: '#testimonials' },
]

export const themes = [
  {
    name: 'Light',
    colors: ['#fff', '#0d1a3b', '#dbe3f7', '#0d1a3b', '#5565e8'],
  },
  {
    name: 'Dark',
    colors: ['#011627', '#607b96', '#0d1a3b', '#5565e8', '#18f2e5'],
  },
  {
    name: 'Aqua',
    colors: ['#b2e4e8', '#004a55', '#00c1d4', '#004a55', '#ff6f61'],
  },
  {
    name: 'Retro',
    colors: ['#fff3e0', '#6d4c41', '#ffcc80', '#5d4037', '#ffab40'],
  },
  {
    name: 'Monokai',
    colors: ['#272822', '#f8f8f2', '#3e3d32', '#a6e22e', '#f92672'],
  },
  {
    name: 'Forest',
    colors: ['#1e2b20', '#d5e4d1', '#283a2a', '#8ebd8b', '#b7da60'],
  },
]

export const languages = ['En', 'Es', 'Fr', 'De', 'Ru']

export type ExperienceItem = {
  type: 'experience' | 'education'
  title: string
  company: string
  date: string
  description: string
}

export const experienceData: ExperienceItem[] = [
  {
    type: 'experience',
    title: 'MERN Stack Developer (Trainee)',
    company: 'Trueline Solutions',
    date: 'Nov 2022 - Apr 2023',
    description:
      'Mastered the MERN stack development including MongoDB, Express.js, React, and Node.js. Built real-world projects during the training phase.',
  },
  {
    type: 'experience',
    title: 'Software Engineer',
    company: 'Lathiya Solutions',
    date: 'May 2023 - Aug 2024',
    description:
      'Developing various web applications using React, Next.js, Django, and Node.js. Focus on scalable backend services and responsive frontends.',
  },
  {
    type: 'experience',
    title: 'Software Engineer',
    company: 'Cloudus Infotech',
    date: 'Feb 2026 - Present',
    description:
      'Building modern web applications using Next.js with a focus on performance, scalability, and responsive design.',
  },
]
