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
