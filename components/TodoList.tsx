import { CalendarIcon } from "@heroicons/react/solid";

interface TodoListProps {
  todos?: {
    id: string;
    title: string;
  }[];
  loading: boolean;
}

export function TodoList({ todos, loading }: TodoListProps): JSX.Element {
  return (
    <article>
      {loading ? (
        <h2>Loading todos...</h2>
      ) : (
        <ul role="list" className="divide-y divide-gray-200">
          {todos?.map((todo) => (
            <li key={todo.id} className="max-w-xs">
              <a href="#" className="block hover:bg-gray-50">
                <div className="px-4 py-4 flex items-center sm:px-6">
                  <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                    <div className="truncate">
                      <p className="font-medium text-indigo-600 truncate">
                        {todo.title}
                      </p>

                      <div className="mt-2 flex">
                        <div className="flex items-center text-sm text-gray-500">
                          <CalendarIcon
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          {/* <p>
                          Closing on{" "}
                          <time dateTime={todo.closeDate}>
                            {todo.closeDateFull}
                          </time>
                        </p> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
