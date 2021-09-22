import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import gql from "graphql-tag";

import { Header } from "components/Header";
import { NewTodo } from "components/NewTodo";
import { TodoList } from "components/TodoList";

import { handleAddNewTodoFn, handleSetInputFn } from "types/types";
import { MutationUpdaterFn } from "apollo-client";

function Homepage(): JSX.Element {
  const [inputError, setInputError] = useState(false);
  const [input, setInput] = useState("");

  const { error, loading, data } = useQuery(GET_MY_TODOS);

  const updateCache: MutationUpdaterFn<{
    insert_todos: {
      returning: number[];
    };
  }> = (cache, { data }): null | void => {
    // Fetch the todos from the cache
    const existingTodos = cache.readQuery({
      query: GET_MY_TODOS,
    });
    // Add the new todo to the cache
    const newTodo = data?.insert_todos.returning[0];
    cache.writeQuery({
      query: GET_MY_TODOS,
      data: { todos: [newTodo, ...existingTodos.todos] },
    });
  };

  const handleResetInput = () => {
    setInput("");
  };

  const [addTodo] = useMutation(ADD_TODO, {
    update: updateCache,
    onCompleted: handleResetInput,
  });

  const [toggleTodoMutation] = useMutation(TOGGLE_TODO);

  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }

  const handleAddNewTodo: handleAddNewTodoFn = async (event) => {
    event.preventDefault();
    if (input.length < 4) {
      setInputError(true);
      return;
    }
    setInputError(false);
    await addTodo({
      variables: {
        todo: input,
        isPublic: false,
      },
    });
  };

  const handleSetInput: handleSetInputFn = (event) => {
    setInput(event.target.value);
  };

  return (
    <div>
      <main className="p-4">
        <Header />
        <div className="flex flex-col pt-4">
          <NewTodo
            handleSetInput={handleSetInput}
            handleAddNewTodo={handleAddNewTodo}
            input={input}
            error={inputError}
          />
          {<TodoList todos={data?.todos} loading={loading} />}
        </div>
      </main>

      <style jsx>{``}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}

export default Homepage;

const GET_MY_TODOS = gql`
  query getMyTodos {
    todos(
      where: { is_public: { _eq: false } }
      order_by: { created_at: desc }
    ) {
      id
      title
      created_at
      is_completed
    }
  }
`;

const ADD_TODO = gql`
  mutation ($todo: String!, $isPublic: Boolean!) {
    insert_todos(objects: { title: $todo, is_public: $isPublic }) {
      affected_rows
      returning {
        id
        title
        created_at
        is_completed
      }
    }
  }
`;

const TOGGLE_TODO = gql`
  mutation toggleTodo($id: Int!, $isCompleted: Boolean!) {
    update_todos(
      where: { id: { _eq: $id } }
      _set: { is_completed: $isCompleted }
    ) {
      affected_rows
    }
  }
`;
