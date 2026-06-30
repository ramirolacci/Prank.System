import React from 'react';
import { PrankConfig } from '../types/prank';
import { ResponsivePreviewWrapper } from './builder/ResponsivePreviewWrapper';

interface PrankPreviewProps {
  config: PrankConfig;
}

export const PrankPreview: React.FC<PrankPreviewProps> = ({ config }) => {
  return <ResponsivePreviewWrapper config={config} />;
};
