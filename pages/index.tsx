import { Login } from "components/Login";

import { withApollo } from "lib/withApollo";
import { useFetchUser } from "lib/user";

import Homepage from "components/Homepage";

export function Home(): JSX.Element {
  const { user, loading } = useFetchUser();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!loading && !user) {
    return <Login />;
  }

  return <Homepage />;
}

export default withApollo()(Home);
