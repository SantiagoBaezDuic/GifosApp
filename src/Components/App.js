import { useEffect, useState } from "react";
import "../styles.css";
import Header from "./header.js";
import Display from "./display.js";
import { config } from "../Config/config";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [data, setData] = useState();
  const [isFetched, setIsFetched] = useState(false);

  // fetch de gifs trending

  const trending = async () => {
    await fetch(config.giphyTREND + "?" + config.apiKey + config.limit)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setIsFetched(true);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    trending();
  }, []);

  return (
    <div className={darkMode ? "App-dark" : "App"}>
      <div className="search-bar">
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          setData={setData}
        />
        <Display darkMode={darkMode} data={data} isFetched={isFetched} />
      </div>
    </div>
  );
}
