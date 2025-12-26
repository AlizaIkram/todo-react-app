import { useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaSave } from "react-icons/fa";

export function InputForm() {
  const [todos, setTodos] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  function getUserInput(e) {
    setUserInput(e.target.value);
  }

  function addTodo() {
    if (!userInput) {
      return alert("Todo is required");
    }

    if (editIndex !== null) {
      const updatedTodos = [...todos];
      updatedTodos[editIndex] = userInput;
      setTodos(updatedTodos);
      setEditIndex(null);
      setUserInput("");
      return;
    }

    setTodos([...todos, userInput]);
    setUserInput("");
  }

 function deleteTodo(index) {
  const copy = [...todos];
  copy.splice(index, 1);
  setTodos(copy);

  if (editIndex === index) {
    // deleted task is being edited → clear edit mode
    setEditIndex(null);
    setUserInput("");
  } else if (editIndex > index) {
    // deleted task is above the one being edited → shift editIndex
    setEditIndex(editIndex - 1);
    setUserInput("");
  }
}


  function editTodo(index) {
    setUserInput(todos[index]);
    setEditIndex(index);
  }

  return (
    <div className="todo-container">
      <h2 className="todo-heading">To-Do List</h2>
      <div className="input-area">
        <input
          type="text"
          placeholder={editIndex !== null ? "Edit task..." : "Add a task..."}
          value={userInput}
          onChange={getUserInput}
        />
        <button className="add-btn" onClick={addTodo}>
          {editIndex !== null ? <FaSave /> : <FaPlus />}
        </button>
      </div>

      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index} className="todo-item">
            <span>{todo}</span>

            <div className="actions">
              {editIndex !== index && (
                <button onClick={() => editTodo(index)}>
                  <FaEdit />
                </button>
              )}
              <button onClick={() => deleteTodo(index)}>
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
