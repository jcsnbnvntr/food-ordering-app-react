import React, { useCallback, useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem";
import Card from "../UI/Card";
import Search from "../UI/Search";

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Sushi",
    description: "Finest fish and veggies",
    price: 22.99,
  },
  {
    id: "m2",
    name: "Schnitzel",
    description: "A german specialty!",
    price: 16.5,
  },
  {
    id: "m3",
    name: "Barbecue Burger",
    description: "American, raw, meaty",
    price: 12.99,
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 18.99,
  },
];

const AvailableMeals = () => {
  const [searchKey, setSearchKey] = useState(undefined);
  const [mealsList, setMealsList] = useState([...DUMMY_MEALS]);

  useEffect(() => {
    // cancel filtering if this component is rendered for the first time
    if (searchKey === undefined) return;

    // debouncing
    const timer = setTimeout(() => {
      const filteredMeals = DUMMY_MEALS.filter((meal) =>
        meal.name.toLocaleLowerCase().includes(searchKey.toLocaleLowerCase())
      );
      setMealsList(filteredMeals);
    }, 1000);

    // cleanup function
    return () => {
      // cancel the previous timer until the last timer is executed
      clearTimeout(timer);
    };
  }, [searchKey]);

  const searchHandler = useCallback((ev) => {
    const key = ev.target.value;
    setSearchKey(key.trim());
  }, []);

  const clearHandler = useCallback(() => {
    setSearchKey("");
  }, []);

  return (
    <section className={classes.meals}>
      <Card>
        <Search
          value={searchKey}
          onSearch={searchHandler}
          onClear={clearHandler}
          showClearButton={searchKey?.trim().length > 0}
        />
        <ul>
          {mealsList.length > 0 &&
            mealsList.map((meal) => {
              return (
                <MealItem
                  id={meal.id}
                  key={meal.id}
                  name={meal.name}
                  description={meal.description}
                  price={meal.price}
                />
              );
            })}
          {mealsList.length === 0 && <h2>No results found</h2> /* fallback */}
        </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
