import Link from "next/link";

export function Login(): JSX.Element {
  return (
    <div>
      <h1>Next.js Todo App</h1>
      <Link href="/api/login">
        <a>Log In</a>
      </Link>
    </div>
  );
}
