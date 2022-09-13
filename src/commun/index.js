
const letters = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const model = '~xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';
const randomInt = (max, min = 0) => Number.parseInt((Math.random() * (max - min) + min), 10);
export const idGenerator = (prefix = '') => {
  let aux;
  let status = true;
  const id = model.replace(/x/g, () => {
    const letterOrNum = randomInt(100); // proportional probability 65|35
    let charPosition, str, char;
    while(status === true) {
      if(letterOrNum > 65) {
        str = numbers;
      } else {
        str = letters;
      }
      charPosition = randomInt(str.length);
      char = str[charPosition];
      if(char !== aux) {
        aux = char;
        status = false;
      }
    }
    status = true;
    return char;
  });
  return `${prefix}${id}`;
}
