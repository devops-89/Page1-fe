const COLORS = ["#FFD700", "#90EE90", "#87CEEB", "#FFB6C1", "#FFA07A"];

export function getRandomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}