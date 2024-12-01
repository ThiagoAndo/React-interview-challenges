const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 8080;

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json()); // Parse JSON request bodies

// In-memory database (simulates a database)
let items = [];
let idCounter = 1;

// Routes

// Get all items (READ)
app.get("/items", (req, res) => {
  res.json(items);
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
