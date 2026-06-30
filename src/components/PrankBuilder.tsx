import React, { useState, useEffect } from 'react';
import { PrankConfig, PrankType } from '../types/prank';
import { PrankPreview } from './PrankPreview';
import { generateShareUrl } from '../utils/url';
import { 
  Laptop, AlertOctagon, Zap, Loader2, Play, 
  Copy, Check, Share2, ArrowLeft, 
  Settings, User, MessageSquare 
} from 'lucide-react';

interface PrankBuilderProps {
  initialConfig: PrankConfig;
  onNavigateHome: () => void;
  onLaunchPrank: (config: PrankConfig) => void;
}

export const PrankBuilder: React.FC<PrankBuilderProps> = ({ 
  initialConfig, 
  onNavigateHome, 
  onLaunchPrank 
}) => {
  const [config, setConfig] = useState<PrankConfig>(initialConfig);
  const [shareUrl, setShareUrl] = useState('');
  const [copied, setCopied] = useState(false);

  // Automatically update the config if initialConfig changes (e.g. from template click)
  useEffect(() => {
    setConfig(initialConfig);
    setShareUrl('');
  }, [initialConfig]);

  // Adjust theme list based on selected prankType
  const getThemeOptions = (type: PrankType) => {
    switch (type) {
      case 'fake-update':
        return [
          { value: 'windows-11', label: 'Windows 11 (Moderno)' },
          { value: 'windows-10', label: 'Windows 10 (Clásico)' },
          { value: 'macos', label: 'macOS (Manzana)' },
          { value: 'android', label: 'Android Update' }
        ];
      case 'fake-error':
        return [
          { value: 'bsod', label: 'Pantalla Azul (Windows BSOD)' },
          { value: 'macos-panic', label: 'Mac Kernel Panic' },
          { value: 'critical-warning', label: 'Alerta Roja (Virus Chrome)' },
          { value: 'retro-alert', label: 'Error Retro (Windows 98)' }
        ];
      case 'glitch':
        return [
          { value: 'cyberpunk', label: 'Cyberpunk Terminal' },
          { value: 'matrix', label: 'Matrix Digital' }
        ];
      case 'loading':
        return [
          { value: 'futuristic', label: 'Cargador Futurista' },
          { value: 'windows-98', label: 'Instalador Windows 98' },
          { value: 'downloading-ram', label: 'Descarga RAM' }
        ];
      default:
        return [{ value: 'default', label: 'Por Defecto' }];
    }
  };

  const handleTypeChange = (type: PrankType) => {
    const defaultThemes = {
      'fake-update': 'windows-11',
      'fake-error': 'bsod',
      'glitch': 'cyberpunk',
      'loading': 'futuristic',
      'surprise-reveal': 'meme'
    };

    const defaultTitles = {
      'fake-update': 'Instalando actualizaciones del sistema',
      'fake-error': 'CRITICAL_PROCESS_DIED',
      'glitch': 'ALERTA DE SEGURIDAD: INTRUSIÓN',
      'loading': 'Descargando 64GB DDR5 RAM Gratis',
      'surprise-reveal': '¡Caíste en la broma!'
    };

    const defaultMessages = {
      'fake-update': 'No apagues el equipo. Esto podría tardar unos minutos.',
      'fake-error': 'Se ha producido un problema en su dispositivo y necesita reiniciarse.',
      'glitch': 'Infiltrando cortafuegos principales... Descargando memoria caché.',
      'loading': 'Asignando transistores en la nube molecular...',
      'surprise-reveal': '¡Fue todo una broma! Tu dispositivo está perfectamente bien.'
    };

    setConfig(prev => ({
      ...prev,
      prankType: type,
      theme: defaultThemes[type] || 'default',
      title: defaultTitles[type] || '',
      message: defaultMessages[type] || ''
    }));
    
    // Clear generated link because settings changed
    setShareUrl('');
  };

  const handleInputChange = (field: keyof PrankConfig, value: any) => {
    setConfig(prev => ({
      ...prev,
      [field]: value
    }));
    setShareUrl('');
  };

  const handleGenerateLink = () => {
    const url = generateShareUrl(config);
    setShareUrl(url);
    setCopied(false);
  };

  const handleCopyLink = () => {
    if (!shareUrl) return;
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Error copying link:', err);
      });
  };

  const categories = [
    { type: 'fake-update' as PrankType, label: 'Actualización', icon: Laptop },
    { type: 'fake-error' as PrankType, label: 'Error de Sistema', icon: AlertOctagon },
    { type: 'glitch' as PrankType, label: 'Glitch / Hacker', icon: Zap },
    { type: 'loading' as PrankType, label: 'Carga Infinita', icon: Loader2 }
  ];

  return (
    <div
      style={{
        padding: '2rem 1.5rem',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      {/* Top action row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <button
          onClick={onNavigateHome}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: 500,
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          <ArrowLeft size={16} />
          <span>Volver al Inicio</span>
        </button>
        
        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Settings size={16} className="text-glow-cyan" style={{ color: 'var(--accent)' }} />
          Configurador de Bromas
        </h3>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '2.5rem',
        }}
        className="builder-grid"
      >
        {/* Responsive CSS helper */}
        <style>{`
          .builder-grid {
            grid-template-columns: 1fr;
          }
          @media (min-width: 1024px) {
            .builder-grid {
              grid-template-columns: 1.2fr 1fr;
            }
          }
        `}</style>

        {/* Left Column: Form Settings */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* 1. Category Selector */}
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: '#fff' }}>
              1. Seleccioná el Tipo de Broma
            </h4>
            
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '0.75rem',
              }}
            >
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = config.prankType === cat.type;
                return (
                  <button
                    key={cat.type}
                    onClick={() => handleTypeChange(cat.type)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '1rem 0.5rem',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      border: isActive ? '1px solid var(--primary)' : '1px solid var(--border)',
                      background: isActive ? 'rgba(139, 92, 246, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                      color: isActive ? 'var(--text-main)' : 'var(--text-muted)',
                      fontWeight: isActive ? 600 : 500,
                      fontSize: '0.85rem',
                      transition: 'all 0.2s ease',
                      boxShadow: isActive ? '0 0 15px rgba(139, 92, 246, 0.15)' : 'none',
                    }}
                  >
                    <Icon size={20} style={{ color: isActive ? 'var(--primary)' : 'inherit' }} />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Custom Parameters */}
          <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>
              2. Personalizá la Apariencia
            </h4>

            {/* Theme Dropdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                Tema Visual
              </label>
              <select
                value={config.theme}
                onChange={(e) => handleInputChange('theme', e.target.value)}
                style={{
                  padding: '0.75rem',
                  borderRadius: '8px',
                  backgroundColor: '#111320',
                  color: '#ffffff',
                  border: '1px solid var(--border)',
                  fontSize: '0.875rem',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                {getThemeOptions(config.prankType).map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Title Input */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                Título Principal
              </label>
              <input
                type="text"
                value={config.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Escribe el encabezado principal..."
                style={{
                  padding: '0.75rem',
                  borderRadius: '8px',
                  backgroundColor: '#111320',
                  color: '#ffffff',
                  border: '1px solid var(--border)',
                  fontSize: '0.875rem',
                  outline: 'none',
                }}
              />
            </div>

            {/* Message Input */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                Mensaje de Soporte / Subtítulo
              </label>
              <textarea
                value={config.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                placeholder="Escribe detalles del error o indicaciones..."
                rows={3}
                style={{
                  padding: '0.75rem',
                  borderRadius: '8px',
                  backgroundColor: '#111320',
                  color: '#ffffff',
                  border: '1px solid var(--border)',
                  fontSize: '0.875rem',
                  outline: 'none',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                }}
              />
            </div>

            {/* Intensity Slider */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                <span>Intensidad / Velocidad</span>
                <span style={{ color: 'var(--accent)' }}>Nivel {config.intensity}</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={config.intensity}
                onChange={(e) => handleInputChange('intensity', parseInt(e.target.value))}
                style={{
                  width: '100%',
                  accentColor: 'var(--primary)',
                  cursor: 'pointer',
                  height: '6px',
                  borderRadius: '3px',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                }}
              />
            </div>

            {/* Duration Slider */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                <span>Duración de la Simulación</span>
                <span style={{ color: 'var(--accent)' }}>
                  {config.duration === 0 ? 'Infinito ♾️' : `${config.duration} segundos`}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="60"
                step="5"
                value={config.duration}
                onChange={(e) => handleInputChange('duration', parseInt(e.target.value))}
                style={{
                  width: '100%',
                  accentColor: 'var(--primary)',
                  cursor: 'pointer',
                  height: '6px',
                  borderRadius: '3px',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                }}
              />
            </div>

            {/* Fullscreen Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#fff' }}>Habilitar Pantalla Completa</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Se solicita permiso fullscreen al interactuar.</span>
              </div>
              <input
                type="checkbox"
                checked={config.fullscreen}
                onChange={(e) => handleInputChange('fullscreen', e.target.checked)}
                style={{
                  width: '18px',
                  height: '18px',
                  accentColor: 'var(--primary)',
                  cursor: 'pointer',
                }}
              />
            </div>
          </div>

          {/* 3. Final Surprise Settings */}
          <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>
                3. Revelación Final Sorpresa
              </h4>
              <input
                type="checkbox"
                checked={config.showReveal}
                onChange={(e) => handleInputChange('showReveal', e.target.checked)}
                style={{
                  width: '18px',
                  height: '18px',
                  accentColor: 'var(--primary)',
                  cursor: 'pointer',
                }}
              />
            </div>

            {config.showReveal && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', animation: 'fadeIn 0.2s ease-out' }}>
                
                {/* Target Name Input */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <User size={12} />
                    Nombre de la Víctima (Opcional)
                  </label>
                  <input
                    type="text"
                    value={config.targetName}
                    onChange={(e) => handleInputChange('targetName', e.target.value)}
                    placeholder="Ej: Ramiro"
                    style={{
                      padding: '0.75rem',
                      borderRadius: '8px',
                      backgroundColor: '#111320',
                      color: '#ffffff',
                      border: '1px solid var(--border)',
                      fontSize: '0.875rem',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Reveal Text Input */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <MessageSquare size={12} />
                    Texto del Remate de Broma
                  </label>
                  <input
                    type="text"
                    value={config.revealText}
                    onChange={(e) => handleInputChange('revealText', e.target.value)}
                    placeholder="Ej: ¡Caíste en la broma! 😂"
                    style={{
                      padding: '0.75rem',
                      borderRadius: '8px',
                      backgroundColor: '#111320',
                      color: '#ffffff',
                      border: '1px solid var(--border)',
                      fontSize: '0.875rem',
                      outline: 'none',
                    }}
                  />
                </div>
                
                {config.duration === 0 && (
                  <div style={{ fontSize: '0.75rem', color: 'var(--warning)', background: 'rgba(245,158,11,0.08)', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid rgba(245,158,11,0.2)' }}>
                    ⚠️ Nota: Tienes duración "Infinito". Para ver el remate sorpresa, la simulación requiere una duración establecida (ej: 15 segs) o hacer clic en "Aceptar" en la alerta retro.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action trigger row */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            <button
              onClick={() => onLaunchPrank(config)}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '1rem',
                borderRadius: '12px',
                backgroundColor: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--border)',
                color: '#fff',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)')}
            >
              <Play size={16} />
              <span>Probar Pantalla Completa</span>
            </button>

            <button
              onClick={handleGenerateLink}
              style={{
                flex: 1.2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '1rem',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, var(--primary), var(--primary-hover))',
                border: 'none',
                color: '#fff',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 15px var(--primary-glow)',
                transition: 'transform 0.1s ease',
              }}
              onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.97)')}
              onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <Share2 size={16} />
              <span>Generar Link Compartible</span>
            </button>
          </div>

          {/* 4. Link Result Box */}
          {shareUrl && (
            <div 
              className="glass-card bg-glow-purple" 
              style={{ 
                padding: '1.5rem', 
                border: '1px solid var(--border-active)',
                animation: 'fadeIn 0.25s ease-out'
              }}
            >
              <h5 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.75rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Share2 size={14} style={{ color: 'var(--accent)' }} />
                ¡Tu Broma está Lista!
              </h5>
              
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                Copia el enlace de abajo y envíaselo a tu amigo. Cuando lo abra, la simulación iniciará directamente.
              </p>

              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input
                  type="text"
                  readOnly
                  value={shareUrl}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    borderRadius: '8px',
                    backgroundColor: '#0a0b10',
                    color: 'var(--accent)',
                    border: '1px solid var(--border)',
                    fontSize: '0.8rem',
                    fontFamily: 'monospace',
                    outline: 'none',
                  }}
                />
                
                <button
                  onClick={handleCopyLink}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    padding: '0.75rem 1.25rem',
                    borderRadius: '8px',
                    backgroundColor: copied ? 'var(--success)' : 'rgba(255, 255, 255, 0.04)',
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    border: copied ? 'none' : '1px solid var(--border)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    minWidth: '110px',
                  }}
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copied ? 'Copiado' : 'Copiar'}</span>
                </button>
              </div>

              {/* WhatsApp Quick Link */}
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent('Che, mirá esto que me acaba de aparecer en la pantalla... 😱 ' + shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.78rem',
                  color: '#25D366',
                  marginTop: '0.85rem',
                  textDecoration: 'none',
                  fontWeight: 600,
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                💬 Compartir por WhatsApp
              </a>
            </div>
          )}

        </div>

        {/* Right Column: Realtime Preview */}
        <div style={{ position: 'relative' }}>
          <PrankPreview config={config} />
        </div>

      </div>
    </div>
  );
};
