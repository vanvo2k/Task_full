const randomArr = (arr) => {
  let result = [];
  for (let i = 5; i < arr.length; i = i + 5) {
    let index = 0;
    let n = 0;
    const arr2 = arr.slice(i - 5, i);
    while (n < 2) {
      if (index == 0) {
        const randomNumber = Math.round(Math.random() * 4);
        index = randomNumber;
        result.push(i - 5 + randomNumber);
      } else {
        let randomNumber = Math.round(Math.random() * 4);
        while (randomNumber == index) {
          randomNumber = Math.round(Math.random() * 4);
        }
        result.push(i - 5 + randomNumber);
      }
      n += 1;
    }
  }
  return result;
};

export const randomArrForTrial = (items, prefix = "") => {
  let n = 0;
  if (prefix === "products") {
    items.forEach(() => {
      n += 1;
    });
  } else {
    const x = items.filter((id) => {
      n += 1;
      return !!id;
    });
  }

  const result = randomArr(Array(n).fill(null));
  return result;
};
