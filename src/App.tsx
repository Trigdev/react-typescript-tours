import React, { useState, useEffect, FC, ReactElement } from "react";
import { ToursProps } from "./app.types";
import Loading from "./Loading";
import Tours from "./Tours";

const url = "https://course-api.com/react-tours-project";

const App : FC = () : ReactElement => {
  const [loading, setLoading] = useState<boolean>(true);
  const [tours, setTours] = useState<ToursProps>([]);

  const removeTour = (id: string) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  const fetchTours = async () => {
    setLoading(true);

    try {
      const response = await fetch(url);
      const tours = await response.json();
      setLoading(false);
      setTours(tours);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  } 

  if(tours.length === 0) {
    return(
      <main>
        <div className="title">
          <h2>no tours left</h2>
          <button type="button" className="btn" onClick={fetchTours}>
            refresh
          </button>
        </div>
      </main>
    )
  }

  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
};

export default App;
