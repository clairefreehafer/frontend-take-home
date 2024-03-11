import React, { useState } from "react";
import { Package, fetchSearch } from "./api";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import "./App.css";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Package[]>([]);
  const [error, setError] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.target.value)
  }

  async function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(searchValue);

    const results = await fetchSearch(searchValue);

    setResults(results);
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
      <main className="main">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <AutoSizer>
            {({ height, width }: { height: number, width: number }) => {
              return (
                <List
                  height={height}
                  itemCount={results.length}
                  itemSize={35}
                  width={width}
                >
                  {({ index, style }: { index: number, style: any }) => (
                    <div style={style}>{results[index].name}: {results[index].description}, {results[index].npmLink}</div>
                  )}
                </List>
              )
            }}
          </AutoSizer>
        )}

        {error && <div>{error}</div>}
      </main>
    </div>
  );
}

export default App;
