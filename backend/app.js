const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 8080;

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json()); // Parse JSON request bodies

// In-memory database (simulates a database)
let items = [
  {
    id: 1,
    name: "The impediment to action advances action,What stands in the way becomes the way.",
  },
  {
    id: 2,
    name: "Very little is need to make a happy life; it is all within yourself, in your way of think.",
  },
  {
    id: 3,
    name: "It is not deth that a man should fear, but he should fear never beginning to live.",
  },
  {
    id: 4,
    name: "You have power over your mind - not outside events. Realize this, and you will find strength.",
  },
  {
    id: 5,
    name: "The universe is transformation: life is opinion.",
  },
  {
    id: 6,
    name: "Life is really simple, but we insist on making it complicated.",
  },
];

let idCounter = 7;

// Routes

// Get all items (READ)
app.get("/items", (req, res) => {
  setTimeout(() => {
    res.json(items);
  }, 2000);
});

// Add a new item (CREATE)
app.post("/items", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Item name is required." });
  }
  const newItem = { id: idCounter++, name };
  items.push(newItem);
  res.status(201).json(newItem);
});

// Update an item (UPDATE)
app.put("/items/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const item = items.find((item) => item.id === parseInt(id));
  if (!item) {
    return res.status(404).json({ error: "Item not found." });
  }
  if (!name) {
    return res.status(400).json({ error: "Item name is required." });
  }

  item.name = name;
  res.json(item);
});

// Delete an item (DELETE)
app.delete("/items/:id", (req, res) => {
  const { id } = req.params;

  const index = items.findIndex((item) => item.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: "Item not found." });
  }

  items.splice(index, 1);
  res.json({ message: "Item deleted successfully." });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// <ul style={{ textAlign: "left", margin: "0 auto", maxWidth: "400px" }}>
//   {data.length > 0 ? (
//     data.map((item) => (
//       <li key={item.id}>
//         {item.name} <button style={{ marginLeft: "10px" }}>Edit</button>
//         <button>Delete</button>
//       </li>
//     ))
//   ) : (
//     <li>Add a Item to display it on the screen</li>
//   )}
// </ul>;
