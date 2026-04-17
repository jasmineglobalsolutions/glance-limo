const FALLBACK_SLUG = 'service-card';

export function slugifySegment(value: string) {
  const slug = value
    .toLowerCase()
    .trim()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return slug || FALLBACK_SLUG;
}

export function buildServiceCardSlug(title: string, id: string) {
  return slugifySegment(title);
}

export function extractServiceCardId(slug: string) {
  if (!slug) {
    return slug;
  }

  const delimiterIndex = slug.lastIndexOf('-');
  if (delimiterIndex === -1) {
    return slug;
  }

  return slug.slice(delimiterIndex + 1);
}
