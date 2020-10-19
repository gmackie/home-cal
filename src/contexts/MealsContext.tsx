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

const initialState: MealsContext = {
  meals: null,
  setMeals: (meals: Meal[] | null) => {},
  mealCalendars: null,
  setMealCalendars: (mealCalendars: MealCalendar[] | null) => {},
};
const MealsContext = createContext<MealsContext>(initialState);
function MealsContextProvider(props: MealsContextProviderProps) {
  const { children } = props;
  const [mealContext, setMealContext] = useState<MealsData>();
  const setMeals = (meals: Meal[] | null) => {
    setMealContext({
      ...mealContext,
      meals
    });
  };
  const setMealCalendars = (mealCalendars: MealCalendar[] | null) => {
    setMealContext({
      ...mealContext,
      mealCalendars
    });
  };

  useEffect(() => {
    if (!mealContext) {
      return;
    }
    const data = JSON.stringify(mealContext);
    localStorage.setItem("todo-points-auth", data);
  }, [mealContext]);
  const meals = mealContext ? mealContext.meals : [];
  const mealCalendars = mealContext ? mealContext.mealCalendars : [];
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
    return [];
  }
  return [];
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