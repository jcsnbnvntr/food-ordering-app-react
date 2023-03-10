import { useCallback, useEffect, useState } from "react";

import Card from "../UI/Card";
import MealItem from "./MealItem";
import Search from "../UI/Search";
import classes from "./AvailableMeals.module.css";
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
        name: meals[key].name, // firebase-specific => "name" contains generated id
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
          placeholder="Search food you love"
          onSearch={searchHandler}
          onClear={clearHandler}
          showClearButton={searchKey?.trim().length > 0} // optional chaining - if searchKey is truthy, then invoke trim()
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
