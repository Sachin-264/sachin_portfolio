import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Layers, Home, MessageSquare } from 'lucide-react';
import {
  profileData,
  brandLogosData,
  servicesData,
  selectedWorkData,
  experiencesData,
  testimonialsData,
  faqData,
  skillsData
} from '../../data/sources/portfolioLocalData';
import styles from '../styles/Portfolio.module.css';
import { ProjectDetailPage } from './ProjectDetailPage';

// Custom SVG Icons
const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0077b5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e1306c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
  </svg>
);



const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export const PortfolioPage: React.FC = () => {
  const SHOW_THEME_SWITCHER = false;
  const [activeTheme, setActiveTheme] = useState<'classic' | 'baskara'>('baskara');
  const [activeTab, setActiveTab] = useState('Home');
  const [viewingProject, setViewingProject] = useState<any>(null);
  const [activeFaqId, setActiveFaqId] = useState<string>('1');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactProjectType, setContactProjectType] = useState('Mobile App');
  const [contactCurrency, setContactCurrency] = useState('INR');
  const [contactBudget, setContactBudget] = useState('');
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const subject = encodeURIComponent(`Portfolio Project Inquiry from ${contactName}`);
    const body = encodeURIComponent(
      `Hello Sachin,\n\n` +
      `You have received a new project inquiry from your portfolio:\n\n` +
      `- Client Name: ${contactName}\n` +
      `- Client Email: ${contactEmail}\n` +
      `- Project Type: ${contactProjectType}\n` +
      `- Estimated Budget: ${contactCurrency} ${contactBudget}\n\n` +
      `Project Details:\n${contactMessage}\n\n` +
      `Best regards,\n${contactName}`
    );
    
    window.location.href = `mailto:msachinmishra8@gmail.com?subject=${subject}&body=${body}`;
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitSuccess(true);
    }, 1200);
  };

  const resetContactForm = () => {
    setContactName('');
    setContactEmail('');
    setContactMessage('');
    setContactProjectType('Mobile App');
    setContactCurrency('INR');
    setContactBudget('');
    setIsSubmitSuccess(false);
  };

  const testimonialScrollRef = React.useRef<HTMLDivElement>(null);

  const scrollTestimonials = (direction: 'left' | 'right') => {
    if (testimonialScrollRef.current) {
      const scrollAmount = 380;
      testimonialScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const navItems = ['Home', 'Work', 'About', 'Contact'];

  const [isMobile, setIsMobile] = useState(false);
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Dynamically update body background and padding to prevent bleed-through
  React.useEffect(() => {
    if (activeTheme === 'baskara') {
      document.body.style.backgroundColor = '#ffffff';
      document.body.style.padding = '0';
    } else {
      document.body.style.backgroundColor = '#f4f4f5';
      document.body.style.padding = isMobile ? '0.75rem' : '2rem';
    }
  }, [activeTheme]);

  const [scrollTop, setScrollTop] = useState(0);
  React.useEffect(() => {
    const handleScroll = () => {
      setScrollTop(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll Linked Animations
  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 400], [0, -80]);
  const opacityHero = useTransform(scrollY, [0, 400], [1, 0]);

  // Scroll morphing transforms for the single portrait cutout using reactive state
  const progress = Math.min(1, Math.max(0, scrollTop / 420)); // Completes faster
  const widthPortrait = isMobile ? 320 : (440 - progress * 70); // Animate width from 440px to 370px
  const xPortrait = isMobile ? 0 : (progress * 280); // Shifts right
  const yPortrait = isMobile ? 0 : (progress * 565); // Translates down
  const borderRadiusPortrait = isMobile ? '2rem' : `${progress * 2}rem`;
  const aspectRatioPortrait = isMobile ? 0.93 : (0.85 + progress * 0.08);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
  };

  if (viewingProject) {
    return (
      <AnimatePresence mode="wait">
        <ProjectDetailPage
          project={viewingProject}
          theme={activeTheme}
          onBack={() => setViewingProject(null)}
        />
      </AnimatePresence>
    );
  }

  return (
    <>
      {/* Floating Theme Switcher */}
      {SHOW_THEME_SWITCHER && (
        <button
          className={styles.themeSwitchFloating}
          onClick={() => setActiveTheme(activeTheme === 'classic' ? 'baskara' : 'classic')}
        >
          <Layers size={14} />
          Switch Design: {activeTheme === 'classic' ? 'Modern Display' : 'Classic Cards'}
        </button>
      )}

      <AnimatePresence mode="wait">
        {activeTheme === 'classic' ? (
          // ==========================================================================
          // THEME A: CLASSIC CARDS LAYOUT
          // ==========================================================================
          <motion.div
            key="classic-theme"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={styles.pageWrapper}
          >
            {/* Header */}
            <header className={styles.header}>
              <div className={styles.logoContainer}>
                <div className={styles.logoDot}>C</div>
                <a href="#" className={styles.logoText}>
                  {profileData.name}
                </a>
              </div>

              {/* Navigation pills */}
              <nav className={styles.navPills}>
                {navItems.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className={`${styles.navLink} ${activeTab === item ? styles.activeNavLink : ''}`}
                    onClick={() => setActiveTab(item)}
                  >
                    {item}
                  </a>
                ))}
              </nav>

              <button onClick={() => setIsContactModalOpen(true)} className={styles.headerCta}>
                Book a call
              </button>
            </header>
 
            {/* Hero Section */}
            <motion.main
              className={styles.heroGrid}
              style={{ y: yHero, opacity: opacityHero }}
            >
              {/* Left Side */}
              <motion.div
                className={styles.heroLeft}
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.1 } }
                }}
              >
                <motion.div variants={itemVariants} className={styles.statusBadge}>
                  <span className={styles.statusDot} />
                  {profileData.statusText}
                </motion.div>
 
                <motion.h1 variants={itemVariants} className={styles.heroHeadline}>
                  Hi, I'm a <br />
                  <span>{profileData.roleTitle}</span>
                </motion.h1>
 
                <motion.p variants={itemVariants} className={styles.heroSubtext}>
                  {profileData.experienceOverview}
                </motion.p>
 
                <motion.button
                  variants={itemVariants}
                  onClick={() => setIsContactModalOpen(true)}
                  className={styles.heroCta}
                >
                  Contact Us
                </motion.button>
              </motion.div>
 
              {/* Right Side - Clean portrait */}
              <motion.div
                className={styles.heroRight}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.2 }}
              >
                <div className={styles.photoCardWrapper}>
                  <div className={styles.mainPhotoWrapper}>
                    <img
                      src="sachin-hero.png"
                      alt={profileData.name}
                      className={styles.mainPhoto}
                    />
                  </div>
 
                  {/* Overlapping Social Tools Row */}
                  <div className={styles.floatingSocialCard}>
                    <a href="https://github.com/Sachin-264" target="_blank" rel="noopener noreferrer" className={styles.socialIconLink}><GithubIcon /></a>
                    <a href="https://www.linkedin.com/in/sachin-mishra-7b62a2229?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className={styles.socialIconLink}><LinkedinIcon /></a>
                    <a href="https://www.instagram.com/sachinmishra_264?igsh=MTFpbmhmcHlwY2dseA==" target="_blank" rel="noopener noreferrer" className={styles.socialIconLink}><InstagramIcon /></a>
                  </div>
                </div>
              </motion.div>
            </motion.main>

            {/* Section 2: Mission Banner */}
            <motion.section
              className={styles.missionSection}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={sectionVariants}
            >
              <p className={styles.missionText}>
                My mission is to assist <span>startups and enterprises</span> in creating an emotional bond between their products and <span>satisfied, engaged customers.</span>
              </p>

              <div className={styles.marqueeContainer}>
                <div className={styles.marqueeTrack}>
                  {brandLogosData.map((logo, idx) => (
                    <span key={`logo-1-${idx}`} className={styles.logoTextBrand}>
                      {logo.name}
                    </span>
                  ))}
                  {brandLogosData.map((logo, idx) => (
                    <span key={`logo-2-${idx}`} className={styles.logoTextBrand}>
                      {logo.name}
                    </span>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Section 3: Services Grid */}
            <motion.section
              id="services"
              className={styles.section}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={sectionVariants}
            >
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>{profileData.servicesHeader}</h2>
              </div>
              <div className={styles.servicesColumn}>
                {servicesData.map((service) => (
                  <div key={service.id} className={styles.serviceItem}>
                    <span className={styles.serviceNum}>{service.id}</span>
                    <h3 className={styles.serviceItemTitle}>{service.title}</h3>
                    <p className={styles.serviceItemDesc}>{service.description}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Section 4: Selected Work Grid */}
            <motion.section
              id="work"
              className={styles.projectsSection}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={sectionVariants}
            >
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>{profileData.projectsHeader}</h2>
                <a href="#" className={styles.headerCta} style={{ marginTop: '2rem' }}>
                  See All
                </a>
              </div>
              <div className={styles.projectsWrapper}>
                {selectedWorkData.slice(0, 1).map((project) => (
                  <div key={project.id} className={styles.projectCard} style={{ width: '100%' }} onClick={() => setViewingProject(project)}>
                    <div className={styles.projectImageWrapper} style={{ aspectRatio: 2.1 }}>
                      <img src={project.imageUrl} alt={project.title} className={styles.projectImage} />
                    </div>
                    <div className={styles.projectMeta}>
                      <h3 className={styles.projectTitle}>{project.title}</h3>
                      <span className={styles.projectYear}>{project.gitUrl}</span>
                    </div>
                    <div className={styles.projectTags}>
                      {project.tags.map((tag, i) => (
                        <span key={i} className={styles.projectTag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                ))}

                <div className={styles.projectGridRow}>
                  {selectedWorkData.slice(1, 3).map((project) => (
                    <div key={project.id} className={styles.projectCard} onClick={() => setViewingProject(project)}>
                      <div className={styles.projectImageWrapper}>
                        <img src={project.imageUrl} alt={project.title} className={styles.projectImage} />
                      </div>
                      <div className={styles.projectMeta}>
                        <h3 className={styles.projectTitle}>{project.title}</h3>
                        <span className={styles.projectYear}>{project.gitUrl}</span>
                      </div>
                      <div className={styles.projectTags}>
                        {project.tags.map((tag, i) => (
                          <span key={i} className={styles.projectTag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className={styles.projectGridRow}>
                  {selectedWorkData.slice(3, 5).map((project) => (
                    <div key={project.id} className={styles.projectCard} onClick={() => setViewingProject(project)}>
                      <div className={styles.projectImageWrapper}>
                        <img src={project.imageUrl} alt={project.title} className={styles.projectImage} />
                      </div>
                      <div className={styles.projectMeta}>
                        <h3 className={styles.projectTitle}>{project.title}</h3>
                        <span className={styles.projectYear}>{project.gitUrl}</span>
                      </div>
                      <div className={styles.projectTags}>
                        {project.tags.map((tag, i) => (
                          <span key={i} className={styles.projectTag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Section 5: Experience Timeline */}
            <motion.section
              id="about"
              className={styles.section}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={sectionVariants}
            >
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>{profileData.experienceHeader}</h2>
                <button onClick={() => setIsContactModalOpen(true)} className={styles.headerCta} style={{ marginTop: '2rem' }}>
                  Book a call
                </button>
              </div>
              <div className={styles.experienceCards}>
                {experiencesData.map((exp, idx) => (
                  <div key={idx} className={styles.expCard}>
                    <div className={styles.expLogoName}>
                      <div className={styles.expLogoCircle}>
                        {exp.company.substring(0, 1)}
                      </div>
                      <div>
                        <h3 className={styles.expRole}>{exp.role}</h3>
                        <span className={styles.expCompany}>{exp.company}</span>
                      </div>
                    </div>
                    <span className={styles.expPeriod}>{exp.period}</span>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Section 6: Contact Banner */}
            <motion.section
              id="contact"
              className={styles.contactCard}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={sectionVariants}
            >
              <div className={styles.contactInfoText}>
                <h2 className={styles.sectionTitle} style={{ fontSize: '2.5rem' }}>
                  {profileData.contactHeader}
                </h2>
                <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                  {profileData.contactSub}
                </p>
              </div>

              <form className={styles.contactForm} onSubmit={(e) => e.preventDefault()}>
                <div className={styles.formGroup}>
                  <input type="text" placeholder="Name" className={styles.formInput} />
                </div>
                <div className={styles.formGroup}>
                  <input type="email" placeholder="Email" className={styles.formInput} />
                </div>
                <div className={styles.formGroup}>
                  <textarea placeholder="Work Description..." rows={4} className={styles.formInput} style={{ resize: 'none' }} />
                </div>
                <button type="submit" className={styles.formSubmit}>
                  Submit
                </button>
              </form>
            </motion.section>

            {/* Footer */}
            <footer className={styles.footerSection}>
              <div className={styles.footerLeft}>
                <h2 className={styles.footerTitle}>{profileData.footerTitle}</h2>
                <a href={`mailto:${profileData.contactEmail}`} className={styles.emailPill}>
                  {profileData.contactEmail}
                </a>
              </div>
              <div className={styles.socialPills}>
                <span className={styles.socialPillLabel} style={{ color: '#71717a', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.05em' }}>FOLLOW ME! ✌️</span>
                <a href="https://github.com/Sachin-264" target="_blank" rel="noopener noreferrer" className={styles.socialPill}><GithubIcon /> GITHUB</a>
                <a href="https://www.linkedin.com/in/sachin-mishra-7b62a2229?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className={styles.socialPill}><LinkedinIcon /> LINKEDIN</a>
                <a href="https://www.instagram.com/sachinmishra_264?igsh=MTFpbmhmcHlwY2dseA==" target="_blank" rel="noopener noreferrer" className={styles.socialPill}><InstagramIcon /> INSTAGRAM</a>
              </div>
            </footer>
          </motion.div>
        ) : (
          // ==========================================================================
          // THEME B: BASKARA DISPLAY LAYOUT
          // ==========================================================================
          <motion.div
            key="baskara-theme"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={styles.themeBWrapper}
          >
            {/* Centered pill navigation header */}
            <header className={styles.themeBHeader}>
              <div className={styles.themeBNavPill}>
                {navItems.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className={`${styles.themeBNavLink} ${activeTab === item ? styles.themeBActiveNavLink : ''}`}
                    onClick={() => setActiveTab(item)}
                  >
                    {item === 'Home' && <Home size={14} style={{ marginRight: '2px' }} />}
                    {item}
                  </a>
                ))}
              </div>
            </header>

            {/* Massive Display Hero */}
            <main className={styles.themeBHero}>
              {/* Wordmark behind the photo with letter hover animation */}
              <motion.h1
                className={styles.themeBWordmark}
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.04
                    }
                  }
                }}
              >
                {"SACHIN ©".split("").map((char, index) => (
                  <motion.span
                    key={index}
                    style={{ display: "inline-block", transformStyle: "preserve-3d" }}
                    variants={{
                      hidden: { y: 60, opacity: 0 },
                      visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                    }}
                    whileHover={{
                      y: -18,
                      scale: 1.15,
                      color: "#6366f1", // Dynamic indigo color shift on hover
                      rotateZ: 4,
                      transition: { type: "spring", stiffness: 400, damping: 10 }
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.h1>

              {/* Three-Column Interactive Layout: Text Left | Overlapping Cutout | Text Right */}
              <div className={styles.themeBHeroInteractiveRow}>
                {/* Left Description Column */}
                <div className={styles.themeBDescColLeft}>
                  <p className={styles.themeBDescText}>
                    Hello, I'm Sachin, a developer in India. I bring innovative ideas to life through my designs and collaborations.
                  </p>
                </div>

                {/* Developer Portrait overlapping the text with scroll morph parallax reveal */}
                <motion.div
                  className={styles.themeBPortraitContainer}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.2 }}
                  style={{
                    width: isMobile ? undefined : widthPortrait,
                    transform: `translate3d(${xPortrait}px, ${yPortrait}px, 0)`,
                    transformOrigin: 'bottom center',
                    borderRadius: borderRadiusPortrait,
                    overflow: progress > 0.05 ? 'hidden' : 'visible',
                    aspectRatio: aspectRatioPortrait
                  }}
                >
                  <motion.img
                    src="sachin-hero.png"
                    alt={profileData.name}
                    className={styles.themeBPortrait}
                    initial={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", opacity: 0 }}
                    animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", opacity: 1 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                    style={{
                      borderRadius: borderRadiusPortrait
                    }}
                  />
                </motion.div>

                {/* Right Description Column */}
                <div className={styles.themeBDescColRight}>
                  <p className={styles.themeBDescText}>
                    I bring innovative ideas to life through my designs and collaborations.
                  </p>
                </div>
              </div>

            </main>

            {/* Full-width white band for the About section */}
            <div className={styles.themeBAboutBand}>
              <motion.section
                id="about"
                className={styles.themeBAboutSection}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={sectionVariants}
              >
                {/* Left Column: Heading (sticky) */}
                <div className={styles.themeBAboutLeft}>
                  <span className={styles.themeBAboutTag}>(About Me)</span>
                  <h2 className={styles.themeBAboutTitle}>
                    A Deep Dive into My Life's Experiences and Lessons Learned
                  </h2>
                </div>

                {/* Right Column: Bio text */}
                <div className={styles.themeBAboutRight}>
                  {/* Colored card — portrait morphs and lands here on scroll */}
                  <div className={styles.themeBAboutImageWrapper}>
                    <img
                      src="sachin-hero.png"
                      alt={profileData.name}
                      className={styles.themeBAboutMobileImage}
                    />
                    <div className={styles.themeBAboutImagePlaceholder} />
                  </div>

                  <div className={styles.themeBAboutBio}>
                    <p className={styles.themeBAboutBioText}>
                      Hello, I'm Sachin, a passionate web and mobile developer based in India. With a strong focus on high-fidelity performance and clean design aesthetics, I specialize in crafting seamless user experiences across mobile and web platforms. Over the years, I've built and delivered production-ready ecosystems, ranging from hardware-integrated environmental telemetry tools and real-time school bus tracking software to AI-powered content creation apps.
                    </p>
                    <p className={styles.themeBAboutBioText}>
                      My engineering philosophy centers around robust state management, clean architecture patterns, and seamless hardware-to-cloud communications. Whether it's designing clean user flows in Figma, writing optimized Flutter code, or orchestrating microservices in Node.js and FastAPI, I take pride in guiding products all the way from initial concepts to deployment on the App Store and Google Play Store.
                    </p>
                  </div>
                </div>
              </motion.section>
            </div>

            {/* Features / Expertise Section */}
            <div className={styles.themeBFeaturesBand}>
              <motion.section
                id="features"
                className={styles.themeBFeaturesSection}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={sectionVariants}
              >
                {/* Top Row: Label + Heading left, Description right */}
                <div className={styles.themeBFeaturesHeader}>
                  <div className={styles.themeBFeaturesHeadLeft}>
                    <span className={styles.themeBFeaturesLabel}>OUR FEATURES</span>
                    <h2 className={styles.themeBFeaturesTitle}>
                      I Have Expertise to<br />Tackle Challenges
                    </h2>
                  </div>
                  <div className={styles.themeBFeaturesHeadRight}>
                    <p className={styles.themeBFeaturesDesc}>
                      With experience in my field, I can tackle challenges and provide solutions. My skills enhance my problem-solving and make me a valuable asset to any team.
                    </p>
                  </div>
                </div>

                {/* Feature Cards Row */}
                <motion.div 
                  className={styles.themeBFeaturesGrid}
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.08 } }
                  }}
                >
                  {servicesData.map((service) => (
                    <motion.div 
                      key={service.id} 
                      className={styles.themeBFeatureCard}
                      variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
                      }}
                      whileHover={{ 
                        y: -8, 
                        boxShadow: "0 20px 40px rgba(0,0,0,0.06)",
                        borderColor: "rgba(0,0,0,0.12)",
                        transition: { type: "spring", stiffness: 300, damping: 20 }
                      }}
                    >
                      <div className={styles.themeBFeatureIcon}>
                        {service.iconType === 'design' && (
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>
                        )}
                        {service.iconType === 'dev' && (
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
                        )}
                        {service.iconType === 'graphic' && (
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" y1="3" x2="12" y2="15" />
                          </svg>
                        )}
                        {service.iconType === 'branding' && (
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            <path d="m9 11 2 2 4-4" />
                          </svg>
                        )}
                      </div>
                      <h3 className={styles.themeBFeatureCardTitle}>{service.title}</h3>
                      <p className={styles.themeBFeatureCardDesc}>{service.description}</p>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Skills & Technologies Section */}
                <div className={styles.themeBSkillsContainer}>
                  <div className={styles.themeBSkillsHeader}>
                    <span className={styles.themeBSkillsTag}>(My Tech Stack)</span>
                    <h3 className={styles.themeBSkillsTitle}>Programming Languages & Tools</h3>
                  </div>
                  <div className={styles.themeBSkillsGrid}>
                    {skillsData.map((category, idx) => (
                      <div key={idx} className={styles.themeBSkillsCategoryCard}>
                        <h4 className={styles.themeBSkillsCategoryName}>{category.categoryName}</h4>
                        <div className={styles.themeBSkillsBadgeRow}>
                          {category.skills.map((skill, sIdx) => (
                            <span key={sIdx} className={styles.themeBSkillBadge}>
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.section>
            </div>

            {/* My Best Projects — Dark Section */}
            <div className={styles.themeBProjectsBand}>
              <motion.section
                id="work"
                className={styles.themeBProjectsSection}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={sectionVariants}
              >
                {/* Header row */}
                <div className={styles.themeBProjectsHeader}>
                  <h2 className={styles.themeBProjectsTitle}>My Best Projects</h2>
                  <div className={styles.themeBProjectsHeaderRight}>
                    <p className={styles.themeBProjectsSubtext}>
                      Whether it's creating a brand identity, designing a website, or developing marketing materials, I strive to understand needs and deliver results that resonate.
                    </p>
                    <a href="#" className={styles.themeBProjectsCta}>
                      See More Works <span>→</span>
                    </a>
                  </div>
                </div>

                {/* 3-column project grid */}
                <motion.div 
                  className={styles.themeBProjectsGrid}
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.1 } }
                  }}
                >
                  {selectedWorkData.map((project) => (
                    <motion.div
                      key={project.id}
                      className={styles.themeBProjectCard}
                      onClick={() => setViewingProject(project)}
                      variants={{
                        hidden: { opacity: 0, y: 40 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                      }}
                      whileHover={{ 
                        y: -10,
                        transition: { type: "spring", stiffness: 300, damping: 20 }
                      }}
                    >
                      <div className={styles.themeBProjectImageWrap}>
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className={styles.themeBProjectImage}
                        />
                        <div className={styles.themeBProjectOverlay} />
                      </div>
                      <div className={styles.themeBProjectInfo}>
                        <span className={styles.themeBProjectName}>{project.title}</span>
                        <span className={styles.themeBProjectCategory}>
                          {project.category} • Website
                        </span>
                      </div>
                    </motion.div>
                  ))}

                  {/* CTA Card for more projects */}
                  <motion.div
                    className={`${styles.themeBProjectCard} ${styles.themeBProjectCtaCard}`}
                    onClick={() => setIsContactModalOpen(true)}
                    variants={{
                      hidden: { opacity: 0, y: 40 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                    }}
                    whileHover={{ 
                      y: -10,
                      transition: { type: "spring", stiffness: 300, damping: 20 }
                    }}
                  >
                    <div className={styles.themeBProjectCtaWrap}>
                      <div className={styles.themeBProjectCtaIcon}>
                        <MessageSquare size={24} />
                      </div>
                      <h3 className={styles.themeBProjectCtaTitle}>And Many More...</h3>
                      <p className={styles.themeBProjectCtaDesc}>
                        I have developed and shipped numerous other applications. Contact me to discuss my full portfolio!
                      </p>
                      <button className={styles.themeBProjectCtaBtn}>
                        Get in Touch
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.section>
            </div>

            {/* Testimonials Section */}
            <div className={styles.themeBTestimonialsBand}>
              <section className={styles.themeBTestimonialsSection}>
                <div className={styles.themeBTestimonialsHeader}>
                  <div className={styles.themeBTestimonialsHeaderLeft}>
                    <h2 className={styles.themeBTestimonialsTitle}>Testimonials</h2>
                    <p className={styles.themeBTestimonialsSubtext}>
                      Explore customer feedback on my service and its impact on their experiences.
                    </p>
                  </div>
                  <div className={styles.themeBTestimonialsArrows}>
                    <button
                      onClick={() => scrollTestimonials('left')}
                      className={styles.themeBArrowButton}
                      aria-label="Previous Testimonial"
                    >
                      ←
                    </button>
                    <button
                      onClick={() => scrollTestimonials('right')}
                      className={styles.themeBArrowButton}
                      aria-label="Next Testimonial"
                    >
                      →
                    </button>
                  </div>
                </div>

                <div
                  ref={testimonialScrollRef}
                  className={styles.themeBTestimonialsTrack}
                >
                  {testimonialsData.map((testimonial) => (
                    <div key={testimonial.id} className={styles.themeBTestimonialCard}>
                      <div className={styles.themeBTestimonialBrandRow}>
                        <div className={styles.themeBTestimonialBrandIcon}>
                          <img 
                            src={testimonial.brandLogo} 
                            alt={testimonial.brandName} 
                            className={styles.themeBTestimonialBrandLogoImg} 
                          />
                        </div>
                        <span className={styles.themeBTestimonialBrandName}>{testimonial.brandName}</span>
                      </div>
                      <p className={styles.themeBTestimonialQuote}>“{testimonial.quote}”</p>
                      
                      <div className={styles.themeBTestimonialAuthorRow}>
                        <img 
                          src={testimonial.avatarUrl} 
                          alt={testimonial.name} 
                          className={styles.themeBTestimonialAvatar}
                        />
                        <div className={styles.themeBTestimonialAuthorInfo}>
                          <h3 className={styles.themeBTestimonialName}>{testimonial.name}</h3>
                          <span className={styles.themeBTestimonialRole}>{testimonial.role}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Horizontal divider */}
                <div className={styles.themeBDivider} />
              </section>
            </div>

            {/* FAQ Section */}
            <div className={styles.themeBFaqBand}>
              <section className={styles.themeBFaqSection}>
                <div className={styles.themeBFaqLeft}>
                  <h2 className={styles.themeBFaqTitle}>Frequently Asked Question</h2>
                  <p className={styles.themeBFaqSubtext}>
                    Here are some common questions along with their answers to help clear up any confusion.
                  </p>
                </div>

                <div className={styles.themeBFaqRight}>
                  {faqData.map((faq) => {
                    const isOpen = activeFaqId === faq.id;
                    return (
                      <motion.div 
                        layout
                        key={faq.id} 
                        onClick={() => setActiveFaqId(isOpen ? '' : faq.id)}
                        className={`${styles.themeBFaqAccordionItem} ${isOpen ? styles.themeBFaqAccordionItemOpen : ''}`}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className={styles.themeBFaqAccordionHeader}>
                          <h3 className={styles.themeBFaqQuestion}>{faq.question}</h3>
                          <motion.span 
                            className={styles.themeBFaqChevron}
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            ▼
                          </motion.span>
                        </div>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                              style={{ overflow: 'hidden' }}
                            >
                              <div className={styles.themeBFaqAccordionBody}>
                                <p className={styles.themeBFaqAnswer}>{faq.answer}</p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </section>
            </div>

            {/* Footer Section */}
            <div id="contact" className={styles.themeBFooterBand}>
              <footer className={styles.themeBFooter}>
 
                {/* Yellow Call to Action Box */}
                <div className={styles.themeBFooterBanner}>
                  {/* Dynamic Arches SVG Background */}
                  <svg className={styles.themeBFooterSvg} viewBox="0 0 1000 300" preserveAspectRatio="none">
                    <path d="M -50,150 C 250,-100 750,-100 1050,150" stroke="#0c0c0c" strokeWidth="60" fill="none" />
                    <path d="M -50,300 C 250,500 750,500 1050,300" stroke="#0c0c0c" strokeWidth="60" fill="none" />
                    <path d="M 650,-50 C 800,100 900,200 1100,350" stroke="#0c0c0c" strokeWidth="100" fill="none" />
                    <path d="M 350,-50 C 200,100 100,200 -100,350" stroke="#0c0c0c" strokeWidth="100" fill="none" />
                  </svg>
 
                  <div className={styles.themeBFooterBannerContent}>
                    <h2 className={styles.themeBFooterBannerTitle}>Let's Whip Up Something Fun!</h2>
                    <div className={styles.themeBFooterBannerButtons}>
                      <button onClick={() => setIsContactModalOpen(true)} className={styles.themeBFooterBtnPrimary}>Get Started Now</button>
                      <button onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })} className={styles.themeBFooterBtnSecondary}>Learn More</button>
                    </div>
                  </div>
                </div>
 
                {/* Footer Links Columns */}
                <div className={styles.themeBFooterGrid}>
                  <div className={styles.themeBFooterLeftCol}>
                    <h3 className={styles.themeBFooterLogoText}>{profileData.name}</h3>
                    <p className={styles.themeBFooterBio}>
                      Web & mobile developer helping startups and enterprises build scalable, high-performance digital products.
                    </p>
                    <a href={`mailto:${profileData.contactEmail}`} className={styles.themeBFooterEmailLink}>
                      {profileData.contactEmail}
                    </a>
                  </div>
 
                  <div className={styles.themeBFooterRightCol}>
                    <div className={styles.themeBFooterCol}>
                      <h4 className={styles.themeBFooterColTitle}>Quick Links</h4>
                      <ul className={styles.themeBFooterList}>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#work">Work</a></li>
                        <li><a href="#about">About</a></li>
                        <li><button onClick={() => setIsContactModalOpen(true)} className={styles.themeBFooterTextBtn}>Contact</button></li>
                      </ul>
                    </div>
 
                    <div className={styles.themeBFooterCol}>
                      <h4 className={styles.themeBFooterColTitle}>Stay Connected</h4>
                      <div className={styles.themeBFooterSocials}>
                        <a href="https://github.com/Sachin-264" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GithubIcon /></a>
                        <a href="https://www.linkedin.com/in/sachin-mishra-7b62a2229?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedinIcon /></a>
                        <a href="https://www.instagram.com/sachinmishra_264?igsh=MTFpbmhmcHlwY2dseA==" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><InstagramIcon /></a>
                      </div>
                    </div>
                  </div>
                </div>
 
                {/* Footer Bottom Row */}
                <div className={styles.themeBFooterBottom}>
                  <p className={styles.themeBFooterBio}>
                    I bring innovative ideas to life through my designs and collaborations.
                  </p>
                  <p className={styles.themeBFooterCopyright}>
                    Copyright © {profileData.name} 2026
                  </p>
                </div>
 
              </footer>
            </div>
 
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isContactModalOpen && (
          <motion.div
            className={styles.contactModalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setIsContactModalOpen(false);
              resetContactForm();
            }}
          >
            <motion.div
              className={styles.contactModalContainer}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className={styles.contactModalClose} 
                onClick={() => {
                  setIsContactModalOpen(false);
                  resetContactForm();
                }}
              >
                ✕
              </button>

              {isSubmitSuccess ? (
                <div className={styles.contactModalSuccess}>
                  <div className={styles.contactSuccessIcon}>✉</div>
                  <h3 className={styles.contactSuccessTitle}>Email App Opened</h3>
                  <p className={styles.contactSuccessMsg}>
                    Your pre-filled inquiry is ready! Please review the email drafts in your mail client (e.g. Gmail) and click <strong>"Send"</strong> to deliver it to <strong>msachinmishra8@gmail.com</strong>.
                  </p>
                  <button 
                    className={styles.contactModalSubmit} 
                    onClick={() => {
                      setIsContactModalOpen(false);
                      resetContactForm();
                    }}
                  >
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <div className={styles.contactModalHeader}>
                    <h3 className={styles.contactModalTitle}>Let's build something amazing</h3>
                    <p className={styles.contactModalSub}>
                      I can build, design, test, and maintain your app from deploying in App Store and Play Store for you. Tell me about your project below!
                    </p>
                  </div>

                  <form className={styles.contactModalForm} onSubmit={handleContactSubmit}>
                    <div className={styles.contactFormRow}>
                      <div className={styles.contactFormGroup}>
                        <label className={styles.contactFormLabel}>FULL NAME</label>
                        <input
                          type="text"
                          required
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="Your name"
                          className={styles.contactFormInput}
                        />
                      </div>
                      <div className={styles.contactFormGroup}>
                        <label className={styles.contactFormLabel}>EMAIL ADDRESS</label>
                        <input
                          type="email"
                          required
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="you@example.com"
                          className={styles.contactFormInput}
                        />
                      </div>
                    </div>

                    <div className={styles.contactFormGroup}>
                      <label className={styles.contactFormLabel}>PROJECT TYPE</label>
                      <div className={styles.contactChipGroup}>
                        {['Mobile App', 'Web App', 'UI/UX Design', 'Telemetry / IoT', 'Consultation'].map((type) => (
                          <button
                            key={type}
                            type="button"
                            className={`${styles.contactChip} ${contactProjectType === type ? styles.contactChipActive : ''}`}
                            onClick={() => setContactProjectType(type)}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className={styles.contactFormGroup}>
                      <label className={styles.contactFormLabel}>ESTIMATED BUDGET</label>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <select
                          value={contactCurrency}
                          onChange={(e) => setContactCurrency(e.target.value)}
                          className={styles.contactFormInput}
                          style={{ width: '100px', flex: '0 0 100px', cursor: 'pointer' }}
                        >
                          <option value="INR">INR (₹)</option>
                          <option value="USD">USD ($)</option>
                          <option value="EUR">EUR (€)</option>
                          <option value="GBP">GBP (£)</option>
                        </select>
                        <input
                          type="text"
                          required
                          value={contactBudget}
                          onChange={(e) => setContactBudget(e.target.value)}
                          placeholder="e.g. 50,000, 3,000, etc."
                          className={styles.contactFormInput}
                          style={{ flex: 1 }}
                        />
                      </div>
                    </div>

                    <div className={styles.contactFormGroup}>
                      <label className={styles.contactFormLabel}>PROJECT DETAILS</label>
                      <textarea
                        required
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        placeholder="Tell me a bit about what you want to build..."
                        rows={4}
                        className={styles.contactFormInput}
                        style={{ resize: 'none' }}
                      />
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting} 
                      className={styles.contactModalSubmit}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
 
export default PortfolioPage;
