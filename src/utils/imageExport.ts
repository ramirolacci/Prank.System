import { isBrowser } from '../hooks/useStorage';

export const SHARE_CARD_EXPORT_ID = 'prankforge-share-card';

export interface ShareCardExportOptions {
  filename?: string;
  pixelRatio?: number;
}

/**
 * Returns the DOM node prepared for image export.
 * Connect html-to-image here in a future phase:
 *
 * import { toPng } from 'html-to-image';
 * const dataUrl = await toPng(node, { cacheBust: true, pixelRatio: 2 });
 */
export function getShareCardExportNode(
  root?: HTMLElement | null
): HTMLElement | null {
  if (!isBrowser()) return null;
  const scope = root ?? document;
  return (
    scope.querySelector<HTMLElement>(`[data-export-target="${SHARE_CARD_EXPORT_ID}"]`) ??
    scope.querySelector<HTMLElement>('[data-export-target="share-card"]')
  );
}

export async function exportShareCardAsImage(
  node: HTMLElement,
  options: ShareCardExportOptions = {}
): Promise<string | null> {
  const { filename = 'prankforge-share.png' } = options;

  try {
    // Dynamic import placeholder — enable when html-to-image is added:
    // const { toPng } = await import('html-to-image');
    // const dataUrl = await toPng(node, { cacheBust: true, pixelRatio: options.pixelRatio ?? 2 });
    // return dataUrl;

    console.info('[imageExport] Node ready for export:', node, filename);
    return null;
  } catch (e) {
    console.error('[imageExport] Export failed:', e);
    return null;
  }
}

export function downloadDataUrl(dataUrl: string, filename: string): void {
  if (!isBrowser()) return;
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  link.click();
}
