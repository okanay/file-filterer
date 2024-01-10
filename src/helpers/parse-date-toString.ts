export function parseDateToString(input: string) {
  const dateRegex = /\[(\d{4})(\d{2})(\d{2})/;
  const dateInfo = input.match(dateRegex);

  if (dateInfo && dateInfo[1] && dateInfo[2] && dateInfo[3]) {
    const year = Number(dateInfo[1]);
    const month = Number(dateInfo[2]) - 1; // JavaScript'te ay 0 ile 11 arasında
    const day = Number(dateInfo[3]);

    return new Date(year, month, day);
  } else {
    return false;
  }
}
