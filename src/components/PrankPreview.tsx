import React from 'react';
import { PrankConfig } from '../types/prank';
import { PrankRuntime } from './PrankRuntime';
import { Monitor, Smartphone } from 'lucide-react';

interface PrankPreviewProps {
  config: PrankConfig;
}

export const PrankPreview: React.FC<PrankPreviewProps> = ({ config }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '100%',
        position: 'sticky',
        top: '6rem',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Monitor size={16} style={{ color: 'var(--primary)' }} />
          Previsualización en Vivo
        </h4>
        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
          Simulación dentro del marco
        </span>
      </div>

      {/* Browser Window Mockup */}
      <div
        style={{
          width: '100%',
          aspectRatio: '16/9',
          backgroundColor: '#000000',
          borderRadius: '12px',
          border: '1px solid var(--border)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 12px 30px rgba(0,0,0,0.5)',
          position: 'relative',
        }}
      >
        {/* Mock Title Bar */}
        <div
          style={{
            height: '32px',
            backgroundColor: '#161825',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 1rem',
            justifyContent: 'space-between',
            zIndex: 10,
          }}
        >
          {/* Traffic Lights */}
          <div style={{ display: 'flex', gap: '6px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></div>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981' }}></div>
          </div>
          
          {/* Mock URL bar */}
          <div
            style={{
              backgroundColor: 'rgba(0,0,0,0.3)',
              borderRadius: '6px',
              fontSize: '0.65rem',
              color: 'var(--text-muted)',
              padding: '0.2rem 3rem',
              textAlign: 'center',
              width: '60%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              border: '1px solid rgba(255,255,255,0.03)',
            }}
          >
            prankforge.app/runtime/preview?type={config.prankType}
          </div>
          
          <div style={{ width: '42px' }}></div>
        </div>

        {/* Inner Preview Content Area */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          {/* Keyed by json representation to force hard remount on config changes */}
          <PrankRuntime
            key={JSON.stringify(config)}
            config={config}
            onExit={() => {}}
            isPreview={true}
          />
        </div>
      </div>
      
      <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textAlign: 'center', margin: 0 }}>
        💡 Consejo: Al previsualizar aquí, el cursor no se captura y no se activará el Fullscreen real. Para probar la inmersión total, usá el botón <strong>"Probar Pantalla Completa"</strong>.
      </p>
    </div>
  );
};
