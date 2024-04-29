export const GetRandomNo = (InputNumber, InputNumberCount, setNumberList) => {
  function generateRandomMobileNumbers(userInput, numberOfSamples) {
    // Validate user input
    if (!/^\d{3,4}$/.test(userInput)) {
      alert("Invalid input. Please provide a 3 or 4 digit number.");
      return [];
    }

    const remainingDigits = 10 - userInput.length;
    const samples = [];
    for (let i = 0; i < numberOfSamples; i++) {
      const mobileNumber = generateMobileNumber(userInput, remainingDigits);
      samples.push({ id: i + 1, numbers: mobileNumber });
    }
    setNumberList(samples);
    return samples;
  }

  function generateMobileNumber(userInput, remainingDigits) {
    let mobileNumber = userInput;
    for (let i = 0; i < remainingDigits; i++) {
      mobileNumber += Math.floor(Math.random() * 10); // Generate a random digit (0-9)
    }
    return mobileNumber;
  }

  generateRandomMobileNumbers(InputNumber, InputNumberCount);
};
