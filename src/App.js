import "./App.css";
import React, { useState, useEffect } from "react";

const loadJSON = (key) => key && JSON.parse(localStorage.getItem(key));
const saveJSON = (key, data) => localStorage.setItem(key, JSON.stringify(data));

function GithubUser({ login, token }) {
  const [data, setData] = useState(loadJSON(`user:${login}`));

  useEffect(() => {
    if (!data) return;
    // console.log("data");
    // if (data.login === login) return;
    // console.log("save");
    const { name, avatar_url, location } = data;
    saveJSON(`user:${login}`, {
      name,
      login,
      avatar_url,
      location,
    });
  }, [data]);

  useEffect(() => {
    if (!login) return;
    if (data && data.login === login) return;
    fetch(`https://api.github.com/users/${login}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then(setData)
      .catch((error) => console.log(error));
  }, [login]);

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
