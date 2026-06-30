/**
 * Image export architecture stub.
 * Integrate html-to-image or similar when ready:
 *
 * import { toPng } from 'html-to-image';
 * export async function exportShareCard(element: HTMLElement): Promise<string> {
 *   return toPng(element, { cacheBust: true });
 * }
 */

export async function exportShareCard(_element: HTMLElement): Promise<Blob | null> {
  console.info('[imageExport] Ready for html-to-image integration');
  return null;
}
