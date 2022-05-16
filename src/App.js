import "./App.css";
import React, { useState, useEffect } from "react";

const loadJSON = (key) => key && JSON.parse(localStorage.getItem(key));
const saveJSON = (key, data) => localStorage.setItem(key, JSON.stringify(data));

function GithubUser({ login, token }) {
  const [data, setData] = useState(loadJSON(`user:${login}`));

  const [error, setError] = useState();
  const [loding, setLoading] = useState(false);

  useEffect(() => {
    if (!login) return;
    setLoading(true);
    fetch(`https://api.github.com/users/${login}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then(setData)
      .then(() => setLoading(false))
      .catch(setError);
  }, [login]);

  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;
  if (loding) return <h1>loading...</h1>;

  if (!data) return null;

  return (
    <div className="githubuser">
      <img src={data.avatar_url} alt={data.login} style={{ width: 200 }} />
      <div>
        <h1>{data.login}</h1>
        {data.name && <p>{data.name}</p>}
        {data.location && <p>{data.location}</p>}
      </div>
    </div>
  );
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
