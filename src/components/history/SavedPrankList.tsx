import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Copy, Clock, Pencil } from 'lucide-react';
import { HistoryItem } from '../../hooks/useLocalStorage';
import { PRANK_TYPE_LABELS } from '../../types/prank';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { getCardVariants } from '../shared/motionPresets';

interface SavedPrankListProps {
  items: HistoryItem[];
  onLoad: (item: HistoryItem) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit?: (item: HistoryItem) => void;
  compact?: boolean;
  readOnly?: boolean;
}

export const SavedPrankList: React.FC<SavedPrankListProps> = ({
  items,
  onLoad,
  onDuplicate,
  onDelete,
  onEdit,
  compact = false,
  readOnly = false,
}) => {
  const reducedMotion = useReducedMotion();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {items.map((item, index) => {
        const motionProps = getCardVariants(reducedMotion, index);
        return (
          <motion.div
            key={item.id}
            initial={motionProps.initial}
            animate={motionProps.animate}
            transition={motionProps.transition}
            className="history-item"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: compact ? '0.65rem 0.75rem' : '0.85rem 1rem',
              borderRadius: '10px',
              border: '1px solid var(--border)',
              background: 'rgba(255,255,255,0.02)',
              cursor: 'pointer',
            }}
            onClick={() => onLoad(item)}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: compact ? '0.8rem' : '0.875rem',
                  fontWeight: 600,
                  color: 'var(--text-main)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.name}
              </div>
              <div
                style={{
                  fontSize: '0.7rem',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  marginTop: '0.15rem',
                }}
              >
                <Clock size={10} />
                <span>{item.updatedAt ?? item.createdAt}</span>
                <span>·</span>
                <span>{PRANK_TYPE_LABELS[item.config.prankType]}</span>
              </div>
            </div>

            {!readOnly && (
              <div
                style={{ display: 'flex', gap: '0.25rem', flexShrink: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                {onEdit && (
                  <button
                    type="button"
                    onClick={() => onEdit(item)}
                    aria-label="Editar broma"
                    className="icon-btn"
                    title="Editar"
                  >
                    <Pencil size={14} />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => onDuplicate(item.id)}
                  aria-label="Duplicar broma"
                  className="icon-btn"
                  title="Duplicar"
                >
                  <Copy size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(item.id)}
                  aria-label="Eliminar broma"
                  className="icon-btn icon-btn-danger"
                  title="Eliminar"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};
