export type CellValues = [0 | 1 | 2, 0 | 1 | 2];

export type WinnerCells = {
  firstCell: CellValues;
  secondCell: CellValues;
  thirdCell: CellValues;
};

export type WinnerCombo = { combo: WinnerCells };

export const winnerCombos: WinnerCombo[] = [
  { combo: { firstCell: [0, 0], secondCell: [0, 1], thirdCell: [0, 2] } },
  { combo: { firstCell: [1, 0], secondCell: [1, 1], thirdCell: [1, 2] } },
  { combo: { firstCell: [0, 2], secondCell: [1, 2], thirdCell: [2, 2] } },
  { combo: { firstCell: [2, 0], secondCell: [2, 1], thirdCell: [2, 2] } },
  { combo: { firstCell: [0, 0], secondCell: [1, 0], thirdCell: [2, 0] } },
  { combo: { firstCell: [0, 0], secondCell: [1, 1], thirdCell: [2, 2] } },
  { combo: { firstCell: [0, 2], secondCell: [1, 1], thirdCell: [2, 0] } },
  { combo: { firstCell: [0, 1], secondCell: [1, 1], thirdCell: [2, 1] } },
];

export const winColor = "#1cff1d";
