import React, { useMemo } from 'react';
import { PrankConfig } from '../../types/prank';
import { buildSocialMetadata } from '../../utils/socialMetadata';
import { useAppHeadMetadata } from './AppHeadMetadata';

interface SocialMetadataManagerProps {
  config?: PrankConfig | null;
  shareUrl?: string;
  children?: React.ReactNode;
}

/**
 * Updates document head with social / OG metadata based on current prank context.
 */
export const SocialMetadataManager: React.FC<SocialMetadataManagerProps> = ({
  config,
  shareUrl,
  children,
}) => {
  const metadata = useMemo(
    () => buildSocialMetadata(config, shareUrl),
    [config, shareUrl]
  );
  useAppHeadMetadata(metadata);
  return <>{children}</>;
};

export { buildSocialMetadata };
