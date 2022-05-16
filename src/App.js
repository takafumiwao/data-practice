import "./App.css";
import React, { useState, useEffect } from "react";

function GithubUser({ login, token }) {
  const [data, setData] = useState();

  useEffect(() => {
    if (!login) return;
    fetch(`https://api.github.com/users/${login}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then(setData)
      .catch((error) => console.log(error));
  }, [login, token]);

  if (data) return <pre>{JSON.stringify(data, null, 2)}</pre>;
  // console.log("null");
  return null;
}

function App() {
  return (
    <GithubUser
      login="takafumiwao"
      token="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"
    />
  );
}

export default App;
