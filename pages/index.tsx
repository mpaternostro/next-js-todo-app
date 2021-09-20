import Head from "next/head";
import Header from "components/Header";
import NewTodo from "components/NewTodo";

import { addNewTodoFn } from "types/types";

export function Home(): JSX.Element {
  const addNewTodo: addNewTodoFn = () => {
    return;
  };

  return (
    <div>
      <Head>
        <title>Next.js Todo App</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&display=optional"
          rel="stylesheet"
        />
      </Head>

      <main className="p-4">
        <Header />
        <div className="flex pt-4">
          <NewTodo addNewTodo={addNewTodo} />
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

export default Home;
