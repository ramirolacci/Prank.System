import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, AlertCircle, Loader2, X } from 'lucide-react';
import { ExportFeedback } from '../../hooks/useShareCardExport';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';

interface ExportStatusToastProps {
  feedback: ExportFeedback;
  onDismiss: () => void;
  autoHideMs?: number;
}

export const ExportStatusToast: React.FC<ExportStatusToastProps> = ({
  feedback,
  onDismiss,
  autoHideMs = 3500,
}) => {
  const reducedMotion = useReducedMotionPreference();

  useEffect(() => {
    if (feedback.status === 'success' || feedback.status === 'error') {
      const timer = setTimeout(onDismiss, autoHideMs);
      return () => clearTimeout(timer);
    }
  }, [feedback.status, feedback.message, autoHideMs, onDismiss]);

  const icon =
    feedback.status === 'loading' ? (
      <Loader2 size={16} className="spin-icon" />
    ) : feedback.status === 'success' ? (
      <Check size={16} style={{ color: 'var(--success)' }} />
    ) : feedback.status === 'error' ? (
      <AlertCircle size={16} style={{ color: 'var(--danger)' }} />
    ) : null;

  return (
    <AnimatePresence>
      {feedback.status !== 'idle' && feedback.message && (
        <motion.div
          className={`export-status-toast export-status-${feedback.status}`}
          role="status"
          aria-live="polite"
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: reducedMotion ? 0.1 : 0.22 }}
        >
          {icon}
          <span style={{ flex: 1, fontSize: '0.8rem' }}>{feedback.message}</span>
          <button type="button" onClick={onDismiss} className="icon-btn" aria-label="Cerrar" style={{ width: 28, height: 28 }}>
            <X size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
