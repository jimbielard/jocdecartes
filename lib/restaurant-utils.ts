export function average(values: number[]): number {
  if (!values.length) {
    return 0;
  }

  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

export function formatAverage(value: number): string {
  return Number(value).toLocaleString("ca-ES", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  });
}

export function getCategoryAverage(scores: Record<string, number>): number {
  const values = Object.values(scores);
  return average(values);
}
