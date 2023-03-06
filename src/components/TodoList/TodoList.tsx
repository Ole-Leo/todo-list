import Todo from './Todo';
import { useEffect, useState } from 'react';
import { todoStore } from '../../store/todoStore';

const TodoList = () => {
  const { todos: data } = todoStore.getState();

  const [text, setText] = useState('');
  const [todos, setTodos] = useState(data);

  useEffect(() => {
    const subscribe = todoStore.subscribe(() => {
      setTodos(todoStore.getState().todos);
    });

    return subscribe;
  }, []);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const addTodoHandler = () => {
    todoStore.dispatch({ type: 'ADD_TODO', payload: text });
    setText('');
  };

  const toggleHandler = (id: number) => {
    todoStore.dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  const deleteHandler = (id: number) => {
    todoStore.dispatch({ type: 'DELETE_TODO', payload: id });
  };

  return (
    <div>
      <input
        style={{ marginRight: '5px', width: '300px' }}
        type="text"
        value={text}
        onChange={handleTextChange}
      />
      <button style={{ cursor: 'pointer' }} onClick={addTodoHandler}>
        Add Todo
      </button>
      <ul>
        {todos.map(todo => (
          <Todo
            key={todo.id}
            data={todo}
            onChange={toggleHandler}
            onClick={deleteHandler}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
