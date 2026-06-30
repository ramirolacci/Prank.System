import React from 'react';
import { History } from 'lucide-react';
import { HistoryItem } from '../../hooks/useLocalStorage';
import { SavedPrankList } from './SavedPrankList';
import { EmptyState } from '../shared/EmptyState';

interface SavedPranksPanelProps {
  items: HistoryItem[];
  onLoad: (item: HistoryItem) => void;
  onSave: () => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  onClear: () => void;
  editingId?: string | null;
  onEdit?: (item: HistoryItem) => void;
}

export const SavedPranksPanel: React.FC<SavedPranksPanelProps> = ({
  items,
  onLoad,
  onSave,
  onDuplicate,
  onDelete,
  onClear,
  editingId,
  onEdit,
}) => {
  return (
    <div className="glass-card" style={{ padding: '1.25rem' }}>
      <div className="saved-panel-header">
        <h4 className="saved-panel-title">
          <History size={16} style={{ color: 'var(--accent)' }} />
          Bromas guardadas
        </h4>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button type="button" onClick={onSave} className="btn-secondary btn-sm">
            Guardar actual
          </button>
          {items.length > 0 && (
            <button type="button" onClick={onClear} className="btn-ghost btn-sm">
              Limpiar todo
            </button>
          )}
        </div>
      </div>

      <p className="saved-panel-hint">
        Se guardan en localStorage de este navegador. Tocá para cargar, duplicá o eliminá.
      </p>

      {items.length === 0 ? (
        <EmptyState
          icon={History}
          title="Historial vacío"
          description='Configurá una broma y tocá "Guardar actual" para tenerla siempre a mano.'
          action={
            <button type="button" onClick={onSave} className="btn-secondary btn-sm">
              Guardar la broma actual
            </button>
          }
        />
      ) : (
        <SavedPrankList
          items={items}
          onLoad={onLoad}
          onDuplicate={onDuplicate}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      )}
    </div>
  );
};
