import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Settings, Palette } from 'lucide-react';
import { ThemeSelector } from './ThemeSelector';
import { useTheme } from '../../context/ThemeProvider';
import { ACCENT_COLORS } from '../../utils/themes';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { getPageTransition } from '../shared/motionPresets';

interface SettingsPanelProps {
  open: boolean;
  onClose: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ open, onClose }) => {
  const { theme, setTheme, settings, setAccentColor } = useTheme();
  const reducedMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="settings-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={getPageTransition(reducedMotion)}
            onClick={onClose}
          />
          <motion.aside
            className="settings-panel"
            initial={reducedMotion ? {} : { x: '100%' }}
            animate={{ x: 0 }}
            exit={reducedMotion ? {} : { x: '100%' }}
            transition={getPageTransition(reducedMotion)}
            role="dialog"
            aria-label="Ajustes"
          >
            <div className="settings-panel-header">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', fontWeight: 700 }}>
                <Settings size={18} style={{ color: 'var(--accent)' }} />
                Ajustes
              </h3>
              <button type="button" onClick={onClose} className="icon-btn" aria-label="Cerrar">
                <X size={18} />
              </button>
            </div>

            <div className="settings-section">
              <label className="settings-label">
                <Palette size={14} />
                Tema de la app
              </label>
              <p className="settings-hint">Se aplica al instante y se guarda en este dispositivo.</p>
              <ThemeSelector value={theme} onChange={setTheme} />
            </div>

            <div className="settings-section">
              <label className="settings-label">Color de acento</label>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {ACCENT_COLORS.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => setAccentColor(color.value)}
                    aria-label={color.label}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: color.value,
                      border:
                        settings.accentColor === color.value
                          ? '2px solid #fff'
                          : '2px solid transparent',
                      boxShadow:
                        settings.accentColor === color.value
                          ? `0 0 12px ${color.value}`
                          : 'none',
                      cursor: 'pointer',
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="settings-section settings-footer-note">
              <p>
                PrankForge guarda tus datos solo en este navegador. Sin servidor, sin tracking.
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
