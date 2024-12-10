// Challenge: Create a basic Search Filter UI with the following requirements:
// 1. Display a list of sample items.
// 2. Include an input field for users to type a search query.
// 3. Style the UI for a clean and simple look.

// What Should Be Returned from the Search?
// In a full implementation of the Search Filter, the search input should dynamically filter the list of items based on the user's input. Here’s what you should aim for:

// Filtered List of Items:
// The component should display only the items that include the user’s search query (case-insensitive).
// For example, if the user types "ap", the list should show "Apple" and "Grapes" because both contain "ap".
// Example Output:
// Initial List:

// mathematica
// Copy code
// Apple, Banana, Orange, Mango, Grapes
// User Input: "ap"

// Filtered List:

// Copy code
// Apple, Grapes
// User Input: "m"

// Filtered List:
import styles from "./SearchFilterUi.module.css";
import { useState, useRef } from "react";

const fruitObj = [
  { name: "Apple", category: "Category 1" },
  { name: "Banana", category: "Category 1" },
  { name: "Orange", category: "Category 1" },
  { name: "Mango", category: "Category 1" },
  { name: "Grapes", category: "Category 1" },
  { name: "Peach", category: "Category 2" },
  { name: "Lemon", category: "Category 2" },
  { name: "Pineapple", category: "Category 2" },
  { name: "Strawberry", category: "Category 2" },
  { name: "Blueberry", category: "Category 2" },
];
const fruits = [
  { category1: ["Apple", "Banana", "Orange", "Mango", "Grapes"] },
  { category2: ["Peach", "Lemon", "Pineapple", "Strawberry", "Blueberry"] },
];

const SearchFilterUI = () => {
  const [filtered, setFiltered] = useState([]);
  const fruitRef = useRef(null);

  const handleSearch = () => {
    console.log(fruitRef.current.value);
    setFiltered(
      fruitObj
        .filter((fruit) => {
          return fruit.name
            .toLowerCase()
            .includes(fruitRef.current.value.trim().toLowerCase());
        })
        .map((fruit) => {
          return {
            name: fruit.name,
            category: fruit.category.toLowerCase().replace(" ", ""),
          };
        })
    );
  };

  const handleOption = (e) => {
    const filteredFruits = fruitObj
      .filter((fruit) => {
        return fruit.category.toLowerCase().replace(" ", "") === e.target.value;
      })
      .map((fruit) => {
        return {
          name: fruit.name,
          category: fruit.category.toLowerCase().replace(" ", ""),
        };
      });
    setFiltered(filteredFruits);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Search & Filter</h1>
      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Search..."
          className={styles.input}
          ref={fruitRef}
          onChange={handleSearch}
        />
        <select className={styles.select} onChange={handleOption}>
          <option value="all">All Categories</option>
          <option value="category1">Category 1</option>
          <option value="category2">Category 2</option>
        </select>
      </div>
      <ul className={styles.list}>
        {filtered.length > 0
          ? filtered.map((fruit) => (
              <li
                key={fruit.name}
                className={`${styles.listItem} ${
                  fruit.category === "category1"
                    ? styles.category1
                    : styles.category2
                }`}
              >
                {fruit.name}- {fruit.category}
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default SearchFilterUI;
