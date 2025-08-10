"use client"
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Download, Code, Palette, Zap, Users, ChevronDown, Menu, X, Calendar, MapPin, Award, BookOpen, Star, ArrowRight, Play, Pause, Database, Monitor, Globe, MessageCircle, ShoppingCart, Cloud } from 'lucide-react';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isTyping, setIsTyping] = useState(true);
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [particleAnimation, setParticleAnimation] = useState(true);

  const roles = [
    "MERN Full Stack Developer",
    "React Specialist",
    "Next.js Expert",
    "Backend Developer"
  ];

  const observerRef = useRef();

  const handleMouseMove = useCallback((e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);

    const sections = ['home', 'about', 'education', 'skills', 'projects', 'contact'];
    const current = sections.find(section => {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      }
      return false;
    });
    if (current) setActiveSection(current);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    // Intersection Observer for animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.2 }
    );

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach(el => observerRef.current?.observe(el));

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      observerRef.current?.disconnect();
    };
  }, [handleMouseMove, handleScroll]);

  // Typing animation effect
  useEffect(() => {
    const currentText = roles[currentRole];

    if (isTyping) {
      if (charIndex < currentText.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentText.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => setIsTyping(false), 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (charIndex > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(currentText.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        setCurrentRole((currentRole + 1) % roles.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, currentRole, roles]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleDownloadCV = () => {
    // Create a dummy CV download
    const link = document.createElement('a');
    link.href = '#';
    link.download = 'Muhammad_Zeeshan_Abbas_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const projects = [
    {
      title: "E-commerce Platform",
      description: "Full-stack e-commerce application built with Next.js, Node.js, and MongoDB. Features include user authentication, product management, shopping cart, and payment integration.",
      tech: ["Next.js", "Node.js", "MongoDB", "React", "Tailwind CSS", "Express.js"],
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&h=300&fit=crop",
      demo: "#",
      github: "#",
      featured: true,
      stats: { status: "In Development", features: "15+", technologies: "6" }
    },
    {
      title: "NUST Internship Management System",
      description: "Comprehensive internship management system for university students and coordinators. Built as a semester project with complete CRUD operations and user role management.",
      tech: ["HTML", "CSS", "JavaScript", "SQL", "Spring Boot", "Bootstrap"],
      image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=500&h=300&fit=crop",
      demo: "#",
      github: "#",
      stats: { users: "200+", features: "12", database: "MySQL" }
    },
    {
      title: "MERN Chat & Video Call App",
      description: "Real-time chat application with video calling functionality. Built with Socket.io for real-time communication and WebRTC for video calls.",
      tech: ["React", "Node.js", "MongoDB", "Socket.io", "WebRTC", "Express.js"],
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop",
      demo: "#",
      github: "#",
      stats: { realTime: "Yes", features: "8+", users: "Multi-user" }
    },
    {
      title: "Personal Resume Builder",
      description: "Dynamic resume builder application allowing users to create, customize, and download professional resumes with multiple templates.",
      tech: ["React", "Node.js", "MongoDB", "Express.js", "CSS3", "PDF Generation"],
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=500&h=300&fit=crop",
      demo: "#",
      github: "#",
      stats: { templates: "5+", downloads: "PDF", responsive: "Yes" }
    },
    {
      title: "Weather App",
      description: "Interactive weather application with location-based forecasting, detailed weather information, and responsive design.",
      tech: ["HTML", "CSS", "JavaScript", "Weather API", "Geolocation"],
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=500&h=300&fit=crop",
      demo: "#",
      github: "#",
      stats: { api: "OpenWeather", features: "6", responsive: "Yes" }
    },
    {
      title: "Cafe Booking System",
      description: "Restaurant table booking and management system with customer reservations, menu management, and order tracking functionality.",
      tech: ["React", "Node.js", "MongoDB", "Express.js", "Bootstrap"],
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500&h=300&fit=crop",
      demo: "#",
      github: "#",
      stats: { bookings: "Real-time", menu: "Dynamic", orders: "Tracked" }
    },
    {
      title: "Blogs Application",
      description: "Full-featured blogging platform with user authentication, post creation, commenting system, and content management.",
      tech: ["React", "Node.js", "MongoDB", "Express.js", "Rich Text Editor"],
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&h=300&fit=crop",
      demo: "#",
      github: "#",
      stats: { posts: "Unlimited", comments: "Yes", editor: "Rich Text" }
    }
  ];

  const skills = [
    {
      name: "Frontend Development",
      icon: Code,
      level: 95,
      color: "from-blue-500 to-cyan-500",
      details: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML5", "CSS3", "JavaScript"]
    },
    {
      name: "Backend Development",
      icon: Database,
      level: 90,
      color: "from-green-500 to-emerald-500",
      details: ["Node.js", "Express.js", "MongoDB", "SQL", "Spring Boot", "RESTful APIs"]
    },
    {
      name: "Programming Languages",
      icon: Zap,
      level: 88,
      color: "from-purple-500 to-pink-500",
      details: ["JavaScript", "Java", "Python", "C++", "TypeScript"]
    },
    {
      name: "Tools & Technologies",
      icon: Users,
      level: 85,
      color: "from-orange-500 to-red-500",
      details: ["Git", "VS Code", "Postman", "Docker", "Webpack", "npm/yarn"]
    }
  ];

  const education = [
    {
      degree: "Bachelor of Computer Science",
      school: "National University of Sciences and Technology (NUST)",
      year: "2020-2024",
      gpa: "3.7/4.0",
      location: "Islamabad, Pakistan",
      achievements: ["MERN Stack Specialization", "Full Stack Project Lead", "Academic Excellence"],
      description: "Comprehensive computer science program with focus on software engineering, web development, and database management. Specialized in full-stack development with emphasis on modern JavaScript frameworks."
    }
  ];

  const certifications = [
    { name: "Meta Full Stack Development", issuer: "Meta", year: "2024" },
    { name: "Crash Course on Python", issuer: "Google", year: "2023" },
    { name: "JavaScript Algorithms and Data Structures", issuer: "freeCodeCamp", year: "2023" },
    { name: "Responsive Web Design", issuer: "freeCodeCamp", year: "2022" }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden relative">
      {/* Animated Cursor */}
      <div
        className="fixed w-6 h-6 border-2 border-blue-400 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-150"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: `scale(${isScrolled ? 0.5 : 1})`
        }}
      />

      {/* Floating Particles */}
      {particleAnimation && (
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 shadow-lg' : 'bg-transparent'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <button
              onClick={() => scrollToSection('home')}
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent hover:scale-105 transition-transform cursor-pointer"
            >
              Zeeshan.dev
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'education', 'skills', 'projects', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-all duration-200 relative group ${activeSection === item ? 'text-blue-400' : 'text-gray-300 hover:text-white'
                    }`}
                >
                  {item}
                  <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transform transition-transform duration-200 ${activeSection === item ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'
                    }`}></span>
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900/95 backdrop-blur-sm border-t border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['home', 'about', 'education', 'skills', 'projects', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="capitalize block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg w-full text-left transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="mb-8 relative group">
            <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-1 animate-pulse group-hover:animate-spin">
              <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
                  alt="Profile"
                  className="w-36 h-36 rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-gray-900 animate-bounce"></div>
          </div>

          <div className="space-y-6 mb-8">
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Muhammad Zeeshan Abbas
            </h1>
            <div className="h-12 flex items-center justify-center">
              <span className="text-lg sm:text-2xl md:text-3xl text-gray-300">
                {displayText}
                <span className="animate-pulse">|</span>
              </span>
            </div>
          </div>

          <p className="text-lg sm:text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Passionate MERN Full Stack Developer specializing in React, Next.js, and modern web technologies.
            Creating scalable web applications with clean code and exceptional user experiences.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <button
              onClick={() => scrollToSection('projects')}
              className="group px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold hover:shadow-xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
            >
              View My Work
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={handleDownloadCV}
              className="group px-8 sm:px-10 py-3 sm:py-4 border border-gray-600 rounded-full font-semibold hover:border-gray-400 hover:bg-gray-800/50 transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-sm"
            >
              <Download size={20} className="group-hover:animate-bounce" />
              Download CV
            </button>
          </div>

          <div className="flex justify-center space-x-6 mb-16">
            {[
              { icon: Github, href: "https://github.com/zeeshanabbas", label: "GitHub" },
              { icon: Linkedin, href: "https://linkedin.com/in/muhammad-zeeshan-abbas", label: "LinkedIn" },
              { icon: Mail, href: "mailto:zeeshan.abbas@email.com", label: "Email" }
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="group p-4 rounded-full border border-gray-700 hover:border-gray-500 hover:bg-gray-800/50 transition-all duration-200 hover:scale-110 backdrop-blur-sm"
              >
                <social.icon size={24} className="group-hover:scale-110 transition-transform" />
              </a>
            ))}
          </div>

          <button
            onClick={() => scrollToSection('about')}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer hover:text-blue-400 transition-colors"
          >
            <ChevronDown size={32} className="text-gray-400" />
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-24 px-4" data-animate>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-bold mb-12 sm:mb-20 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className={`space-y-8 transition-all duration-1000 ${isVisible.about ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div>
                <h3 className="text-2xl sm:text-3xl font-semibold mb-6 text-blue-400">MERN Stack Enthusiast</h3>
                <div className="space-y-6 text-gray-300 leading-relaxed">
                  <p className="text-base sm:text-lg">
                    As a dedicated MERN Full Stack Developer, I specialize in creating dynamic, responsive web applications
                    using MongoDB, Express.js, React, and Node.js. My expertise extends to modern frameworks like Next.js
                    and styling with Tailwind CSS, ensuring both functionality and aesthetic appeal.
                  </p>
                  <p className="text-base sm:text-lg">
                    Currently pursuing my Bachelor's degree at NUST, I'm actively seeking opportunities to apply my skills
                    in a professional environment. I'm passionate about clean code, user experience, and building scalable
                    solutions that make a difference.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-lg sm:text-xl font-semibold text-purple-400 mb-4">Technical Highlights</h4>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { number: "7+", label: "Projects Completed", color: "text-blue-400" },
                    { number: "5+", label: "Technologies Mastered", color: "text-purple-400" },
                    { number: "100%", label: "Commitment Level", color: "text-green-400" },
                    { number: "24/7", label: "Learning Mode", color: "text-pink-400" }
                  ].map((stat, index) => (
                    <div key={index} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                      <div className={`text-xl sm:text-2xl font-bold ${stat.color}`}>{stat.number}</div>
                      <div className="text-gray-400 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {["React", "Next.js", "Node.js", "MongoDB", "Express.js", "Tailwind CSS", "JavaScript", "Java", "Python", "C++"].map((tech) => (
                  <span key={tech} className="px-3 sm:px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-700 rounded-full text-sm border border-gray-600 hover:border-blue-400 transition-colors cursor-default">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className={`relative transition-all duration-1000 delay-300 ${isVisible.about ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-6 sm:p-8 backdrop-blur-sm border border-gray-700/50">
                <img
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop"
                  alt="Working setup"
                  className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-16 sm:py-24 px-4 bg-gray-800/30" data-animate>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-bold mb-12 sm:mb-20 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Education
          </h2>
          <div className="space-y-8 sm:space-y-12">
            {education.map((edu, index) => (
              <div
                key={index}
                className={`bg-gray-800/50 rounded-2xl p-6 sm:p-8 border border-gray-700/50 hover:border-gray-600 transition-all duration-500 backdrop-blur-sm ${isVisible.education ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
                  <div className="lg:col-span-2">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-4">
                      <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl w-fit">
                        <BookOpen size={24} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl sm:text-2xl font-bold text-blue-400 mb-2">{edu.degree}</h3>
                        <p className="text-lg sm:text-xl text-gray-300 mb-2">{edu.school}</p>
                        <div className="flex flex-wrap items-center gap-4 text-gray-400 mb-4 text-sm sm:text-base">
                          <div className="flex items-center gap-1">
                            <Calendar size={16} />
                            <span>{edu.year}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin size={16} />
                            <span>{edu.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star size={16} />
                            <span>GPA: {edu.gpa}</span>
                          </div>
                        </div>
                        <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{edu.description}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-purple-400 mb-4">Achievements</h4>
                    <div className="space-y-2">
                      {edu.achievements.map((achievement, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Award size={16} className="text-yellow-400 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300 text-sm">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="mt-16 sm:mt-20">
            <h3 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center text-purple-400">Certifications</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 rounded-xl p-6 border border-gray-600/50 hover:border-blue-400/50 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                >
                  <div className="text-center">
                    <Award className="mx-auto mb-4 text-yellow-400" size={32} />
                    <h4 className="font-semibold mb-2 text-blue-400 text-sm sm:text-base">{cert.name}</h4>
                    <p className="text-gray-400 text-xs sm:text-sm mb-1">{cert.issuer}</p>
                    <p className="text-gray-500 text-xs">{cert.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 sm:py-24 px-4" data-animate>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-bold mb-12 sm:mb-20 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
            {skills.map((skill, index) => (
              <div
                key={index}
                className={`group bg-gray-800/50 rounded-2xl p-6 sm:p-8 border border-gray-700/50 hover:border-gray-600 transition-all duration-500 backdrop-blur-sm ${isVisible.skills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center mb-6">
                  <div className={`p-4 rounded-xl bg-gradient-to-r ${skill.color} mb-4 sm:mb-0 sm:mr-6 group-hover:scale-110 transition-transform duration-300 w-fit`}>
                    <skill.icon size={32} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-semibold mb-2">{skill.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      {skill.details.map((detail, idx) => (
                        <span key={idx} className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300">
                          {detail}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mb-4 flex justify-between items-center">
                  <span className="text-gray-400">Proficiency</span>
                  <span className="text-blue-400 font-bold">{skill.level}%</span>
                </div>

                <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-3 rounded-full bg-gradient-to-r ${skill.color} transition-all duration-2000 ease-out relative overflow-hidden`}
                    style={{ width: isVisible.skills ? `${skill.level}%` : '0%' }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 sm:py-24 px-4 bg-gray-800/30" data-animate>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-bold mb-12 sm:mb-20 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Featured Projects
          </h2>

          {/* Featured Project */}
          <div className={`mb-16 sm:mb-20 transition-all duration-1000 ${isVisible.projects ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl p-6 sm:p-8 border border-blue-500/20 backdrop-blur-sm">
              <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Star className="text-yellow-400" size={24} />
                    <span className="text-sm font-semibold text-yellow-400 uppercase tracking-wide">Featured Project</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-blue-400">{projects[0].title}</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed text-base sm:text-lg">{projects[0].description}</p>

                  <div className="flex flex-wrap gap-3 mb-6 sm:mb-8">
                    {projects[0].tech.map((tech) => (
                      <span key={tech} className="px-3 sm:px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6 sm:mb-8">
                    {Object.entries(projects[0].stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-lg sm:text-2xl font-bold text-blue-400">{value}</div>
                        <div className="text-gray-400 text-xs sm:text-sm capitalize">{key}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href={projects[0].demo}
                      className="group px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <Globe size={16} />
                      Live Demo
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a
                      href={projects[0].github}
                      className="px-6 py-3 border border-gray-600 rounded-full font-semibold hover:border-gray-400 hover:bg-gray-800/50 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <Github size={16} />
                      View Code
                    </a>
                  </div>
                </div>
                <div className="relative group order-first lg:order-last">
                  <div className="aspect-video rounded-2xl overflow-hidden border border-gray-700/50">
                    <img
                      src={projects[0].image}
                      alt={projects[0].title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Other Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects.slice(1).map((project, index) => (
              <div
                key={index}
                className={`group bg-gray-800/50 rounded-2xl overflow-hidden border border-gray-700/50 hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-105 backdrop-blur-sm ${isVisible.projects ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                style={{ transitionDelay: `${(index + 1) * 150}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="flex gap-2">
                      <a
                        href={project.demo}
                        className="p-2 bg-blue-500/80 rounded-full hover:bg-blue-500 transition-colors"
                      >
                        <ExternalLink size={16} />
                      </a>
                      <a
                        href={project.github}
                        className="p-2 bg-gray-700/80 rounded-full hover:bg-gray-700 transition-colors"
                      >
                        <Github size={16} />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 text-blue-400 group-hover:text-blue-300 transition-colors">{project.title}</h3>
                  <p className="text-gray-300 mb-4 leading-relaxed text-sm sm:text-base">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 3).map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-gray-700/50 rounded-full text-xs text-gray-300 border border-gray-600">
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="px-3 py-1 bg-gray-700/50 rounded-full text-xs text-gray-400 border border-gray-600">
                        +{project.tech.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    {Object.entries(project.stats).map(([key, value]) => (
                      <div key={key}>
                        <div className="font-bold text-blue-400">{value}</div>
                        <div className="text-gray-500 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Projects Button */}
          <div className="text-center mt-12 sm:mt-16">
            <button
              onClick={() => window.open('https://github.com/zeeshanabbas', '_blank')}
              className="group px-6 sm:px-8 py-3 sm:py-4 border border-gray-600 rounded-full font-semibold hover:border-blue-400 hover:bg-blue-500/10 transition-all duration-300 flex items-center gap-3 mx-auto"
            >
              View All Projects on GitHub
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-24 px-4" data-animate>
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl font-bold mb-8 sm:mb-12 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Let's Build Something Amazing Together
          </h2>
          <p className="text-base sm:text-xl text-gray-300 mb-12 sm:mb-16 max-w-3xl mx-auto leading-relaxed">
            I'm actively seeking opportunities to contribute to innovative projects and grow as a developer.
            Let's discuss how I can bring value to your team with my MERN stack expertise and passion for coding.
          </p>

          <div className={`grid md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 transition-all duration-1000 ${isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {[
              {
                icon: Mail,
                title: "Email Me",
                info: "zeeshan.abbas@email.com",
                subtext: "Available for new opportunities",
                href: "mailto:zeeshan.abbas@email.com",
                gradient: "from-blue-500 to-purple-500"
              },
              {
                icon: Linkedin,
                title: "LinkedIn",
                info: "@muhammad-zeeshan-abbas",
                subtext: "Let's connect professionally",
                href: "https://linkedin.com/in/muhammad-zeeshan-abbas",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: Github,
                title: "GitHub",
                info: "@zeeshanabbas",
                subtext: "Check out my repositories",
                href: "https://github.com/zeeshanabbas",
                gradient: "from-green-500 to-blue-500"
              }
            ].map((contact, index) => (
              <a
                key={index}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gray-800/50 rounded-2xl p-6 sm:p-8 border border-gray-700/50 hover:border-blue-400/50 transition-all duration-300 backdrop-blur-sm hover:scale-105 block"
              >
                <div className={`p-4 bg-gradient-to-r ${contact.gradient} rounded-full w-fit mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                  <contact.icon className="text-white" size={32} />
                </div>
                <h3 className="font-semibold mb-3 text-lg sm:text-xl">{contact.title}</h3>
                <p className="text-gray-400 mb-4">{contact.info}</p>
                <p className="text-gray-500 text-sm">{contact.subtext}</p>
              </a>
            ))}
          </div>

          <div className="space-y-6 sm:space-y-8">
            <a
              href="mailto:zeeshan.abbas@email.com"
              className="group px-8 sm:px-12 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold text-base sm:text-lg hover:shadow-xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto w-fit"
            >
              Start a Conversation
              <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </a>

            <p className="text-gray-400 text-sm sm:text-base">
              Open to full-time positions, internships, and freelance projects
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-12 px-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8">
            <div className="text-center md:text-left">
              <button
                onClick={() => scrollToSection('home')}
                className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2 hover:scale-105 transition-transform"
              >
                Zeeshan.dev
              </button>
              <p className="text-gray-400 text-sm sm:text-base">Building the future with MERN stack expertise.</p>
            </div>

            <div className="flex items-center gap-4 sm:gap-6">
              <button
                onClick={() => setParticleAnimation(!particleAnimation)}
                className="p-3 rounded-full border border-gray-700 hover:border-gray-500 transition-colors"
                title="Toggle Animations"
              >
                {particleAnimation ? <Pause size={20} /> : <Play size={20} />}
              </button>

              <div className="flex space-x-4">
                {[
                  { icon: Github, href: "https://github.com/zeeshanabbas" },
                  { icon: Linkedin, href: "https://linkedin.com/in/muhammad-zeeshan-abbas" },
                  { icon: Mail, href: "mailto:zeeshan.abbas@email.com" }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full border border-gray-700 hover:border-gray-500 hover:bg-gray-800/50 transition-all duration-200 hover:scale-110"
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-800 text-center text-gray-400">
            <p className="text-sm sm:text-base">&copy; 2025 Muhammad Zeeshan Abbas. Crafted with ❤️ and MERN stack</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;