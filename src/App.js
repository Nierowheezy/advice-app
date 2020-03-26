import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Spinner from "./Spinner";
import "./App.css";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState();

  useEffect(() => {
    fetchAdvice();
  }, []);

  const fetchAdvice = () => {
    setLoading(true);
    try {
      axios
        .get("https://api.adviceslip.com/advice")
        .then(res => {
          const { advice } = res.data.slip;
          console.log(res.data.slip);

          setAdvice(advice);
          setLoading(false);
        })
        .catch(err => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div className="app">
          <div className="card">
            <h1 className="heading">{advice}</h1>
            <button className="button" onClick={fetchAdvice}>
              <span>GIVE ME ADVICE</span>
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default App;
