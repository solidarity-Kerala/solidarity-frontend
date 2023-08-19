// Define the updateHealthDetails function
export const updateHealthDetails = (data = {}) => {
  try {
    const { gender = "Male", presentWeight = 68, height = 160, dateOfBirth = new Date(), userActivenessStatus = "sedentary" } = data;

    // Calculate age based on date of birth
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    // Perform calculations or update health details based on the extracted data
    // Example: Calculate BMI (Body Mass Index)
    const heightInMeters = height / 100; // Convert height to meters
    const bmi = presentWeight / (heightInMeters * heightInMeters);

    // Calculate BMR (Basal Metabolic Rate)
    let bmr;
    if (gender === "Male") {
      bmr = 10 * presentWeight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * presentWeight + 6.25 * height - 5 * age - 161;
    }

    // Define activity factors and their corresponding values
    const activityFactors = {
      sedentary: 1.2,
      lightlyactive: 1.375,
      moderatelyactive: 1.55,
      veryactive: 1.725,
      superactive: 1.9,
    };

    // Convert the provided activityFactor value to lowercase
    const normalizedActivityFactor = userActivenessStatus.toLowerCase();

    // Check if the provided activityFactor exists in the activityFactors object
    const selectedActivityFactor = activityFactors.hasOwnProperty(normalizedActivityFactor) ? activityFactors[normalizedActivityFactor] : 1.2; // Default to sedentary activity factor if not found

    // Calculate daily calorie needs (using BMR and activity factor)
    const calories = bmr * selectedActivityFactor;

    // Calculate percentages of carbs, fat, and protein (based on total calories)
    const percentageOfCarbs = (calories * 0.5) / 4; // 50% of total calories, assuming 4 calories per gram of carbs
    const percentageOfFat = (calories * 0.3) / 9; // 30% of total calories, assuming 9 calories per gram of fat
    const percentageOfProtein = (calories * 0.2) / 4; // 20% of total calories, assuming 4 calories per gram of protein

    // Update the data object with the calculated values
    data.bmi = isNaN(bmi) ? 0 : bmi;
    data.bmr = isNaN(bmr) ? 0 : bmr;
    data.calories = isNaN(calories) ? 0 : calories;
    data.percentageOfCarbs = isNaN(percentageOfCarbs) ? 0 : percentageOfCarbs;
    data.percentageOfFat = isNaN(percentageOfFat) ? 0 : percentageOfFat;
    data.percentageOfProtein = isNaN(percentageOfProtein) ? 0 : percentageOfProtein;

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const updateCaloriDetails = (data = {}) => {
  try {
    const { calories = 1000 } = data;

    // Calculate percentages of carbs, fat, and protein (based on total calories)
    const percentageOfCarbs = (calories * 0.5) / 4; // 50% of total calories, assuming 4 calories per gram of carbs
    const percentageOfFat = (calories * 0.3) / 9; // 30% of total calories, assuming 9 calories per gram of fat
    const percentageOfProtein = (calories * 0.2) / 4; // 20% of total calories, assuming 4 calories per gram of protein

    // Update the data object with the calculated values
    data.percentageOfCarbs = isNaN(percentageOfCarbs) ? 0 : percentageOfCarbs;
    data.percentageOfFat = isNaN(percentageOfFat) ? 0 : percentageOfFat;
    data.percentageOfProtein = isNaN(percentageOfProtein) ? 0 : percentageOfProtein;

    console.log("updateCaloriDetails", data);
  } catch (error) {
    console.log(error);
  }
};
