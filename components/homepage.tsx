import { useQuery } from "react-query";
import dynamic from "next/dynamic";

const Client = dynamic(() => import("../components/client"), { ssr: false });

const HomePage = () => {
  const { isLoading, error, data } = useQuery("sessionData", () =>
    fetch("/api/session/test").then((res) => res.json())
  );

  if (isLoading) {
    return <p>Loading…</p>;
  }

  if (error) {
    return <p>An error has occurred :(</p>;
  }

  return (
    <div>
      <h1>{data.name}</h1>
      <Client
        name={data.name}
        sessionId={data.id}
        token={data.token}
        apiKey={data.key}
      />
    </div>
  );
};

export default HomePage;
