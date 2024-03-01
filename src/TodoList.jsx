import React, { useState } from "react";
import {
  Button,
  TextInput,
  rem,
  Text,
  Table,
  Checkbox,
  ScrollArea,
  Group,
  Avatar,
} from "@mantine/core";
import classes from "./TodoList.module.css";
import cx from "clsx";
import { useListState } from "@mantine/hooks";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { IconGripVertical } from "@tabler/icons-react";
import tableClasses from "./TableScrollArea.module.css";
import { Trash, Edit } from "tabler-icons-react";
import { MdOutlineTaskAlt } from "react-icons/md";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [focused, setFocused] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const floating = inputValue.trim().length !== 0 || focused || undefined;

  const addTodo = () => {
    if (inputValue.trim() !== "") {
      const newTodo = {
        id: new Date().toLocaleTimeString(),
        name: inputValue,
        completed: false
      };
      setTodos([...todos, newTodo]);
      setInputValue("");
    }
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter((ele) => ele.id !== id);
    setTodos([...newTodos]);
  };

  const editTodo = (id) => {
    const todoToEdit = todos.find(todo => todo.id === id);
    if (todoToEdit) {
      setInputValue(todoToEdit.name);
      setEditingId(id);
    }
  };

  const saveEdit = () => {
    if (inputValue.trim() !== '') {
      const editedTodos = todos.map(todo =>
        todo.id === editingId ? { ...todo, name: inputValue } : todo
      );
      setTodos(editedTodos);
      setInputValue('');
      setEditingId(null);
    }
  };

  const completeTodo = (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  }

  const rows = todos.map((row) => (
    <Table.Tr key={row.id} className="row-todo">
      <Table.Td>{row.id}</Table.Td>
      <Table.Td  style={{ textDecoration: row.completed ? 'line-through' : 'none' }}>{row.name}</Table.Td>
      <Table.Td>
        <Button onClick={() => deleteTodo(row.id)} variant="danger">
          <Trash size={22} strokeWidth={2} color={"white"} />
        </Button>
        <Button onClick={() => editTodo(row.id)} variant="edit">
          <Edit size={22} strokeWidth={1.5} color={"white"} />
        </Button>
        <Button onClick={() => completeTodo(row.id)} variant="complete">
          <MdOutlineTaskAlt accentHeight={100} />
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div>
      <h1>Todo List</h1>

      <div className="input-todo">
        <TextInput
          label="Add task name here..."
          required
          classNames={classes}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          mt="md"
          autoComplete="nope"
          data-floating={floating}
          labelProps={{ "data-floating": floating }}
        />

        {editingId === null ? (
        <Button className="todo-add-btn" onClick={addTodo} variant="primary">
        Add Task
      </Button>
      ) : (
        <Button className="todo-add-btn" onClick={saveEdit} variant="primary">
          Save
        </Button>
      )}
      </div>
      
      <div className="scroll-todo">
        <ScrollArea h={300} onScrollPositionChange={({ y }) => setScrolled(y !== 0)} >
          <Table miw={700}>
            <Table.Thead
              className={cx(tableClasses.header, {
                [tableClasses.scrolled]: scrolled,
              })}
            >
              <Table.Tr>
                <Table.Th>Created At</Table.Th>
                <Table.Th>Task description</Table.Th>
                <Table.Th>Action</Table.Th>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody className="table-todos">{rows}</Table.Tbody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
}

export default TodoList;
