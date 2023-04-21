export const checkVal = (val: number, min: number, max: number) => {
  let temp = val;
  if (val > max) temp = max;
  if (val < min) temp = min;
  return temp;
};

export const splitString = (string: string) => {
  const myArray = [];

  const halfIndex = Math.ceil(string.length / 2);

  const firstHalf = string.slice(0, halfIndex);
  const secondHalf = string.slice(halfIndex);

  myArray.push(firstHalf);
  myArray.push(secondHalf);
  return myArray;
};

export const wrapText = (
  context: any,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) => {
  let words = text.split(" ");
  let line = "";

  for (let n = 0; n < words.length; n++) {
    let testLine = line + words[n] + " ";
    let metrics = context.measureText(testLine);
    let testWidth = metrics.width;

    if (testWidth > maxWidth && n > 0) {
      context.fillText(line, x, y);
      line = words[n] + " ";
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  context.fillText(line, x, y);
};
