import { ExclamationCircleIcon } from "@heroicons/react/solid";
import { handleAddNewTodoFn, handleSetInputFn } from "types/types";

interface NewTodoProps {
  handleSetInput: handleSetInputFn;
  handleAddNewTodo: handleAddNewTodoFn;
  input: string;
  error: boolean;
}

export function NewTodo({
  handleSetInput,
  handleAddNewTodo,
  input,
  error,
}: NewTodoProps): JSX.Element {
  return (
    <form onSubmit={handleAddNewTodo} autoComplete="off">
      <label
        htmlFor="title"
        className="block text-sm font-medium text-gray-700"
      >
        New Todo
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          type="text"
          name="title"
          id="title"
          className={`block w-full pr-10 focus:outline-none sm:text-sm rounded-md ${
            error
              ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
              : ""
          }`}
          placeholder="i.e. prepare dinner"
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? "title-error" : ""}
          value={input}
          onChange={handleSetInput}
        />
        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 my-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add
      </button>
      {error && (
        <p className="mt-2 text-sm text-red-600" id="title-error">
          Todo must be longer than 3 characters.
        </p>
      )}
    </form>
  );
}
