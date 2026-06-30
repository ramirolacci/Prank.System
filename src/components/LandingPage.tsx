import React from 'react';
import { motion } from 'framer-motion';
import { PRANK_TEMPLATES, PrankTemplate } from '../utils/templates';
import { getRandomTemplateConfig } from '../utils/examples';
import { HistoryItem } from '../hooks/useLocalStorage';
import { SavedPrankList } from './builder/LocalHistoryPanel';
import { PrankConfig } from '../types/prank';
import { Sparkles, Shield, ChevronRight, Shuffle, History } from 'lucide-react';

interface LandingPageProps {
  onCreatePrank: (config?: PrankConfig) => void;
  recentHistory?: HistoryItem[];
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onCreatePrank,
  recentHistory = [],
}) => {
  const handleRandomPrank = () => {
    onCreatePrank(getRandomTemplateConfig());
  };

  return (
    <div className="landing-container" style={{ zIndex: 5, position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          width: 'min(400px, 80vw)',
          height: 'min(400px, 80vw)',
          background: 'rgba(139, 92, 246, 0.15)',
          filter: 'blur(120px)',
          borderRadius: '50%',
          top: '-10%',
          left: '10%',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 'min(300px, 60vw)',
          height: 'min(300px, 60vw)',
          background: 'rgba(6, 182, 212, 0.15)',
          filter: 'blur(120px)',
          borderRadius: '50%',
          bottom: '20%',
          right: '5%',
          pointerEvents: 'none',
        }}
      />

      <section style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto', padding: '1rem 0' }}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1rem',
            borderRadius: '999px',
            background: 'rgba(139, 92, 246, 0.1)',
            border: '1px solid rgba(139, 92, 246, 0.25)',
            color: 'var(--accent)',
            fontSize: '0.75rem',
            fontWeight: 600,
            marginBottom: '1.25rem',
          }}
        >
          <Sparkles size={14} />
          <span>Bromas visuales · 100% inofensivas</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="landing-hero-title"
          style={{
            marginBottom: '1.25rem',
            background: 'linear-gradient(to right, #ffffff, #e5e7eb, #9ca3af)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Creá bromas que{' '}
          <span
            style={{
              background: 'linear-gradient(to right, var(--primary), var(--accent))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            se comparten solas
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)',
            color: 'var(--text-muted)',
            lineHeight: 1.6,
            marginBottom: '2rem',
          }}
        >
          Simulaciones de pantallas de error, actualizaciones eternas y glitches. Generá un link,
          mandalo por WhatsApp y dejá que la magia pase — siempre con botón de salida visible.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}
        >
          <button type="button" onClick={() => onCreatePrank()} className="btn-primary">
            Crear broma nueva
          </button>
          <button type="button" onClick={handleRandomPrank} className="btn-secondary">
            <Shuffle size={16} />
            Broma aleatoria
          </button>
          <a href="#templates" className="btn-secondary" style={{ textDecoration: 'none' }}>
            Ver plantillas
            <ChevronRight size={16} />
          </a>
        </motion.div>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card security-banner"
        style={{ maxWidth: '850px', margin: '0 auto', border: '1px solid rgba(6, 182, 212, 0.15)' }}
      >
        <div
          style={{
            background: 'rgba(6, 182, 212, 0.1)',
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            border: '1px solid rgba(6, 182, 212, 0.2)',
          }}
        >
          <Shield size={24} style={{ color: 'var(--accent)' }} />
        </div>
        <div style={{ textAlign: 'left' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.25rem' }}>
            Solo simulación visual
          </h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            Sin phishing, sin robo de datos, sin alterar tu sistema. Todo ocurre en el navegador y
            siempre podés salir con un toque.
          </p>
        </div>
      </motion.section>

      {recentHistory.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="glass-card"
          style={{ padding: '1.5rem', maxWidth: '850px', margin: '0 auto', width: '100%' }}
        >
          <h3
            style={{
              fontSize: '1.25rem',
              fontWeight: 800,
              marginBottom: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <History size={20} style={{ color: 'var(--accent)' }} />
            Tus bromas recientes
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Guardadas en este dispositivo. Tocá para editarlas.
          </p>
          <SavedPrankList
            items={recentHistory}
            onLoad={(item) => onCreatePrank(item.config)}
            onDuplicate={() => {}}
            onDelete={() => {}}
            compact
            readOnly
          />
        </motion.section>
      )}

      <section id="templates" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: 'clamp(1.35rem, 4vw, 1.75rem)', fontWeight: 800, marginBottom: '0.5rem' }}>
            Plantillas listas para usar
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Elegí una, personalizala y compartila en segundos.
          </p>
        </div>

        <div className="template-grid">
          {PRANK_TEMPLATES.map((template: PrankTemplate, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index }}
              className="glass-card"
              onClick={() => onCreatePrank(template.config)}
              style={{
                padding: '1.5rem',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                overflow: 'hidden',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '2rem' }}>{template.icon}</span>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'var(--accent)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.2rem',
                    background: 'rgba(6, 182, 212, 0.08)',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '6px',
                  }}
                >
                  Usar
                  <ChevronRight size={12} />
                </span>
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.4rem' }}>
                  {template.name}
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {template.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};
