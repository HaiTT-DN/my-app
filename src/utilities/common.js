const generateRandomColor = () => {
  const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  return randomColor.toUpperCase();
};

const generateOptions = (correctColor) => {
  const options = [];
  options.push(correctColor);

  for (let i = 0; i < 2; i++) {
    let randomColorText = generateRandomColor();
    while (randomColorText === correctColor) {
      randomColorText = generateRandomColor();
    }
    options.push(randomColorText);
  }

  return options.sort(() => Math.random() - 0.5);
};

export { generateRandomColor, generateOptions };
