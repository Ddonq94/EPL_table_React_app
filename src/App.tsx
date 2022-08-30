import React from "react";
import "antd/dist/antd.css";
import "./App.css";
import AppLeagueTable from "./components/AppLeagueTable";

function App() {
  return (
    <section className="App">
      <h1 className="center-text">Welcome to The Premier League</h1>

      <AppLeagueTable />
    </section>
  );
}

export default App;
