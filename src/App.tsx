import React, { useEffect, useState } from "react";
import { Package, fetchSearch } from "./api";
import AutoSizer, { Size } from "react-virtualized-auto-sizer";
import "./App.css";
import List from "./List";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Package[]>([]);
  const [error, setError] = useState("");
  const [isDevMode, setIsDevMode] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search); 
    const isDevMode = queryParams.get("idm");

    if (isDevMode === "true") {
      setIsDevMode(true);
    }
  }, []);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.target.value)
  }

  async function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    let results = [];
    setIsLoading(true);
    setError("");

    try {
      if (isDevMode) {
        throw new Error("Dev mode activated!");
      }

      results = await fetchSearch(searchValue);
      setResults(results);
    } catch (e) {
      setError(`Oops! Something went wrong :( Error message: ${e}`);
    }
    setIsLoading(false);
  }

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">npm</h1>
        <form className="search" onSubmit={handleSearch}>
          <input
            type="search"
            className="search-input"
            value={searchValue}
            onChange={handleChange}
          />
          <button type="submit" className="search-button">Search</button>
        </form>
        {isDevMode && <p className="dev-mode">Dev Mode</p>}
      </header>
      
      <main className="main">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <AutoSizer>
            {(props: Size) => {
              return <List results={results} {...props} />
            }}
          </AutoSizer>
        )}

        {error && <div>{error}</div>}
      </main>
    </div>
  );
}

export default App;
