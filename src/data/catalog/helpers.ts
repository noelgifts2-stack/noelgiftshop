/**
 * Calculateur de code EAN-13 mathématiquement conforme (Algorithme officiel GS1 Modulo 10)
 * Google Merchant Center valide mathématiquement le dernier chiffre de contrôle.
 */
export function generateValidEan13(prefix12: string): string {
  if (prefix12.length !== 12) {
    prefix12 = prefix12.padStart(12, '3');
  }
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    const digit = parseInt(prefix12[i], 10);
    sum += i % 2 === 0 ? digit * 1 : digit * 3;
  }
  const checksum = (10 - (sum % 10)) % 10;
  return `${prefix12}${checksum}`;
}
