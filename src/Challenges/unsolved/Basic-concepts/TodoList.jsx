import React from "react";
import { useState, useRef } from "react";

// Challenge: Create a basic To-Do List UI with the following requirements:
// 1. Display a list of sample tasks.
// 2. Include an input field for users to enter a new task.
// 3. Add a button to "Add" a task (placeholder, no logic required).
// 4. Each task in the list should have a "Delete" button (placeholder, no logic required).
// 5. Style the UI for a clean and simple look.

const ToDoListUI = () => {
  const [todos, setTodos] = useState([]);
  const inputRef = useRef(null);

  const handleTodo = (call) => {
    setTodos((prev) => {
      return [...prev, inputRef.current.value];
    });
  };

  const deleteTodo = (index) => {
    setTodos(
      todos.filter((todo, i) => {
        if (i != index) {
          return todo;
        }
      })
    );
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>To-Do List</h2>

      {/* Input field for new task */}
      <input
        type="text"
        placeholder="Enter a new task"
        style={{ padding: "10px", width: "200px" }}
        ref={inputRef}
      />

      {/* Add button (placeholder, no logic) */}
      <button
        style={{ marginLeft: "10px", padding: "10px" }}
        onClick={handleTodo}
      >
        Add
      </button>

      {/* Sample list of tasks */}
      <ul style={{ listStyleType: "none", padding: "20px" }}>
        {todos.map((todo, index) => (
          <li style={{ marginBottom: "10px" }}>
            {todo}
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => {
                deleteTodo(index);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoListUI;

const MediLevelToDoListUI = () => {
  const [todo, setTodo] = useState([]);
  const [display, setDisplay] = useState("all");
  let todoList = [];
  const todoRef = useRef(null);

  const addTodo = () => {
    const newTodo = todoRef.current.value;
    const hasTodo = todo.map((t) => {
      if (t.task === newTodo) return true;
      else return false;
    });

    if (hasTodo.includes(true)) {
      alert("Todo alredy in the list");
      return;
    }
    todoRef.current.value = "";
    setTodo((prev) => [{ status: "active", task: newTodo }, ...prev]);
  };

  const markTodo = (i) => {
    setTodo(
      todo.map((t, index) => {
        if (i === index) return { status: "completed", task: t.task };
        else return t;
      })
    );
  };

  const filterTodo = (par) => {
    const ret = todo.filter((t) => {
      if (t.status === par) {
        return t;
      }
    });
    return ret;
  };

  const displayTodo = (par) => {
    setDisplay(par);
  };

  if (display === "all") {
    todoList = todo;
  }

  if (display === "active") {
    todoList = filterTodo("active");
  }

  if (display === "completed") {
    todoList = filterTodo("completed");
  }

  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        maxWidth: "400px",
        margin: "0 auto",
      }}
    >
      <h2>To-Do List</h2>

      {/* Input Field and Add Button */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter a new task"
          style={{ padding: "10px", width: "70%" }}
          ref={todoRef}
        />
        <button
          onClick={addTodo}
          style={{ padding: "10px", marginLeft: "10px" }}
        >
          Add Task
        </button>
      </div>

      {/* Task List */}
      <ul style={{ listStyleType: "none", padding: "0" }}>
        {todoList.map((t, i) => (
          <li
            key={t.task}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            {t.status === "active" ? (
              <input
                onChange={() => {
                  markTodo(i);
                }}
                type="checkbox"
                style={{ marginRight: "10px" }}
              />
            ) : null}
            <span
              style={
                t.status === "completed"
                  ? { textDecoration: "line-through" }
                  : null
              }
            >
              {t.task}
            </span>
          </li>
        ))}
      </ul>

      {/* Filter Buttons */}
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => {
            displayTodo("all");
          }}
          style={{ padding: "10px", marginRight: "10px" }}
        >
          All
        </button>
        <button
          onClick={() => {
            displayTodo("active");
          }}
          style={{ padding: "10px", marginRight: "10px" }}
        >
          Active
        </button>
        <button
          onClick={() => {
            displayTodo("completed");
          }}
          style={{ padding: "10px" }}
        >
          Completed
        </button>
      </div>
    </div>
  );
};
/*

Why Should We Copy Objects When Updating in JavaScript?
In JavaScript, when you update an object or array directly, it can lead to
 unexpected behavior, especially in frameworks like React that rely on immutability.

1. Mutating the Original Object (Direct Modification)
When you directly modify an object or array, you’re mutating the original data.
 This can cause issues because:

Unpredictable Side Effects: If other parts of your code are referencing the same 
object, they will also see the changes, even if they didn’t intend to.
React State Won’t Detect Changes: React relies on shallow comparison to detect changes.
 If you mutate the object directly, React might not detect the change, and the UI may
  not update as expected.
Example:


Copy code
const person = { name: "Alice", age: 25 };

// Mutating the object directly
person.age = 26;
console.log(person.age); // Output: 26

In this example, we directly modified person.age, so any part of the code
referencing person will see the updated value.

2. Copying the Object (Immutability)
Instead of modifying the object directly, we create a copy of the object and update 
the copy. This approach is called immutability.

Why It’s Better:

No Side Effects: Changes are localized and do not affect other parts of the code.
Easier Debugging: You have predictable data flow, which makes debugging simpler.
React Can Detect Changes: When you create a new object, React can see that the
reference has changed and trigger a re-render.

Example:
const person = { name: "Alice", age: 25 };

Creating a new object with the updated value
const updatedPerson = { ...person, age: 26 };
console.log(person.age); // Output: 25 (original object is unchanged)
console.log(updatedPerson.age); // Output: 26 (new object has the update)

Immutability in React State
In React, state updates should always be immutable because React uses referential
equality to detect changes.

Bad Example (Mutating State):
const [todos, setTodos] = useState([{ task: "Learn React" }]);

const addTodo = () => {
  todos.push({ task: "Build a project" });
  setTodos(todos); // This won't trigger a re-render!
};
Good Example (Immutable State Update):


const [todos, setTodos] = useState([{ task: "Learn React" }]);

const addTodo = () => {
  const newTodos = [...todos, { task: "Build a project" }];
  setTodos(newTodos); // React sees the new reference and triggers a re-render.
};
Summary
Mutating objects directly can lead to unpredictable bugs and make 
it harder to track changes.
Copying objects (using spread operator ..., Array.prototype.map(),
 Object.assign(), etc.) helps ensure that your data remains predictable and
  safe from side effects.
In React, immutability is crucial for state updates because it allows React
 to detect changes and update the UI efficiently.
Let me know if you need more examples or want to dive deeper into this topic! 😊

You said:
what is shallow comparison ?

Shallow comparison is a method of comparing two objects or arrays by checking
if their references are the same or if their top-level properties are equal.
It does not compare nested objects or deeper structures.

Shallow Comparison in JavaScript
In JavaScript, shallow comparison typically involves using the === operator 
for objects and arrays. This checks whether two variables point to the same memory reference.

Example 1: Shallow Comparison with Primitives

const a = 5;
const b = 5;

console.log(a === b); // true (because both values are the same)
Example 2: Shallow Comparison with Objects

const obj1 = { name: "Alice" };
const obj2 = { name: "Alice" };
console.log(obj1 === obj2); // false (different references)

Even though obj1 and obj2 have the same content, they are different
objects in memory, so === returns false.

Example 3: Comparing Object References
const obj1 = { name: "Alice" };
const obj2 = obj1;

console.log(obj1 === obj2); // true (same reference)
Here, obj2 points to the same memory location as obj1, so the comparison returns true.

Shallow Comparison in React
React uses shallow comparison to determine whether a component should re-render.
When you update the state or props of a component, React checks if the references have changed:

If the reference is the same, React assumes nothing has changed and skips the re-render.
If the reference is different, React triggers a re-render because it assumes the data has changed.
Example:

const [state, setState] = useState({ count: 0 });
Mutating the state directly (bad practice)
state.count = 1;
setState(state); // React may not detect this change!

// Creating a new object (good practice)
setState({ ...state, count: 1 }); // React detects the change and re-renders
In the first case, React does a shallow comparison and sees the same reference
(state didn’t change), so it might skip the re-render. In the second case, a
new object is created, so React sees a different reference and triggers the re-render.

Deep Comparison
In contrast, deep comparison checks every nested property of an object or array. 
This can be very slow for large or complex data structures, which is why React 
generally uses shallow comparison for performance reasons.

Example of Deep Comparison:
const obj1 = { name: "Alice", details: { age: 25 } };
const obj2 = { name: "Alice", details: { age: 25 } };

function deepEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}
console.log(deepEqual(obj1, obj2)); // true (deep comparison checks nested properties)

Summary
Shallow Comparison:
Only checks the top-level properties or references.
Fast but might miss changes in nested structures.
Used by React for state and prop comparisons.
Deep Comparison:

Checks all properties, including nested objects.
More accurate but slower.
Not commonly used by React due to performance concerns.
Shallow comparison is crucial for React’s performance optimization because 
it allows for efficient updates without checking every single property of complex objects.
*/
