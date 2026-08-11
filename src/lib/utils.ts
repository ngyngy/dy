import { MovieResource } from '../types';

export function copyToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text).then(() => true).catch(() => false);
  } else {
    // Fallback for non-https or restricted iframe
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      textArea.remove();
      return Promise.resolve(true);
    } catch (error) {
      textArea.remove();
      return Promise.resolve(false);
    }
  }
}

export function parseSizeGB(sizeStr?: string): number {
  if (!sizeStr) return 0;
  const match = sizeStr.match(/([\d.]+)\s*G/i);
  if (match) {
    return parseFloat(match[1]);
  }
  return 0;
}

export const LOCAL_FAVORITES_KEY = 'dy_ngy123_favorites';
export const LOCAL_CUSTOM_MOVIES_KEY = 'dy_ngy123_custom_movies';

export function getFavoritesFromStorage(): string[] {
  try {
    const data = localStorage.getItem(LOCAL_FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

export function saveFavoritesToStorage(ids: string[]) {
  try {
    localStorage.setItem(LOCAL_FAVORITES_KEY, JSON.stringify(ids));
  } catch (e) {
    console.error('Failed to save favorites:', e);
  }
}

export function getCustomMoviesFromStorage(): MovieResource[] {
  try {
    const data = localStorage.getItem(LOCAL_CUSTOM_MOVIES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

export function saveCustomMoviesToStorage(movies: MovieResource[]) {
  try {
    localStorage.setItem(LOCAL_CUSTOM_MOVIES_KEY, JSON.stringify(movies));
  } catch (e) {
    console.error('Failed to save custom movies:', e);
  }
}
