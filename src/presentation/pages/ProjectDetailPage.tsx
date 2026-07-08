import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ExternalLink, Calendar, Code, Cpu, X, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';
import styles from '../styles/Portfolio.module.css';

interface Project {
  id: string;
  title: string;
  description: string;
  category?: string;
  tags: string[];
  imageUrl: string;
  gitUrl: string;
  logoUrl?: string;
  hardwareUrl?: string;
  screenshots?: string[];
  architectureTree?: string;
  colorTheme?: string;
  longDescription?: string;
  features?: string[];
  timeline?: string;
  projectUrl?: string;
  projectUrlLabel?: string;
  appStatus?: string;
  extraSectionTitle?: string;
  extraSectionSub?: string;
  extraSectionDesc?: string;
  extraSectionUrl?: string;
}

interface ProjectDetailPageProps {
  project: Project;
  theme: 'classic' | 'baskara';
  onBack: () => void;
}


export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ project, theme, onBack }) => {
  const isBaskara = theme === 'baskara';
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactProjectType, setContactProjectType] = useState(project.category || 'Mobile App');
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
    setContactProjectType(project.category || 'Mobile App');
    setContactCurrency('INR');
    setContactBudget('');
    setIsSubmitSuccess(false);
  };

  const galleryRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollLimits = () => {
    if (galleryRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = galleryRef.current;
      setCanScrollLeft(scrollLeft > 1);
      setCanScrollRight(scrollWidth - scrollLeft - clientWidth > 5);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      checkScrollLimits();
    }, 200);
    
    // Add window resize listener to update scroll arrows dynamically
    window.addEventListener('resize', checkScrollLimits);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkScrollLimits);
    };
  }, [project]);

  const scrollGallery = (direction: 'left' | 'right') => {
    if (galleryRef.current) {
      const container = galleryRef.current;
      const scrollAmount = 340;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(checkScrollLimits, 400);
    }
  };

  // Unused helper removed: scrollShowcase
  // Unused pageBg removed

  const contentCardBg = '#ffffff';
  const textMain = isBaskara ? '#0c0c0c' : 'var(--color-text-main)';
  const textMuted = isBaskara ? '#4b5563' : 'var(--color-text-muted)';
  const borderColor = isBaskara ? '#eaeaea' : 'var(--color-border)';
  const tagBg = isBaskara ? '#fef9c3' : '#f4f4f5';
  const tagColor = isBaskara ? '#0c0c0c' : '#000000';
  // Unused controlBtnBg removed
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`${isBaskara ? styles.projectDetailBaskaraBg : styles.projectDetailClassicBg} ${styles.projectDetailPageWrapper}`}
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
    >
      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.92)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
              cursor: 'zoom-out'
            }}
            onClick={() => setLightboxImage(null)}
          >
            <button 
              onClick={() => setLightboxImage(null)}
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: '50%',
                padding: '0.75rem',
                color: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={20} />
            </button>
            <motion.img 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              src={lightboxImage} 
              alt="Expanded Preview" 
              style={{ 
                maxWidth: '95vw', 
                maxHeight: '90vh', 
                objectFit: 'contain', 
                borderRadius: '1rem',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
              }} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inline styles for hiding scrollbar */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Fixed-Width Inner Container */}
      <div style={{ width: '100%', maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Detail Header */}
        <header 
          style={{ 
            display: 'flex',
            justifyContent: 'space-between', 
            alignItems: 'center',
            width: '100%', 
            borderBottom: 'none',
            paddingBottom: '0.25rem'
          }}
        >
          <button 
            onClick={onBack}
            className={styles.emailPill}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', border: `1px solid ${borderColor}`, padding: '0.4rem 1.1rem', borderRadius: '2rem', background: contentCardBg, color: textMain }}
          >
            <ArrowLeft size={14} />
            Back to Portfolio
          </button>
          
          <span className={styles.statusBadge} style={{ marginBottom: 0, border: `1px solid ${borderColor}`, background: contentCardBg, color: textMain }}>
            Project Details
          </span>
        </header>

        {/* Project Showcase Banner */}
        <motion.div 
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          style={{ 
            width: '100%', 
            borderRadius: '2rem', 
            overflow: 'hidden', 
            height: '380px',
            position: 'relative',
            background: 'transparent',
            cursor: 'zoom-in'
          }}
          onClick={() => setLightboxImage(project.imageUrl)}
        >
          <img 
            src={project.imageUrl} 
            alt={project.title} 
            style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
          />
        </motion.div>

        {/* Main Layout Grid */}
        <main className={styles.projectDetailGrid}>
          {/* Left Side: Media & Narrative */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Detailed Narrative */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {project.logoUrl && (
                  <img 
                    src={project.logoUrl} 
                    alt="Logo" 
                    style={{ height: '3.2rem', width: 'auto', objectFit: 'contain' }} 
                  />
                )}
                <h1 style={{ 
                  fontFamily: 'var(--font-display)', 
                  fontWeight: 900, 
                  fontSize: 'clamp(1.4rem, 3.2vw, 2rem)', 
                  margin: 0,
                  letterSpacing: '-0.03em',
                  color: textMain
                }}>
                  {project.title}
                </h1>
              </div>
              
              <p style={{ 
                fontFamily: 'var(--font-sans)', 
                fontSize: '1rem', 
                lineHeight: 1.55, 
                color: textMuted,
                margin: 0
              }}>
                {project.longDescription || project.description}
              </p>
              
              <hr style={{ border: 'none', borderTop: `1px solid ${borderColor}`, margin: '0.15rem 0' }} />
              
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem', margin: 0, color: textMain }}>
                Key Features & Implementation
              </h3>
              <ul style={{ 
                fontFamily: 'var(--font-sans)', 
                color: textMuted, 
                lineHeight: 1.65, 
                paddingLeft: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem',
                margin: 0
              }}>
                {project.features && project.features.length > 0 ? (
                  project.features.map((feat, idx) => <li key={idx}>{feat}</li>)
                ) : (
                  <>
                    <li>Designed and built a custom architectural scheme for modern performance.</li>
                    <li>Fully optimized client-side interactions with smooth 60fps animations.</li>
                    <li>Engineered using clean design tokens, ensuring responsiveness across desktop and mobile.</li>
                  </>
                )}
              </ul>

              {/* System Architecture Tree */}
              {project.architectureTree && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
                  <hr style={{ border: 'none', borderTop: `1px solid ${borderColor}`, margin: '0.15rem 0' }} />
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem', margin: 0, color: textMain }}>
                    System Architecture & Roles
                  </h3>
                  <pre style={{
                    background: '#18181b',
                    color: '#e4e4e7',
                    padding: '1.25rem',
                    borderRadius: '1.25rem',
                    fontFamily: 'monospace',
                    fontSize: '0.8rem',
                    lineHeight: 1.45,
                    overflowX: 'auto',
                    border: `1px solid ${borderColor}`,
                    margin: 0
                  }}>
                    {project.architectureTree}
                  </pre>
                </div>
              )}

              {/* Highlighted Hardware or Custom Extra Integration Section */}
              {(project.hardwareUrl || project.extraSectionUrl) && (
                <div 
                  style={{ 
                    background: 'linear-gradient(135deg, #1e1e1f, #0c0c0c)', 
                    border: '1px solid rgba(255,255,255,0.06)', 
                    borderRadius: '1.5rem', 
                    padding: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.25rem',
                    color: '#ffffff',
                    boxShadow: '0 15px 35px rgba(0,0,0,0.15)',
                    marginTop: '1rem',
                    flexWrap: 'wrap'
                  }}
                >
                  <div style={{ flex: '1 1 260px', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#facc15', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      <Cpu size={14} />
                      {project.extraSectionTitle || 'IoT Hardware Integration'}
                    </div>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, margin: 0, color: '#ffffff' }}>
                      {project.extraSectionSub || 'Physical GPS & Telemetry Interface'}
                    </h4>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#a1a1aa', lineHeight: 1.45 }}>
                      {project.extraSectionDesc || 'This project integrates directly with custom GPS tracking units. Real-time NMEA data coordinates are parsed through a custom TCP network socket server and rendered live for parent tracking interfaces.'}
                    </p>
                  </div>
                  <div 
                    style={{ 
                      flex: '0 0 120px', 
                      height: '120px', 
                      borderRadius: '1rem', 
                      overflow: 'hidden', 
                      background: '#27272a', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      cursor: 'zoom-in',
                      margin: '0 auto'
                    }}
                    onClick={() => setLightboxImage(project.extraSectionUrl || project.hardwareUrl!)}
                  >
                    <img 
                      src={project.extraSectionUrl || project.hardwareUrl} 
                      alt="Showcase Integration" 
                      style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain', borderRadius: '0.5rem' }} 
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side: Metadata Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div 
              style={{ 
                background: contentCardBg, 
                border: `1px solid ${borderColor}`, 
                borderRadius: '1.75rem', 
                padding: '1.75rem',
                boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem'
              }}
            >
              <div>
                <h4 style={{ textTransform: 'uppercase', fontSize: '0.65rem', fontWeight: 800, color: textMuted, letterSpacing: '0.1em', marginBottom: '0.4rem' }}>
                  Tech Stack
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {project.tags.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className={styles.projectTag}
                      style={{ background: tagBg, padding: '0.4rem 0.9rem', fontSize: '0.75rem', fontWeight: 800, color: tagColor, border: `1px solid ${borderColor}` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div className={styles.expLogoCircle} style={{ width: '2.25rem', height: '2.25rem', background: tagBg, border: `1px solid ${borderColor}`, color: textMain }}>
                  <Calendar size={14} />
                </div>
                <div>
                  <h5 style={{ margin: 0, fontSize: '0.75rem', color: textMuted }}>Project Timeline</h5>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: '0.85rem', color: textMain }}>{project.timeline || '2024 - Present'}</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div className={styles.expLogoCircle} style={{ width: '2.25rem', height: '2.25rem', background: tagBg, border: `1px solid ${borderColor}`, color: textMain }}>
                  <Code size={14} />
                </div>
                <div>
                  <h5 style={{ margin: 0, fontSize: '0.75rem', color: textMuted }}>Source Code / Year</h5>
                  <a 
                    href="#" 
                    onClick={(e) => e.preventDefault()}
                    style={{ margin: 0, fontWeight: 700, fontSize: '0.85rem', color: 'var(--color-accent-blue)', textDecoration: 'none' }}
                  >
                    {project.gitUrl}
                  </a>
                </div>
              </div>

              {project.appStatus && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <div className={styles.expLogoCircle} style={{ width: '2.25rem', height: '2.25rem', background: tagBg, border: `1px solid ${borderColor}`, color: textMain }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                      <line x1="12" y1="18" x2="12.01" y2="18"></line>
                    </svg>
                  </div>
                  <div>
                    <h5 style={{ margin: 0, fontSize: '0.75rem', color: textMuted }}>App Status</h5>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: '0.85rem', color: '#10b981' }}>{project.appStatus}</p>
                  </div>
                </div>
              )}

              {project.projectUrl && project.projectUrl !== '#' ? (
                <a 
                  href={project.projectUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.heroCta}
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: '0.5rem', 
                    width: '100%', 
                    textAlign: 'center', 
                    fontSize: '0.85rem', 
                    padding: '0.7rem',
                    fontWeight: 800,
                    background: '#0c0c0c',
                    color: '#ffffff',
                    borderRadius: '1rem',
                    border: 'none',
                    textDecoration: 'none'
                  }}
                >
                  {project.projectUrl.includes('play.google.com') ? (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M5,3.26C4.77,3.49 4.64,3.89 4.64,4.42V19.58C4.64,20.11 4.77,20.51 5,20.74L5.07,20.81L13.7,12.18V11.82L5.07,3.19L5,3.26M16.92,15.4L13.7,12.18V11.82L16.92,8.6L16.99,8.64L20.8,10.81C21.89,11.43 21.89,12.57 20.8,13.19L16.99,15.36L16.92,15.4M13.7,11.82L5.07,3.19C5.51,2.75 6.27,2.75 7.15,3.26L16.92,8.6L13.7,11.82M13.7,12.18L16.92,15.4L7.15,20.74C6.27,21.25 5.51,21.25 5.07,20.81L13.7,12.18Z" />
                      </svg>
                      {project.projectUrlLabel || 'Google Play Store'}
                    </>
                  ) : (
                    <>
                      <ExternalLink size={14} />
                      {project.projectUrlLabel || 'Visit Live Console'}
                    </>
                  )}
                </a>
              ) : (
                project.appStatus && (
                  <div 
                    style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      gap: '0.5rem', 
                      width: '100%', 
                      textAlign: 'center', 
                      fontSize: '0.85rem', 
                      padding: '0.7rem',
                      fontWeight: 800,
                      background: tagBg,
                      color: textMuted,
                      borderRadius: '1rem',
                      border: `1px solid ${borderColor}`,
                    }}
                  >
                    {project.appStatus}
                  </div>
                )
              )}
            </div>
          </div>
        </main>

        {/* Screenshots Library / Gallery */}
        {project.screenshots && project.screenshots.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem', width: '100%' }}>
            <hr style={{ border: 'none', borderTop: `1px solid ${borderColor}`, marginBottom: '0.25rem' }} />
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem', margin: 0, color: textMain }}>
              App Screens Library
            </h3>
            
            <div style={{ position: 'relative', width: '100%' }}>
              {/* Left Arrow Button */}
              {canScrollLeft && (
                <button 
                  onClick={() => scrollGallery('left')}
                  style={{
                    position: 'absolute',
                    left: '-0.5rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(0,0,0,0.7)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '2rem',
                    height: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    cursor: 'pointer',
                    zIndex: 10,
                    boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
                  }}
                >
                  <ChevronLeft size={16} />
                </button>
              )}

              {/* Scroll Container */}
              <div 
                ref={galleryRef}
                onScroll={checkScrollLimits}
                style={{ 
                  display: 'flex', 
                  gap: '1rem', 
                  overflowX: 'auto', 
                  paddingBottom: '1rem',
                  scrollSnapType: 'x mandatory'
                }}
                className="no-scrollbar"
              >
                {project.screenshots.map((screenUrl, idx) => (
                  <div 
                    key={idx}
                    style={{
                      flex: '0 0 160px',
                      width: '160px',
                      height: '320px',
                      borderRadius: '1rem',
                      overflow: 'hidden',
                      border: `1px solid ${borderColor}`,
                      background: '#18181b',
                      cursor: 'zoom-in',
                      scrollSnapAlign: 'start',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onClick={() => setLightboxImage(screenUrl)}
                  >
                    <img 
                      src={screenUrl} 
                      alt={`Screenshot ${idx + 1}`} 
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                    />
                  </div>
                ))}
              </div>

              {/* Right Arrow Button */}
              {canScrollRight && (
                <button 
                  onClick={() => scrollGallery('right')}
                  style={{
                    position: 'absolute',
                    right: '-0.5rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(0,0,0,0.7)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '2rem',
                    height: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    cursor: 'pointer',
                    zIndex: 10,
                    boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
                  }}
                >
                  <ChevronRight size={16} />
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Floating Talk Button */}
      <motion.button
        onClick={() => setIsContactDialogOpen(true)}
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        style={{
          position: 'fixed',
          bottom: '2.5rem',
          right: '2.5rem',
          background: '#09090b',
          color: '#ffffff',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '9999px',
          padding: '0.8rem 1.6rem',
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '0.9rem',
          cursor: 'pointer',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          zIndex: 999
        }}
      >
        <MessageSquare size={16} />
        Let's Talk
      </motion.button>

      {/* Contact Form Dialog Modal */}
      <AnimatePresence>
        {isContactDialogOpen && (
          <motion.div
            className={styles.contactModalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setIsContactDialogOpen(false);
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
                  setIsContactDialogOpen(false);
                  resetContactForm();
                }}
              >
                ✕
              </button>

              {isSubmitSuccess ? (
                <div className={styles.contactModalSuccess}>
                  <div className={styles.contactSuccessIcon}>✓</div>
                  <h3 className={styles.contactSuccessTitle}>Message Sent!</h3>
                  <p className={styles.contactSuccessMsg}>
                    Thank you for reaching out, {contactName || 'there'}. I will review your message and get back to you shortly!
                  </p>
                  <button 
                    className={styles.contactModalSubmit} 
                    onClick={() => {
                      setIsContactDialogOpen(false);
                      resetContactForm();
                    }}
                  >
                    Close
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
                        placeholder={`Describe your project requirements (e.g., custom features based on ${project.title})...`}
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
    </motion.div>
  );
};
