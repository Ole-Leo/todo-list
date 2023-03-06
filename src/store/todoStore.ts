import { createStore } from 'custom-sm';

export interface ITodo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: ITodo[];
}

type TodoAction =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: number }
  | { type: 'DELETE_TODO'; payload: number };

function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'ADD_TODO':
      const newTodo: ITodo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      };
      return { ...state, todos: [...state.todos, newTodo] };
    case 'TOGGLE_TODO':
      const updatedTodos = state.todos.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
      return { ...state, todos: updatedTodos };
    case 'DELETE_TODO':
      const filteredTodos = state.todos.filter(
        todo => todo.id !== action.payload
      );
      return { ...state, todos: filteredTodos };
    default:
      return state;
  }
}

export const todoStore = createStore(todoReducer, { todos: [] });
