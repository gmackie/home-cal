export enum ProteinType {
  CHICKEN,
  BEEF,
  FISH,
  SEAFOOD,
  TOFU,
  VEGETABLE,
}

export interface Meal {
  mealName: string;
  proteinType: ProteinType;
}

export interface MealCalendar {
  meal: Meal;
  date: Date;
}