/* eslint-disable react/prop-types */
import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";

const App = () => {
  const [page, setPage] = useState("authors");
  const [errorMessage, setErrorMessage] = useState(null)

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const Notify = ({ errorMess }) => {
    if ( !errorMessage ) {
      return null
    }
    return (
      <div style={{color: 'red'}}>
        {errorMessage}
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      <Notify errorMess={errorMessage} />

      <Authors show={page === "authors"} setError={notify} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />
    </div>
  );
};

export default App;
