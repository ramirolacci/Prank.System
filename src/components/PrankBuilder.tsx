import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { PrankConfig, PrankType, LinkDisguise } from '../types/prank';
import { ResponsivePreviewWrapper } from './builder/ResponsivePreviewWrapper';
import { SavedPranksPanel } from './history/SavedPranksPanel';
import { ShareCard } from './builder/ShareCard';
import { ThemePicker } from './builder/ThemePicker';
import { AppThemePicker } from './builder/AppThemePicker';
import { IntensitySlider } from './builder/IntensitySlider';
import { FullscreenToggle } from './builder/FullscreenToggle';
import { QrCodeModal } from './builder/QrCodeModal';
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
  Vibrate,
  ShieldAlert,
  Flame,
  Hammer,
  Smartphone,
  QrCode,
  EyeOff,
  Eye,
  FileText,
  DollarSign,
  Gift,
  Share2,
  LucideIcon,
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
  const [showQrModal, setShowQrModal] = useState(false);

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
      soundEnabled: example.soundEnabled ?? true,
      vibrationEnabled: example.vibrationEnabled ?? true,
      escapeMode: example.escapeMode ?? 'stealth',
      linkDisguise: example.linkDisguise ?? 'none',
    }));
    setShareUrl('');
    onShareUrlChange?.('');
  };

  const handleGenerateLink = () => {
    const url = generateShareUrl(config);
    setShareUrl(url);
    onShareUrlChange?.(url);
    return url;
  };

  const handleOpenQrModal = () => {
    if (!shareUrl) handleGenerateLink();
    setShowQrModal(true);
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
    { type: 'fbi-warning' as PrankType, label: 'Alerta FBI', icon: ShieldAlert },
    { type: 'battery-explosion' as PrankType, label: 'Batería 98°C', icon: Flame },
    { type: 'broken-glass' as PrankType, label: 'Cristal Roto', icon: Hammer },
    { type: 'whatsapp-hacked' as PrankType, label: 'WhatsApp Hack', icon: Smartphone },
    { type: 'fake-update' as PrankType, label: 'Actualización', icon: Laptop },
    { type: 'fake-error' as PrankType, label: 'Error BSOD', icon: AlertOctagon },
    { type: 'glitch' as PrankType, label: 'Glitch Hacker', icon: Zap },
    { type: 'loading' as PrankType, label: 'RAM Infinita', icon: Loader2 },
  ];

  const disguises: { value: LinkDisguise; label: string; desc: string; icon: LucideIcon }[] = [
    { value: 'none', label: 'Sin Camuflaje', desc: 'Vista previa normal', icon: Share2 },
    { value: 'pdf-doc', label: '📄 Documento PDF', desc: 'Documento_Oficial_Firmado_2026.pdf', icon: FileText },
    { value: 'bank-transfer', label: '💸 Transferencia $150k', desc: 'Comprobante de Pago Acreditado', icon: DollarSign },
    { value: 'giveaway', label: '🎁 Premio VIP', desc: '¡Has ganado un pase VIP exclusivo!', icon: Gift },
    { value: 'whatsapp-backup', label: '💬 WhatsApp Backup', desc: 'Copia de respaldo de chats', icon: Smartphone },
  ];

  return (
    <div className="page-container">
      <QrCodeModal
        isOpen={showQrModal}
        onClose={() => setShowQrModal(false)}
        url={shareUrl || generateShareUrl(config)}
        title={config.title}
      />

      <div className="builder-top-row">
        <button type="button" onClick={onNavigateHome} className="btn-ghost btn-sm" style={{ background: 'none', border: 'none' }}>
          <ArrowLeft size={16} />
          <span>Volver</span>
        </button>
        <h3 style={{ fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Settings size={16} style={{ color: 'var(--accent)' }} />
          Editor de bromas PrankForge v2.0
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

          {/* Personalización y Efectos */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="glass-card"
            style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>
                Personalizá la experiencia
              </h4>
              <button type="button" onClick={handleLoadExample} className="btn-ghost btn-sm">
                <Sparkles size={14} />
                Cargar ejemplo
              </button>
            </div>

            {/* Vibration Toggle */}
            <div>
              <button
                type="button"
                onClick={() => handleInputChange('vibrationEnabled', !config.vibrationEnabled)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem',
                  borderRadius: '10px',
                  border: config.vibrationEnabled ? '1px solid var(--accent)' : '1px solid var(--border)',
                  background: config.vibrationEnabled ? 'rgba(139, 92, 246, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                  color: config.vibrationEnabled ? '#fff' : 'var(--text-muted)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  width: '100%',
                }}
              >
                <Vibrate size={16} color={config.vibrationEnabled ? 'var(--accent)' : 'inherit'} />
                <span>{config.vibrationEnabled ? 'Vibración Táctil Móvil ON' : 'Vibración OFF'}</span>
              </button>
            </div>

            {/* Escape Mode Selector */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <EyeOff size={14} color="var(--accent)" />
                Modo de Salida (Para no delatar la broma)
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => handleInputChange('escapeMode', 'stealth')}
                  style={{
                    padding: '0.65rem 0.5rem',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    border: config.escapeMode === 'stealth' ? '1px solid var(--primary)' : '1px solid var(--border)',
                    background: config.escapeMode === 'stealth' ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
                    color: config.escapeMode === 'stealth' ? '#fff' : 'var(--text-muted)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                  }}
                >
                  <EyeOff size={14} />
                  <span>Modo Sigilo (3 toques esquina)</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleInputChange('escapeMode', 'button')}
                  style={{
                    padding: '0.65rem 0.5rem',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    border: config.escapeMode === 'button' ? '1px solid var(--primary)' : '1px solid var(--border)',
                    background: config.escapeMode === 'button' ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
                    color: config.escapeMode === 'button' ? '#fff' : 'var(--text-muted)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                  }}
                >
                  <Eye size={14} />
                  <span>Botón Salir Visible</span>
                </button>
              </div>
            </div>

            {/* Link Disguise Selector */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Share2 size={14} color="var(--accent)" />
                Camuflaje de Enlace para WhatsApp
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                {disguises.map((d) => {
                  const Icon = d.icon;
                  const isActive = config.linkDisguise === d.value;
                  return (
                    <button
                      key={d.value}
                      type="button"
                      onClick={() => handleInputChange('linkDisguise', d.value)}
                      style={{
                        padding: '0.6rem',
                        borderRadius: '8px',
                        textAlign: 'left',
                        border: isActive ? '1px solid var(--primary)' : '1px solid var(--border)',
                        background: isActive ? 'rgba(139, 92, 246, 0.15)' : 'rgba(255,255,255,0.01)',
                        color: isActive ? '#fff' : 'var(--text-muted)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.75rem',
                      }}
                    >
                      <Icon size={16} />
                      <div style={{ overflow: 'hidden' }}>
                        <div style={{ fontWeight: 600 }}>{d.label}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

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
                placeholder="Ej: ¡DISPOSITIVO BLOQUEADO!"
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

          {/* 3. Remate Sorpresa */}
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
              </div>
            )}
          </motion.div>

          <div className="action-row" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button type="button" onClick={() => onLaunchPrank(config)} className="btn-secondary" style={{ flex: 1 }}>
              <Play size={16} />
              Probar pantalla completa
            </button>
            <button type="button" onClick={handleOpenQrModal} className="btn-secondary" style={{ flex: 1 }}>
              <QrCode size={16} />
              Escanear QR Celular
            </button>
            <button type="button" onClick={handleSaveToHistory} className="btn-secondary">
              <Bookmark size={16} />
              Guardar
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
