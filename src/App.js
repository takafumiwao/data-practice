import "./App.css";
import React from "react";
import { faker } from "@faker-js/faker";
import { FixedSizeList } from "react-window";
import { useIterator } from "./useIterator";
import GitHubUser from "./GithubUser";

const bigList = [...Array(5000)].map(() => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  avatar: faker.internet.avatar(),
}));

function List({ data = [], renderItem, renderEmpty }) {
  return !data.length ? (
    renderEmpty
  ) : (
    <ul>
      {data.map((item, i) => (
        <li key={i}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

function App() {
  const [letter, previous, next] = useIterator(["a", "b", "c"]);
  const renderRow = ({ index, style }) => (
    <div style={{ ...style, ...{ display: "flex" } }}>
      <img src={bigList[index].avatar} alt={bigList[index].name} width={50} />
      <p>
        {bigList[index].name} - {bigList[index].email}
      </p>
    </div>
  );
  const name = "takafumiwao";

  return <GitHubUser login={name} />;
}

export default App;
