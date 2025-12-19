// Utilidades de formato

/**
 * Formatea un número eliminando decimales innecesarios
 * Ejemplos: 800 -> "800", 800.5 -> "800.5", 800.00 -> "800"
 */
export function formatNumber(value: number, maxDecimals: number = 2): string {
  const rounded = Math.round(value * Math.pow(10, maxDecimals)) / Math.pow(10, maxDecimals);
  return rounded % 1 === 0 ? rounded.toFixed(0) : rounded.toFixed(maxDecimals).replace(/\.?0+$/, '');
}

/**
 * Formatea un valor en gramos
 * Ejemplos: 800 -> "800g", 1500 -> "1.5kg"
 */
export function formatGrams(grams: number): string {
  if (grams >= 1000) {
    return `${formatNumber(grams / 1000)} kg`;
  }
  return `${formatNumber(grams)} g`;
}

/**
 * Formatea un valor en soles peruanos
 * Ejemplos: 36 -> "S/ 36.00", 36.5 -> "S/ 36.50"
 */
export function formatCurrency(amount: number): string {
  return `S/ ${amount.toFixed(2)}`;
}

/**
 * Formatea un valor en miles
 * Ejemplos: 24500 -> "24.5K", 1000 -> "1K"
 */
export function formatThousands(value: number): string {
  if (value >= 1000) {
    return `S/ ${formatNumber(value / 1000, 1)}K`;
  }
  return `S/ ${formatNumber(value)}`;
}
