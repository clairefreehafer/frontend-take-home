import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>npm</h1>
        <form className="search">
          <input type="search" className="search-input" />
          <button type="submit">Search</button>
        </form>
      </header>
      <main>
        <div>Loading...</div>

        <ol>
          <li>result</li>
          <li>result</li>
          <li>result</li>
        </ol>
      </main>
    </div>
  );
}

export default App;
