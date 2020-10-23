import React, { createContext, useContext, useEffect, Dispatch, useState } from 'react';
import { Meal, MealCalendar } from '../types';

interface MealsContextProviderProps {
  children?: React.ReactNode;
}

interface MealsData {
  meals?: Meal[] | null;
  mealCalendars?: MealCalendar[] | null;
}
interface MealsContext extends MealsData {
  setMeals: Dispatch<Meal[] | null>;
  setMealCalendars: Dispatch<MealCalendar[] | null>;
}

const localData = localStorage.getItem('meals-context') || '{}';
const localState: MealsData = JSON.parse(localData);
console.log(JSON.stringify({localState}))
const initialState: MealsContext = {
  ...localState,
  setMeals: (meals: Meal[] | null) => {},
  setMealCalendars: (mealCalendars: MealCalendar[] | null) => {},
};
const MealsContext = createContext<MealsContext>(initialState);
function MealsContextProvider(props: MealsContextProviderProps) {
  const { children } = props;
  const [mealData, setMealData] = useState<MealsData>(initialState);
  const setMeals = (meals: Meal[] | null) => {
    setMealData({
      ...mealData,
      meals
    });
  };
  const setMealCalendars = (mealCalendars: MealCalendar[] | null) => {
    setMealData({
      ...mealData,
      mealCalendars
    });
  };

  useEffect(() => {
    if (!mealData) {
      return;
    }
    const data = JSON.stringify(mealData);
    localStorage.setItem("meals-context", data);
  }, [mealData]);
  console.log(JSON.stringify({mealData}));
  const meals = mealData ? mealData.meals : [];
  const mealCalendars = mealData ? mealData.mealCalendars : [];
  const value: MealsContext = {
    meals,
    setMeals,
    mealCalendars,
    setMealCalendars
  }
  return (
    <MealsContext.Provider value={value}>
      {children}
    </MealsContext.Provider>
  );
}

function useSetMeals(): Dispatch<Meal[] | null> {
  const { setMeals } = useContext(MealsContext);
  return setMeals;
}

function useMeals() : Meal[] {
  const { meals } = useContext(MealsContext);
  if (!meals) {
    console.log('meals was null');
    return [];
  }
  console.log(JSON.stringify(meals))
  return meals;
}

function useSetMealCalendars(): Dispatch<MealCalendar[] | null> {
  const { setMealCalendars } = useContext(MealsContext);
  return setMealCalendars;
}

function useMealCalendars() : MealCalendar[] {
  const { mealCalendars } = useContext(MealsContext);
  if (!mealCalendars) {
    return [];
  }
  return mealCalendars;
}

export { MealsContextProvider, useSetMeals, useMeals, useMealCalendars, useSetMealCalendars };