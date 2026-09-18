// Haptic feedback utility for mobile devices via navigator.vibrate

export function triggerVibration(pattern: number | number[] = 200): boolean {
  if (typeof window === 'undefined' || !('vibrate' in navigator)) {
    return false;
  }
  try {
    return navigator.vibrate(pattern);
  } catch (err) {
    console.warn('Vibration API error:', err);
    return false;
  }
}

export function vibrateErrorPulse(): void {
  triggerVibration([200, 100, 200]);
}

export function vibrateAlarmPattern(): void {
  triggerVibration([300, 150, 300, 150, 600]);
}

export function vibrateImpactGlitch(): void {
  triggerVibration([100, 50, 100, 50, 200]);
}

export function vibrateGlassCrunch(): void {
  triggerVibration([80, 40, 120]);
}
