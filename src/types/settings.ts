import { AppTheme } from './prank';

export interface UserSettings {
  appTheme: AppTheme;
  accentColor: string;
  hasSeenGuide: boolean;
}

export const DEFAULT_USER_SETTINGS: UserSettings = {
  appTheme: 'dark',
  accentColor: '#8b5cf6',
  hasSeenGuide: false,
};
