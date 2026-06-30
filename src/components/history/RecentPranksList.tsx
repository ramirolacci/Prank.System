import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { HistoryItem } from '../../hooks/useLocalStorage';
import { PRANK_TYPE_LABELS } from '../../types/prank';
import { EmptyState } from '../shared/EmptyState';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { getCardVariants } from '../shared/motionPresets';

interface RecentPranksListProps {
  items: HistoryItem[];
  onLoad: (item: HistoryItem) => void;
  limit?: number;
}

export const RecentPranksList: React.FC<RecentPranksListProps> = ({
  items,
  onLoad,
  limit,
}) => {
  const reducedMotion = useReducedMotion();
  const displayItems = limit ? items.slice(0, limit) : items;

  if (displayItems.length === 0) {
    return (
      <EmptyState
        icon={Clock}
        title="Sin bromas recientes"
        description="Cuando guardes o crees una broma, aparecerá acá para acceso rápido."
      />
    );
  }

  return (
    <div className="recent-pranks-list">
      {displayItems.map((item, index) => {
        const motionProps = getCardVariants(reducedMotion, index);
        return (
          <motion.button
            key={item.id}
            type="button"
            className="recent-prank-item"
            onClick={() => onLoad(item)}
            initial={motionProps.initial}
            animate={motionProps.animate}
            transition={motionProps.transition}
          >
            <div className="recent-prank-info">
              <span className="recent-prank-name">{item.name}</span>
              <span className="recent-prank-meta">
                {PRANK_TYPE_LABELS[item.config.prankType]} · {item.createdAt}
              </span>
            </div>
            <span className="recent-prank-arrow">→</span>
          </motion.button>
        );
      })}
    </div>
  );
};
