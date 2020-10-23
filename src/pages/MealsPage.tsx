import React from 'react';
import { useMeals, useSetMeals } from '../contexts/MealsContext';
import MealsTable from '../components/MealsTable';
import { Meal } from '../types';

function MealsPage() {
  const meals = useMeals();
  console.log(JSON.stringify({meals}));
  const setMeals = useSetMeals();
  const onRowAdd = (meal: Meal) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        const newMeals = meals.concat(meal);
        setMeals(newMeals);
      }, 600);
    });
  };

  const onRowUpdate = (meal: Meal, oldMeal: Meal | undefined) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        if (oldMeal) {
          const newMeals = [...meals];
          newMeals[newMeals.indexOf(oldMeal)] = meal;
          setMeals(newMeals);
        }
      }, 600);
    });
  };

  const onRowDelete = (meal: Meal) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        const newMeals = meals.concat(meal);
        setMeals(newMeals);
      }, 600);
    });
  };

  return (
    <>      
      <h1>Manage Dinner Meals</h1>
      <MealsTable
        data={meals}
        onRowAdd={onRowAdd}
        onRowUpdate={onRowUpdate}
        onRowDelete={onRowDelete}
      />
    </>
  );
}

export default MealsPage;
