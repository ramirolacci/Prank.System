import React, { useRef } from 'react';
import { ShareCardVisual } from './ShareCardVisual';
import { DownloadImageButton } from './DownloadImageButton';
import { ShareImageButton } from './ShareImageButton';
import { ExportStatusToast } from './ExportStatusToast';
import { useShareCardExport } from '../../hooks/useShareCardExport';
import { PrankConfig } from '../../types/prank';

interface ShareCardExporterProps {
  config: PrankConfig;
  disabled?: boolean;
}

/**
 * Export controls wired to the adjacent ShareCardVisual node.
 */
export const ShareCardExporter: React.FC<ShareCardExporterProps> = ({
  config,
  disabled = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    feedback,
    clearFeedback,
    downloadImage,
    copyImage,
    shareImage,
    canCopy,
    canShare,
  } = useShareCardExport(config.title);

  const getRoot = () => containerRef.current;

  const isLoading = feedback.status === 'loading';

  return (
    <>
      <div ref={containerRef} className="share-card-exporter-wrap">
        <ShareCardVisual config={config} exportMode />
      </div>

      <div className="share-export-actions">
        <DownloadImageButton
          onClick={() => downloadImage(getRoot())}
          disabled={disabled}
          loading={isLoading}
        />
        <ShareImageButton
          onCopy={() => copyImage(getRoot())}
          onShare={() => shareImage(getRoot())}
          canCopy={canCopy}
          canShare={canShare}
          disabled={disabled}
          loading={isLoading}
        />
      </div>

      <ExportStatusToast feedback={feedback} onDismiss={clearFeedback} />
    </>
  );
};
