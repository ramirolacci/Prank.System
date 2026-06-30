import { useState, useCallback } from 'react';
import {
  exportShareCardAsImage,
  getShareCardExportNode,
  downloadBlob,
  copyImageBlobToClipboard,
  shareImageBlob,
  buildExportFilename,
  canCopyImageToClipboard,
  canNativeShareFiles,
  ExportResult,
} from '../utils/imageExport';

export type ExportStatus = 'idle' | 'loading' | 'success' | 'error';

export interface ExportFeedback {
  status: ExportStatus;
  message: string;
}

export function useShareCardExport(title?: string) {
  const [feedback, setFeedback] = useState<ExportFeedback>({
    status: 'idle',
    message: '',
  });

  const clearFeedback = useCallback(() => {
    setFeedback({ status: 'idle', message: '' });
  }, []);

  const capture = useCallback(
    async (root?: HTMLElement | null): Promise<ExportResult | null> => {
      const node = getShareCardExportNode(root ?? undefined);
      if (!node) {
        setFeedback({
          status: 'error',
          message: 'No se encontró la tarjeta para exportar. Generá el link primero.',
        });
        return null;
      }

      setFeedback({ status: 'loading', message: 'Generando imagen…' });

      try {
        const result = await exportShareCardAsImage(node);
        return result;
      } catch (e) {
        console.error('[useShareCardExport]', e);
        setFeedback({
          status: 'error',
          message: 'No se pudo generar la imagen. Probá de nuevo o usá otro navegador.',
        });
        return null;
      }
    },
    []
  );

  const downloadImage = useCallback(
    async (root?: HTMLElement | null) => {
      const result = await capture(root);
      if (!result) return false;

      const filename = buildExportFilename(title);
      downloadBlob(result.blob, filename);
      setFeedback({ status: 'success', message: 'Imagen descargada correctamente.' });
      return true;
    },
    [capture, title]
  );

  const copyImage = useCallback(
    async (root?: HTMLElement | null) => {
      if (!canCopyImageToClipboard()) {
        setFeedback({
          status: 'error',
          message: 'Tu navegador no permite copiar imágenes al portapapeles.',
        });
        return false;
      }

      const result = await capture(root);
      if (!result) return false;

      const ok = await copyImageBlobToClipboard(result.blob);
      if (ok) {
        setFeedback({ status: 'success', message: 'Imagen copiada al portapapeles.' });
        return true;
      }

      setFeedback({
        status: 'error',
        message: 'No se pudo copiar la imagen. Probá descargarla.',
      });
      return false;
    },
    [capture]
  );

  const shareImage = useCallback(
    async (root?: HTMLElement | null, shareText?: string) => {
      const result = await capture(root);
      if (!result) return false;

      const filename = buildExportFilename(title);

      if (canNativeShareFiles()) {
        try {
          await shareImageBlob(
            result.blob,
            filename,
            title || 'PrankForge',
            shareText ?? 'Mirá esta broma visual inofensiva 🃏'
          );
          setFeedback({ status: 'success', message: 'Imagen compartida.' });
          return true;
        } catch {
          // fall through to copy
        }
      }

      return copyImage(root);
    },
    [capture, copyImage, title]
  );

  return {
    feedback,
    clearFeedback,
    downloadImage,
    copyImage,
    shareImage,
    canCopy: canCopyImageToClipboard(),
    canShare: canNativeShareFiles(),
  };
}
