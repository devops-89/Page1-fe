export default function useRandomColor() {
    const colors = [
      "#FFD700",
      "#90EE90",
      "#ADD8E6",
      "#FFB6C1",
      "#FFA07A",
      "#DDA0DD",
      "#87CEEB",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }