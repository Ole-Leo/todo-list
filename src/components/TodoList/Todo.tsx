import { ITodo } from '../../store/todoStore';

type Props = {
  data: ITodo;
  onChange: Function;
  onClick: Function;
};

const Todo = ({ data, onChange, onClick }: Props) => {
  return (
    <li>
      <input
        style={{ cursor: 'pointer' }}
        type="checkbox"
        checked={data.completed}
        onChange={() => onChange(data.id)}
      />
      <span
        style={{
          textDecoration: data.completed ? 'line-through' : 'none',
        }}
      >
        {data.text}
      </span>
      <span style={{ cursor: 'pointer' }} onClick={() => onClick(data.id)}>
        &times;
      </span>
    </li>
  );
};

export default Todo;
