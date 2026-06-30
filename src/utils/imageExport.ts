import { toPng } from 'html-to-image';
import { isBrowser } from '../hooks/useStorage';

export const SHARE_CARD_EXPORT_ID = 'prankforge-share-card';

export interface ShareCardExportOptions {
  filename?: string;
  pixelRatio?: number;
  backgroundColor?: string;
}

export interface ExportResult {
  dataUrl: string;
  blob: Blob;
  width: number;
  height: number;
}

export function getShareCardExportNode(root?: ParentNode | null): HTMLElement | null {
  if (!isBrowser()) return null;
  const scope = root ?? document;
  return (
    scope.querySelector<HTMLElement>(`[data-export-target="${SHARE_CARD_EXPORT_ID}"]`) ??
    scope.querySelector<HTMLElement>('[data-export-target="share-card"]')
  );
}

function dataUrlToBlob(dataUrl: string): Blob {
  const [header, base64] = dataUrl.split(',');
  const mime = header.match(/:(.*?);/)?.[1] ?? 'image/png';
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new Blob([bytes], { type: mime });
}

export async function exportShareCardAsImage(
  node: HTMLElement,
  options: ShareCardExportOptions = {}
): Promise<ExportResult> {
  const {
    pixelRatio = 2,
    backgroundColor = '#0a0b10',
  } = options;

  await document.fonts?.ready?.catch(() => {});

  const dataUrl = await toPng(node, {
    cacheBust: true,
    pixelRatio,
    backgroundColor,
    skipAutoScale: false,
    style: {
      transform: 'none',
      animation: 'none',
    },
  });

  const blob = dataUrlToBlob(dataUrl);
  const width = node.offsetWidth * pixelRatio;
  const height = node.offsetHeight * pixelRatio;

  return { dataUrl, blob, width, height };
}

export function downloadBlob(blob: Blob, filename: string): void {
  if (!isBrowser()) return;
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = filename;
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
}

export function downloadDataUrl(dataUrl: string, filename: string): void {
  downloadBlob(dataUrlToBlob(dataUrl), filename);
}

export function buildExportFilename(prankTitle?: string): string {
  const slug = (prankTitle || 'prankforge-share')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40);
  return `${slug || 'prankforge-share'}.png`;
}

export async function copyImageBlobToClipboard(blob: Blob): Promise<boolean> {
  if (!isBrowser() || !navigator.clipboard?.write) return false;

  try {
    if (typeof ClipboardItem !== 'undefined') {
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob }),
      ]);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

export function canCopyImageToClipboard(): boolean {
  return (
    isBrowser() &&
    !!navigator.clipboard?.write &&
    typeof ClipboardItem !== 'undefined'
  );
}

export function canNativeShareFiles(): boolean {
  if (!isBrowser() || !navigator.share || !navigator.canShare) return false;
  try {
    const testFile = new File([''], 'test.png', { type: 'image/png' });
    return navigator.canShare({ files: [testFile] });
  } catch {
    return false;
  }
}

export async function shareImageBlob(
  blob: Blob,
  filename: string,
  title: string,
  text?: string
): Promise<boolean> {
  if (!isBrowser() || !navigator.share) return false;

  try {
    const file = new File([blob], filename, { type: blob.type });
    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({ files: [file], title, text });
      return true;
    }
    await navigator.share({ title, text: text ?? title, url: undefined });
    return true;
  } catch (e) {
    if ((e as Error).name === 'AbortError') return false;
    throw e;
  }
}
