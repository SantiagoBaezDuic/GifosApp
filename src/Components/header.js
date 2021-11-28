import "../styles.css";
import { useEffect, useState } from "react";
import { config } from "../Config/config";

export default function Header(props) {
  const [input, setInput] = useState("");
  const [wannaSearch, setWannaSearch] = useState(false);
  const [autocomplete, setAutocomplete] = useState({ data: [] });
  const { darkMode, setDarkMode, setData } = props;

  //declaración y manejo de la lógica de busqueda.

  useEffect(() => {
    const search = () => {
      fetch(config.giphySRCH + "?q=" + input + config.apiKey + config.limit)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
        })
        .catch((error) => console.log(error));

      setInput("");
    };

    if (wannaSearch === true) {
      search();
    }
    setWannaSearch(false);
  }, [wannaSearch]);

  //autocomplete.

  useEffect(() => {
    fetch(`${config.giphySRCH}/tags?${config.apiKey}&q=${input}`)
      .then((response) => response.json())
      .then((data) => {
        setAutocomplete(data);
      })
      .catch((error) => console.log(error));
  }, [input]);

  let handleSearch = () => {
    setInput(input.replace(/ /g, "+"));
    setWannaSearch(true);
  };

  let handleInput = (e) => {
    setInput(e.target.value);
  };

  //manejo del estado del modo oscuro.

  let handleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  //logica para ejecutar la busqueda utilizando "Enter".

  let handleEnter = (e) => {
    if (e.keyCode === 13) {
      return document.getElementById("btn").click();
    }
  };

  let autocompletar = (e) => {
    setInput(e.target.id);
    document.getElementById("searchbar").focus();
  };

  const home = () => {
    window.location.reload(true);
  };

  return (
    <>
      <div className="header">
        {darkMode ? (
          <img
            className="logo"
            onClick={home}
            src="./img/logo-mobile-modo-noct.svg"
            alt=""
          ></img>
        ) : (
          <img
            className="logo"
            onClick={home}
            src="./img/logo-desktop.svg"
            alt=""
          ></img>
        )}
        <button onClick={handleDarkMode} className="dark-button">
          {darkMode ? "LIGHT MODE" : "DARK MODE"}
        </button>
      </div>
      <div className="searchbar-container">
        <p className="title">
          ¡Inspirate y busca los mejores <span className="heavy">GIFS</span>!
        </p>
        <img width="400px" src="./img/ilustra_header.svg" alt=""></img>
        <div className="search">
          <input
            id="searchbar"
            autoFocus={true}
            value={input}
            onKeyUp={handleEnter}
            onChange={handleInput}
            className="searchbar"
            type="text"
            placeholder="Busca gifs"
          ></input>
          <button id="btn" onClick={handleSearch} className="search-button">
            <img width="90%" src="./img/icon-search-mod-noc.svg" alt=""></img>
          </button>
        </div>
        <div className="autocomplete-container">
          {autocomplete.data.length > 0
            ? autocomplete.data.map((object) => {
                return (
                  <div
                    className="autocomplete"
                    onClick={autocompletar}
                    id={object.name}
                    key={object.name}
                  >
                    {object.name}
                  </div>
                );
              })
            : null}
        </div>
      </div>
      <div>
        <h4 className="results">Resultados de la búsqueda</h4>
      </div>
    </>
  );
}
