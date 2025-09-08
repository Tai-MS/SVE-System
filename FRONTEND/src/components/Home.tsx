import { type JSX } from "react";

interface HomeProps {
  user: string | null;
}

function Home({ user }: HomeProps): JSX.Element {
  
  return (
    <div>
      <h1>Welcome, {user}</h1>
    </div>
  );
}

export default Home;