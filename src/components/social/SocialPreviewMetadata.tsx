import React, { useMemo, useEffect } from 'react';
import { PrankConfig } from '../../types/prank';
import {
  buildSocialMetadata,
  getSocialPreviewUrl,
  getDefaultOgImageUrl,
} from '../../utils/socialMetadata';
import { useAppHeadMetadata } from './AppHeadMetadata';
import { APP_MANIFEST } from '../../pwa/AppManifestConfig';

export interface EnrichedSocialMetadata {
  title: string;
  description: string;
  image: string;
  url: string;
  themeColor: string;
  siteName: string;
  type: 'website' | 'article';
  socialPreviewUrl?: string;
}

export function buildEnrichedSocialMetadata(
  config?: PrankConfig | null,
  shareUrl?: string
): EnrichedSocialMetadata {
  const base = buildSocialMetadata(config, shareUrl);

  if (!config) {
    return base;
  }

  const socialPreviewUrl = getSocialPreviewUrl(config);

  return {
    ...base,
    url: shareUrl || socialPreviewUrl,
    socialPreviewUrl,
    image: getDefaultOgImageUrl(),
  };
}

function applyPwaHeadTags(themeColor: string): void {
  if (typeof document === 'undefined') return;

  const tags: Array<{ name: string; content: string }> = [
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
    { name: 'apple-mobile-web-app-title', content: APP_MANIFEST.short_name },
    { name: 'mobile-web-app-capable', content: 'yes' },
    { name: 'application-name', content: APP_MANIFEST.short_name },
  ];

  tags.forEach(({ name, content }) => {
    let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('name', name);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  });

  const themeEl = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;
  if (themeEl) themeEl.setAttribute('content', themeColor);
}

interface SocialPreviewMetadataProps {
  config?: PrankConfig | null;
  shareUrl?: string;
  children?: React.ReactNode;
}

/**
 * Enhanced social + PWA metadata per prank context.
 */
export const SocialPreviewMetadata: React.FC<SocialPreviewMetadataProps> = ({
  config,
  shareUrl,
  children,
}) => {
  const metadata = useMemo(
    () => buildEnrichedSocialMetadata(config, shareUrl),
    [config, shareUrl]
  );

  useAppHeadMetadata(metadata);

  useEffect(() => {
    applyPwaHeadTags(metadata.themeColor);

    let altEl = document.querySelector('meta[property="og:image:alt"]') as HTMLMetaElement | null;
    if (!altEl) {
      altEl = document.createElement('meta');
      altEl.setAttribute('property', 'og:image:alt');
      document.head.appendChild(altEl);
    }
    altEl.setAttribute(
      'content',
      config?.title
        ? `Preview de broma: ${config.title}`
        : 'PrankForge — bromas visuales inofensivas'
    );
  }, [metadata.themeColor, config?.title]);

  return <>{children}</>;
};

/** Re-export base builder for convenience */
export { buildSocialMetadata } from '../../utils/socialMetadata';
