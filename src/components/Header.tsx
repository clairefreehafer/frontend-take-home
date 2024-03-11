import React from "react";

type Props = {
  handleSearch: (event: React.FormEvent<HTMLFormElement>) => void;
  searchValue: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isDevMode: boolean;
}

export default function Header({ handleSearch, searchValue, handleChange, isDevMode }: Props) {
  return (
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
  )
}
