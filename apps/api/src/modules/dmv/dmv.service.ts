export const dmvService = {
  getVehicleInfo: async (_licensePlate: string) => {
    const mockVehicles = [
      { make: "Toyota", model: "Camry", year: 2020, color: "Red" },
      { make: "Honda", model: "Civic", year: 2019, color: "Blue" },
      { make: "Ford", model: "F-150", year: 2021, color: "Black" },
      { make: "Chevrolet", model: "Malibu", year: 2018, color: "Silver" },
      { make: "Nissan", model: "Altima", year: 2022, color: "White" },
      { make: "Tesla", model: "Model 3", year: 2023, color: "Gray" },
      { make: "BMW", model: "X5", year: 2021, color: "Green" },
      { make: "Mercedes", model: "C-Class", year: 2020, color: "Black" },
      { make: "Audi", model: "A4", year: 2019, color: "Blue" },
      { make: "Hyundai", model: "Sonata", year: 2022, color: "Red" },
    ];

    const randomIndex = Math.floor(Math.random() * mockVehicles.length);
    return mockVehicles[randomIndex];
  },
};
