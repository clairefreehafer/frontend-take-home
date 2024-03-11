import React, { useState } from "react";
import "./App.css";

type Package = {
  name: string;
  description: string;
  npmLink: string;
}

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Package[]>([]);
  const [error, setError] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.target.value)
  }

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(searchValue);

    // API call, setIsLoading
  }

  return (
    <div className="app">
      <header className="header">
        <h1>npm</h1>
        <form className="search" onSubmit={handleSearch}>
          <input
            type="search"
            className="search-input"
            value={searchValue}
            onChange={handleChange}
          />
          <button type="submit">Search</button>
        </form>
      </header>
      <main>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <ol>
            <li>result</li>
            <li>result</li>
            <li>result</li>
          </ol>
        )}

        {error && <div>{error}</div>}
      </main>
    </div>
  );
}

export default App;
