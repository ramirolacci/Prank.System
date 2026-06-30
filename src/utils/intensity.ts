import { VisualIntensity } from '../types/prank';

export const INTENSITY_LEVELS: { value: VisualIntensity; label: string; numeric: number }[] = [
  { value: 'low', label: 'Leve', numeric: 3 },
  { value: 'medium', label: 'Media', numeric: 5 },
  { value: 'high', label: 'Alta', numeric: 8 },
];

export function visualIntensityFromNumeric(value: number): VisualIntensity {
  if (value <= 3) return 'low';
  if (value <= 7) return 'medium';
  return 'high';
}

export function numericFromVisualIntensity(level: VisualIntensity): number {
  return INTENSITY_LEVELS.find((l) => l.value === level)?.numeric ?? 5;
}
