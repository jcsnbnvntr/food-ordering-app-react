import React, { useCallback, useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem";
import Card from "../UI/Card";
import Search from "../UI/Search";
import useHttp from "../../hooks/use-http";

const AvailableMeals = () => {
  const [searchKey, setSearchKey] = useState(undefined);
  const [mealsList, setMealsList] = useState([]);
  const [filteredMealsList, setFilteredMealsList] = useState([]);
  const { isLoading, error, sendRequest: fetchMeals } = useHttp();

  const applyData = (meals) => {
    const loadedMeals = [];
    for (const key in meals) {
      const meal = {
        id: key,
        name: meals[key].name,
        description: meals[key].description,
        price: meals[key].price,
      };
      loadedMeals.push(meal);
    }
    setMealsList(loadedMeals);
    setFilteredMealsList(loadedMeals);
  };

  useEffect(() => {
    const requestConfig = {
      url: "https://food-ordering-app-react-3cdd7-default-rtdb.firebaseio.com/meals.json",
    };
    fetchMeals(requestConfig, applyData);
  }, [fetchMeals]);

  useEffect(() => {
    // cancel filtering if this component is rendered for the first time
    if (searchKey === undefined) return;

    // debouncing
    const timer = setTimeout(() => {
      const filteredMeals = mealsList.filter((meal) =>
        meal.name.toLocaleLowerCase().includes(searchKey.toLocaleLowerCase())
      );
      setFilteredMealsList(filteredMeals);
    }, 1000);

    // cleanup function
    return () => {
      // cancel the previous timer until the last timer is executed
      clearTimeout(timer);
    };
  }, [searchKey, mealsList]);

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
          {filteredMealsList.length > 0 &&
            filteredMealsList.map((meal) => {
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
          {isLoading && <h2>Loading...</h2>}
          {!isLoading && !error && filteredMealsList.length === 0 && (
            <h2>No results found</h2>
          )}
          {error && <h2>{error}</h2>}
        </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
