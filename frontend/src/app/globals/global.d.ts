export interface Make {
  makeId: string;
  name: string;
}

export interface Category {
  categoryId: string;
  name: string;
}

export interface Car {
  carId: number;
  make: Make;
  model: string;
  year: number;
  imageUrl: string;
  mileage: number;
  licensePlate: string;
  category: Category;
  pricePerDay: number;
}
