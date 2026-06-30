import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { PrankConfig, PrankType } from '../types/prank';
import { ResponsivePreviewWrapper } from './builder/ResponsivePreviewWrapper';
import { SavedPranksPanel } from './history/SavedPranksPanel';
import { ShareCard } from './builder/ShareCard';
import { ThemePicker } from './builder/ThemePicker';
import { AppThemePicker } from './builder/AppThemePicker';
import { IntensitySlider } from './builder/IntensitySlider';
import { FullscreenToggle } from './builder/FullscreenToggle';
import { generateShareUrl } from '../utils/url';
import { getDefaultThemeForType } from '../utils/themes';
import { getExampleConfig } from '../utils/examples';
import { usePrankStorage } from '../context/LocalStorageContext';
import { HistoryItem } from '../hooks/useLocalStorage';
import {
  Laptop,
  AlertOctagon,
  Zap,
  Loader2,
  Play,
  ArrowLeft,
  Settings,
  User,
  MessageSquare,
  Sparkles,
  Bookmark,
} from 'lucide-react';

interface PrankBuilderProps {
  initialConfig: PrankConfig;
  preferDraft?: boolean;
  onNavigateHome: () => void;
  onLaunchPrank: (config: PrankConfig) => void;
  onOpenSocialPreview?: (config: PrankConfig) => void;
  onShareUrlChange?: (url: string) => void;
}

export const PrankBuilder: React.FC<PrankBuilderProps> = ({
  initialConfig,
  preferDraft = false,
  onNavigateHome,
  onLaunchPrank,
  onOpenSocialPreview,
  onShareUrlChange,
}) => {
  const [config, setConfig] = useState<PrankConfig>(initialConfig);
  const [shareUrl, setShareUrl] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const {
    history,
    draft,
    saveToHistory,
    updateHistoryItem,
    duplicateFromHistory,
    deleteFromHistory,
    clearHistory,
    saveDraft,
  } = usePrankStorage();

  useEffect(() => {
    setConfig(initialConfig);
    setShareUrl('');
    onShareUrlChange?.('');
  }, [initialConfig, onShareUrlChange]);

  useEffect(() => {
    if (preferDraft && draft) {
      setConfig(draft);
    }
  }, [preferDraft, draft]);

  useEffect(() => {
    const timer = setTimeout(() => saveDraft(config), 500);
    return () => clearTimeout(timer);
  }, [config, saveDraft]);

  const handleInputChange = useCallback(
    (field: keyof PrankConfig, value: unknown) => {
      setConfig((prev) => ({ ...prev, [field]: value }));
      setShareUrl('');
      onShareUrlChange?.('');
    },
    [onShareUrlChange]
  );

  const handleTypeChange = (type: PrankType) => {
    const example = getExampleConfig(type);
    setConfig((prev) => ({
      ...prev,
      prankType: type,
      theme: getDefaultThemeForType(type),
      title: example.title,
      message: example.message,
    }));
    setShareUrl('');
    onShareUrlChange?.('');
  };

  const handleGenerateLink = () => {
    const url = generateShareUrl(config);
    setShareUrl(url);
    onShareUrlChange?.(url);
  };

  const handleSaveToHistory = () => {
    if (editingId) {
      updateHistoryItem(editingId, {
        name: config.title || 'Broma sin título',
        config,
      });
    } else {
      const item = saveToHistory(config.title || 'Broma sin título', config);
      if (item) setEditingId(item.id);
    }
  };

  const handleLoadHistory = (item: HistoryItem) => {
    setConfig(item.config);
    setEditingId(item.id);
    setShareUrl('');
    onShareUrlChange?.('');
  };

  const handleEditHistory = (item: HistoryItem) => {
    setConfig(item.config);
    setEditingId(item.id);
    setShareUrl('');
    onShareUrlChange?.('');
  };

  const handleLoadExample = () => {
    setConfig(getExampleConfig(config.prankType));
    setShareUrl('');
    onShareUrlChange?.('');
  };

  const categories = [
    { type: 'fake-update' as PrankType, label: 'Actualización', icon: Laptop },
    { type: 'fake-error' as PrankType, label: 'Error', icon: AlertOctagon },
    { type: 'glitch' as PrankType, label: 'Glitch', icon: Zap },
    { type: 'loading' as PrankType, label: 'Carga', icon: Loader2 },
  ];

  return (
    <div className="page-container">
      <div className="builder-top-row">
        <button type="button" onClick={onNavigateHome} className="btn-ghost btn-sm" style={{ background: 'none', border: 'none' }}>
          <ArrowLeft size={16} />
          <span>Volver</span>
        </button>
        <h3 style={{ fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Settings size={16} style={{ color: 'var(--accent)' }} />
          Editor de bromas
        </h3>
      </div>

      <div className="builder-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <SavedPranksPanel
            items={history}
            onLoad={handleLoadHistory}
            onSave={handleSaveToHistory}
            onDuplicate={duplicateFromHistory}
            onDelete={(id) => {
              deleteFromHistory(id);
              if (editingId === id) setEditingId(null);
            }}
            onClear={clearHistory}
            editingId={editingId}
            onEdit={handleEditHistory}
          />

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card"
            style={{ padding: '1.25rem' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>
                1. Tipo de broma
              </h4>
              <button type="button" onClick={handleLoadExample} className="btn-ghost btn-sm">
                <Sparkles size={14} />
                Cargar ejemplo
              </button>
            </div>

            <div className="category-grid">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = config.prankType === cat.type;
                return (
                  <motion.button
                    key={cat.type}
                    type="button"
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleTypeChange(cat.type)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.85rem 0.5rem',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      border: isActive ? '1px solid var(--primary)' : '1px solid var(--border)',
                      background: isActive ? 'rgba(139, 92, 246, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                      color: isActive ? 'var(--text-main)' : 'var(--text-muted)',
                      fontWeight: isActive ? 600 : 500,
                      fontSize: '0.8rem',
                    }}
                  >
                    <Icon size={20} style={{ color: isActive ? 'var(--primary)' : 'inherit' }} />
                    <span>{cat.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="glass-card"
            style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
          >
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>
              2. Personalizá la apariencia
            </h4>

            <ThemePicker
              prankType={config.prankType}
              theme={config.theme}
              onChange={(theme) => handleInputChange('theme', theme)}
            />

            <AppThemePicker
              appTheme={config.appTheme}
              accentColor={config.accentColor}
              onAppThemeChange={(t) => handleInputChange('appTheme', t)}
              onAccentColorChange={(c) => handleInputChange('accentColor', c)}
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                Título principal
              </label>
              <input
                type="text"
                value={config.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Ej: Instalando actualizaciones del sistema..."
                className="input-field"
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                Mensaje secundario
              </label>
              <textarea
                value={config.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                placeholder="Detalles del error, indicaciones, etc."
                rows={3}
                className="input-field"
                style={{ resize: 'vertical' }}
              />
            </div>

            <IntensitySlider
              intensity={config.intensity}
              visualIntensity={config.visualIntensity}
              onIntensityChange={(v) => handleInputChange('intensity', v)}
              onVisualIntensityChange={(v) => handleInputChange('visualIntensity', v)}
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                <span>Duración</span>
                <span style={{ color: 'var(--accent)' }}>
                  {config.duration === 0 ? 'Infinito ♾️' : `${config.duration} seg`}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="60"
                step="5"
                value={config.duration}
                onChange={(e) => handleInputChange('duration', parseInt(e.target.value, 10))}
                className="range-input"
              />
            </div>

            <FullscreenToggle
              checked={config.fullscreen}
              onChange={(v) => handleInputChange('fullscreen', v)}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card"
            style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>
                3. Remate sorpresa
              </h4>
              <input
                type="checkbox"
                checked={config.showReveal}
                onChange={(e) => handleInputChange('showReveal', e.target.checked)}
                aria-label="Activar remate sorpresa"
                style={{ width: '20px', height: '20px', accentColor: 'var(--primary)', cursor: 'pointer' }}
              />
            </div>

            {config.showReveal && (
              <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <User size={12} />
                    Nombre de la víctima (opcional)
                  </label>
                  <input
                    type="text"
                    value={config.targetName}
                    onChange={(e) => handleInputChange('targetName', e.target.value)}
                    placeholder="Ej: Ramiro"
                    className="input-field"
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <MessageSquare size={12} />
                    Texto del remate
                  </label>
                  <input
                    type="text"
                    value={config.revealText}
                    onChange={(e) => handleInputChange('revealText', e.target.value)}
                    placeholder="Ej: ¡Caíste en la broma! 😂"
                    className="input-field"
                  />
                </div>

                {config.duration === 0 && (
                  <div style={{ fontSize: '0.75rem', color: 'var(--warning)', background: 'rgba(245,158,11,0.08)', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid rgba(245,158,11,0.2)' }}>
                    Con duración infinita, el remate solo aparece si la víctima sale manualmente o acepta una alerta retro.
                  </div>
                )}
              </div>
            )}
          </motion.div>

          <div className="action-row">
            <button type="button" onClick={() => onLaunchPrank(config)} className="btn-secondary">
              <Play size={16} />
              Probar pantalla completa
            </button>
            <button type="button" onClick={handleSaveToHistory} className="btn-secondary">
              <Bookmark size={16} />
              Guardar en historial
            </button>
          </div>

          <ShareCard
            config={config}
            shareUrl={shareUrl}
            onGenerate={handleGenerateLink}
            onOpenPreview={() => {
              if (!shareUrl) handleGenerateLink();
              onLaunchPrank(config);
            }}
            onOpenSocialPreview={
              onOpenSocialPreview
                ? () => {
                    if (!shareUrl) handleGenerateLink();
                    onOpenSocialPreview(config);
                  }
                : undefined
            }
          />
        </div>

        <ResponsivePreviewWrapper config={config} />
      </div>
    </div>
  );
};
