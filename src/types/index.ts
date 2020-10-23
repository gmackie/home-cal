export enum ProteinType {
  CHICKEN = 'Chicken',
  BEEF = 'Beef',
  FISH = 'Fish',
  SEAFOOD = 'Seafood',
  TOFU = 'Tofu',
  VEGETABLE = 'Vegetable',
}

export interface Meal {
  mealName: string;
  proteinType: ProteinType;
}

export interface MealCalendar {
  meal: Meal;
  date: Date;
}