import { useEffect, useState } from "react";

export const Chat = () => {
  const [data, setData] = useState(null);
  useEffect((messsage) => {
    fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: messsage }),
    })
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  if (!data) return <div>Loading...</div>;
  return <div>Data: {JSON.stringify(data)}</div>;
};
