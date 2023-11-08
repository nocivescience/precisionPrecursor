function generateRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }
  
  function doubleNumber(number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(number * 2);
      }, 1000); // Simulamos una operación demorada con setTimeout
    });
  }
  
  function squareNumber(number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(number * number);
      }, 1000);
    });
  }
  
  const randomNumbers = Array.from({ length: 5 }, () =>
    generateRandomNumber(1, 10)
  );
  
  const doublePromises = randomNumbers.map((number) => doubleNumber(number));
  const squarePromises = randomNumbers.map((number) => squareNumber(number));
  
  Promise.all([...doublePromises, ...squarePromises])
    .then((results) => {
      console.log('Números duplicados:', results.slice(0, 5));
      console.log('Números al cuadrado:', results.slice(5));
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  