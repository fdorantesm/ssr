import produce from 'immer';

type Todo = {
  id: string;
  name: string;
  createdAt: string;
  completed: boolean;
};

type State = {
  todos: Todo[];
  currentTodo: string;
};

type Action = 
| { type: 'add' | 'update' | 'delete'; payload: Todo }
| { type: 'set-current'; payload: string };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'set-current': {
      return produce(state, draft => {
        draft.currentTodo = action.payload;
      });
    }
    case 'add': {
      return produce(state, draft => {
        draft.todos.push(action.payload);
      });
    }
    case 'update': {
      const todoIndex = state.todos.findIndex(
        todo => todo.id ===action.payload.id
      );
      if (todoIndex === -1) return state;
      return produce(state, draft => {
        draft.todos[todoIndex] = { ...action.payload };
      });
    }
    case 'delete': {
      const todoIndex = state.todos.findIndex(
        todo => todo.id === action.payload.id
      );
      if (todoIndex === -1) return state;
      return produce(state, draft => {
        draft.todos.splice(todoIndex, 1);
      });
    }
    default: {
      throw new Error(`Unsupported action ${JSON.stringify(action)}`);
    }
  }
};

export default reducer;
