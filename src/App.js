import FecthJsonPlaceholder from "./Challenges/unsolved/API-integration/FecthJsonPlaceholder";
import CRUDAppUI from "./Challenges/unsolved/API-integration/CRUDperations";
import PaginationUI from "./Challenges/unsolved/API-integration/Pagination.";
function App() {
  return <PaginationUI />;
}

export default App;
 // CRUD Operations Challenge:
  /**
1. Set Up State Management
Use useState to manage:
The list of items.
The current value of the input field (for creating and updating items).
A selected item to edit (if any).
A success message to display for user feedback.

2. Create Operation
Add functionality to the "Add Item" button:
Take the value from the input field.
Append it to the list of items in state.
Clear the input field after adding.
Display a success message (e.g., "Item added successfully!").

3. Read Operation
Render the current list of items dynamically using .map() in the <ul> tag.

4. Update Operation
Add an "Edit" button next to each item:
Clicking it should populate the input field with the selected item's value.
Replace the item in the list when the user submits the changes.
Show a success message (e.g., "Item updated successfully!").
Bonus: Use a modal for editing instead of inline editing.

5. Delete Operation
Add a "Delete" button next to each item:
Clicking it should remove the item from the list.
Show a success message (e.g., "Item deleted successfully!").

6. Display Success Messages
After any operation, show a brief success message.
Use setTimeout to clear the message after a few seconds.

7. Styling and Enhancements
Ensure the UI is visually appealing (e.g., add hover effects to buttons).
Use a modal library (or create a simple modal component) for the "Edit" form.
   */