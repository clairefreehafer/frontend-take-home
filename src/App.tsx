import React, { useEffect, useState } from "react";
import { Package, fetchSearch } from "./api";
import "./App.css";
import List from "./components/List";
import Header from "./components/Header";
import Theme from "./components/Theme";

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
    
    let results;
    setIsLoading(true);
    setError("");

    try {
      if (isDevMode) {
        throw new Error("Dev mode activated!");
      }

      results = await fetchSearch(searchValue);

      if (typeof results === "string") {
        throw new Error(results);
      }

      setResults(results);
    } catch (e: any) {
      setError(e.message);
    }
    setIsLoading(false);
  }

  return (
    <div className="app">
      <Header
        handleSearch={handleSearch}
        searchValue={searchValue}
        handleChange={handleChange}
        isDevMode={isDevMode}
      />
      
      <main className="main">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <List results={results} />
        )}

        {error && <div>Oops! Something went wrong. :( <br />Error: {error}</div>}
      </main>
      <Theme />
    </div>
  );
}

export default App;
