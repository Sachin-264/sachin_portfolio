import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import styles from '../styles/Portfolio.module.css';

interface AboutPageProps {
  theme: 'classic' | 'baskara';
  onBack: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ theme, onBack }) => {
  const isBaskara = theme === 'baskara';
  const pageBg = isBaskara ? '#fefdf0' : '#f4f4f5';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={isBaskara ? styles.themeBWrapper : styles.pageWrapper}
      style={{ background: pageBg, minHeight: '100vh', gap: '4rem' }}
    >
      {/* Header */}
      <header className={isBaskara ? styles.themeBHeader : styles.header} style={{ justifyContent: 'space-between', width: '100%' }}>
        <button 
          onClick={onBack}
          className={styles.emailPill}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', border: '1px solid var(--color-border)' }}
        >
          <ArrowLeft size={16} />
          Back to Portfolio
        </button>
        
        <span className={styles.statusBadge} style={{ marginBottom: 0 }}>
          About Me
        </span>
      </header>

      {/* Main Grid Layout from Screenshot */}
      <main style={{ 
        display: 'grid', 
        gridTemplateColumns: '1.1fr 1.3fr', 
        gap: '4rem', 
        width: '100%', 
        marginTop: '1rem',
        alignItems: 'flex-start'
      }} className={styles.section}>
        
        {/* Left Column: Heading */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <span style={{ 
            fontFamily: 'var(--font-sans)', 
            fontSize: '0.9rem', 
            fontWeight: 600, 
            color: '#000000',
            opacity: 0.6
          }}>
            (About Me)
          </span>
          <h1 style={{ 
            fontFamily: 'var(--font-display)', 
            fontWeight: 800, 
            fontSize: 'clamp(2rem, 4.5vw, 3.75rem)', 
            lineHeight: 1.1,
            color: '#000000',
            margin: 0,
            letterSpacing: '-0.03em'
          }}>
            A Deep Dive into My Life's Experiences and Lessons Learned
          </h1>
        </div>

        {/* Right Column: Image and Paragraphs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>


          {/* Description paragraphs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p style={{ 
              fontFamily: 'var(--font-sans)', 
              fontSize: '1.05rem', 
              lineHeight: 1.7, 
              color: '#3f3f46',
              fontWeight: 400,
              margin: 0
            }}>
              Hello, I'm Sachin, a passionate developer based in India. With a keen eye for aesthetics and a love for creativity, I strive to bring innovative ideas to life through my designs. My design journey is filled with exciting projects and collaborations that inspire me. Over the years, I have had the privilege of working on a diverse range of projects, from branding for local businesses to creating user-friendly interfaces for tech startups.
            </p>
            
            <p style={{ 
              fontFamily: 'var(--font-sans)', 
              fontSize: '1.05rem', 
              lineHeight: 1.7, 
              color: '#3f3f46',
              fontWeight: 400,
              margin: 0
            }}>
              Each experience has not only honed my skills but also deepened my understanding of the impact design can have on people's lives. I believe that good design is not just about making things look pretty; it's about solving problems and enhancing user experiences. I am always eager to learn and grow, continuously seeking out new challenges that push the boundaries of my creativity.
            </p>
          </div>
        </div>
      </main>
    </motion.div>
  );
};
