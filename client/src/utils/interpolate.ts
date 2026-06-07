/**
 * Replaces {placeholder} tokens in a template with values.
 * @example interpolate('Hi {name}', { name: 'Sam' }) 
 */
export const interpolate = (
  template: string,
  vars: Record<string, string>,
): string => template.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? "");
