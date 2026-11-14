/**
 * Resolves static asset paths accurately in development, preview, and GitHub Pages production.
 * Handles both relative and sub-path hosted deployments (e.g., https://username.github.io/AURA-GLOBAL/).
 */
export const getAssetPath = (path: string): string => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }

  const clean = path.replace(/^\/+/, '');

  if (typeof window !== 'undefined') {
    const pathname = window.location.pathname;
    if (pathname.includes('/AURA-GLOBAL')) {
      return `/AURA-GLOBAL/${clean}`;
    }
  }

  const base = (import.meta as any).env?.BASE_URL || './';
  const prefix = base.endsWith('/') ? base : `${base}/`;
  return `${prefix}${clean}`;
};
