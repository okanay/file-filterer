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

export function parseLogDate(input: string) {
  const dateRegex =
    /\[(\d{4})(\d{2})(\d{2}) (\d{2}):(\d{2}):(\d{2})\.(\d{3})\]/;
  const dateInfo = input.match(dateRegex);

  if (
    dateInfo &&
    dateInfo[1] &&
    dateInfo[2] &&
    dateInfo[3] &&
    dateInfo[4] &&
    dateInfo[5] &&
    dateInfo[6]
  ) {
    const year = Number(dateInfo[1]);
    const month = Number(dateInfo[2]) - 1; // JavaScript'te ay 0 ile 11 arasında
    const day = Number(dateInfo[3]);
    const hours = Number(dateInfo[4]);
    const minutes = Number(dateInfo[5]);
    const seconds = Number(dateInfo[6]);
    const milliseconds = Number(dateInfo[7]);

    return new Date(year, month, day, hours, minutes, seconds, milliseconds);
  } else {
    return false;
  }
}
