import React from 'react';
import reducer from '../reducers/reducer';
import nanoid from 'nanoid';

const App = () => {
  const [state, dispatch] = React.useReducer(reducer, {
    currentTodo: '',
    todos: [],
  });

  const add = () => {
    if (state.currentTodo) {
      dispatch({
        type: 'add',
        payload: {
          id: nanoid(),
          name: state.currentTodo,
          completed: false,
          createdAt: `${Date.now()}`,
        }
      });
      dispatch({ type: 'set-current', payload: '' });
    }
  };
  
  const edit = (todo) => {
    dispatch({ type: 'update', payload: todo });
  };

  const del = (todo) => {
    dispatch({ type: 'delete', payload: todo });
  };

  return (
    <>
      <header>
        <h2>To Do List</h2>
      </header>
      <main>
        <form
          onSubmit={event => {
            event.preventDefault();
            add();
          }}
        >
          <input
            type="text"
            value={state.currentTodo}
            onChange={event => {
              dispatch({ type: 'set-current', payload: event.target.value });
            }}
          />
          <button type='submit'>Add</button>
        </form>
        <ul>
          {state.todos.map(todo => (
            <li key={todo.id}>
              <input
                type="text"
                value={todo.name}
                onChange={event => {
                  edit({ ...todo, name: event.target.value });
                }}
              />
              <button
                onClick={() => {
                  del(todo);
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

export default App;
