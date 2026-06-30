import { useEffect, useMemo } from 'react';
import { SocialMetadata } from '../../utils/socialMetadata';

function upsertMeta(name: string, content: string, isProperty = false): void {
  const selector = isProperty
    ? `meta[property="${name}"]`
    : `meta[name="${name}"]`;
  let el = document.querySelector(selector) as HTMLMetaElement | null;

  if (name === 'title') {
    document.title = content;
    return;
  }

  if (!el) {
    el = document.createElement('meta');
    if (isProperty) {
      el.setAttribute('property', name);
    } else {
      el.setAttribute('name', name);
    }
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertThemeColor(color: string): void {
  let el = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', 'theme-color');
    document.head.appendChild(el);
  }
  el.setAttribute('content', color);
}

/**
 * Low-level head tag updater for social metadata.
 */
export function applyHeadMetadata(meta: SocialMetadata): void {
  if (typeof document === 'undefined') return;

  document.title = meta.title;
  upsertMeta('description', meta.description);
  upsertMeta('og:title', meta.title, true);
  upsertMeta('og:description', meta.description, true);
  upsertMeta('og:image', meta.image, true);
  upsertMeta('og:url', meta.url, true);
  upsertMeta('og:site_name', meta.siteName, true);
  upsertMeta('og:type', meta.type, true);
  upsertMeta('twitter:card', 'summary_large_image');
  upsertMeta('twitter:title', meta.title);
  upsertMeta('twitter:description', meta.description);
  upsertMeta('twitter:image', meta.image);
  upsertThemeColor(meta.themeColor);
}

export function useAppHeadMetadata(meta: SocialMetadata): void {
  useEffect(() => {
    applyHeadMetadata(meta);
  }, [meta.title, meta.description, meta.image, meta.url, meta.themeColor, meta.siteName, meta.type]);
}
