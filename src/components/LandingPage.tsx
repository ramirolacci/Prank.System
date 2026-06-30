import React from 'react';
import { PRANK_TEMPLATES, PrankTemplate } from '../utils/templates';
import { Sparkles, Shield, ChevronRight } from 'lucide-react';

interface LandingPageProps {
  onCreatePrank: (config?: any) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onCreatePrank }) => {
  return (
    <div
      style={{
        padding: '3rem 1.5rem',
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '4rem',
        zIndex: 5,
        position: 'relative',
      }}
    >
      {/* Background glow effects */}
      <div
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          background: 'rgba(139, 92, 246, 0.15)',
          filter: 'blur(120px)',
          borderRadius: '50%',
          top: '-10%',
          left: '10%',
          pointerEvents: 'none',
        }}
      ></div>
      <div
        style={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          background: 'rgba(6, 182, 212, 0.15)',
          filter: 'blur(120px)',
          borderRadius: '50%',
          bottom: '20%',
          right: '5%',
          pointerEvents: 'none',
        }}
      ></div>

      {/* Hero Section */}
      <section style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto', padding: '2rem 0 1rem 0' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1rem',
            borderRadius: '999px',
            background: 'rgba(139, 92, 246, 0.1)',
            border: '1px solid rgba(139, 92, 246, 0.25)',
            color: 'var(--accent)',
            fontSize: '0.8rem',
            fontWeight: 600,
            marginBottom: '1.5rem',
          }}
        >
          <Sparkles size={14} />
          <span>ESTUDIO CREADOR DE BROMAS TECNOLÓGICAS</span>
        </div>
        
        <h2
          style={{
            fontSize: '3.25rem',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-1px',
            marginBottom: '1.5rem',
            background: 'linear-gradient(to right, #ffffff, #e5e7eb, #9ca3af)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Diseñá Bromas Visuales <br />
          <span style={{ background: 'linear-gradient(to right, var(--primary), var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Inofensivas e Instantáneas
          </span>
        </h2>
        
        <p
          style={{
            fontSize: '1.15rem',
            color: 'var(--text-muted)',
            lineHeight: 1.6,
            marginBottom: '2.5rem',
          }}
        >
          Creá simulaciones realistas de pantallas de error, actualizaciones eternas del sistema y glitches cibernéticos. Generá un link seguro y compartilo con tus amigos.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => onCreatePrank()}
            style={{
              padding: '0.85rem 2rem',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, var(--primary), var(--primary-hover))',
              color: '#ffffff',
              fontWeight: 600,
              fontSize: '1rem',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 20px var(--primary-glow)',
              transition: 'transform 0.1s ease',
            }}
            onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.97)')}
            onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Comenzar desde cero
          </button>
          
          <a
            href="#templates"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.85rem 2.0rem',
              borderRadius: '12px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              color: '#ffffff',
              fontWeight: 500,
              fontSize: '1rem',
              border: '1px solid var(--border)',
              cursor: 'pointer',
              textDecoration: 'none',
              transition: 'background-color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)')}
          >
            <span>Ver Plantillas</span>
            <ChevronRight size={16} />
          </a>
        </div>
      </section>

      {/* Security Banner */}
      <section
        className="glass-card"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          padding: '1.5rem 2rem',
          maxWidth: '850px',
          margin: '0 auto',
          border: '1px solid rgba(6, 182, 212, 0.15)',
        }}
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
            Compromiso de Seguridad Inofensiva
          </h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            La app no recopila credenciales, no realiza phishing ni altera el sistema real. Todo ocurre estrictamente de forma visual en la ventana del navegador. Todas las pantallas de broma contienen un botón para salir inmediatamente.
          </p>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Elegí una Plantilla Rápida
          </h3>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
            Hacé clic en cualquier plantilla para cargarla en el editor y personalizarla.
          </p>
        </div>

        {/* Template Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {PRANK_TEMPLATES.map((template: PrankTemplate) => (
            <div
              key={template.id}
              className="glass-card"
              onClick={() => onCreatePrank(template.config)}
              style={{
                padding: '1.75rem',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Top Row with icon and launch directly button */}
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
                  Personalizar
                  <ChevronRight size={12} />
                </span>
              </div>

              <div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.4rem' }}>
                  {template.name}
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {template.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
