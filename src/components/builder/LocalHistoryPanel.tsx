import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Copy, Clock, History } from 'lucide-react';
import { HistoryItem } from '../hooks/useLocalStorage';
import { PRANK_TYPE_LABELS } from '../../types/prank';

interface SavedPrankListProps {
  items: HistoryItem[];
  onLoad: (item: HistoryItem) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  compact?: boolean;
  readOnly?: boolean;
}

export const SavedPrankList: React.FC<SavedPrankListProps> = ({
  items,
  onLoad,
  onDuplicate,
  onDelete,
  compact = false,
  readOnly = false,
}) => {
  if (items.length === 0) {
    return (
      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', padding: '1rem 0' }}>
        Todavía no guardaste ninguna broma. Configurá una y tocá "Guardar en historial".
      </p>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.04 }}
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
          className="history-item"
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: compact ? '0.8rem' : '0.875rem',
                fontWeight: 600,
                color: '#fff',
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
              <span>{item.createdAt}</span>
              <span>·</span>
              <span>{PRANK_TYPE_LABELS[item.config.prankType]}</span>
            </div>
          </div>

          {!readOnly && (
            <div
              style={{ display: 'flex', gap: '0.25rem', flexShrink: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
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
      ))}
    </div>
  );
};

interface LocalHistoryPanelProps {
  items: HistoryItem[];
  onLoad: (item: HistoryItem) => void;
  onSave: () => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  onClear: () => void;
}

export const LocalHistoryPanel: React.FC<LocalHistoryPanelProps> = ({
  items,
  onLoad,
  onSave,
  onDuplicate,
  onDelete,
  onClear,
}) => {
  return (
    <div className="glass-card" style={{ padding: '1.25rem' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1rem',
          gap: '0.5rem',
          flexWrap: 'wrap',
        }}
      >
        <h4
          style={{
            fontSize: '1rem',
            fontWeight: 700,
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
          }}
        >
          <History size={16} style={{ color: 'var(--accent)' }} />
          Historial local
        </h4>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button type="button" onClick={onSave} className="btn-secondary btn-sm">
            Guardar
          </button>
          {items.length > 0 && (
            <button type="button" onClick={onClear} className="btn-ghost btn-sm">
              Limpiar
            </button>
          )}
        </div>
      </div>

      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
        Tus bromas se guardan en este dispositivo. Tocá una para cargarla o duplicarla.
      </p>

      <SavedPrankList
        items={items}
        onLoad={onLoad}
        onDuplicate={onDuplicate}
        onDelete={onDelete}
      />
    </div>
  );
};
