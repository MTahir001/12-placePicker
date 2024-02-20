import { useEffect } from "react";
import Places from "./Places.jsx";
import { useState } from "react";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const response = await fetch("http://localhost:3000/places");
        const resData = await response.json();

        if (!response.ok) {
          throw new Error("Failed to fetch Places");
        }

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            resData.places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailablePlaces(sortedPlaces);
        });
      } catch (error) {
        setError({
          message:
            error.message || "Could not fetch places, please try again later",
        });
      }
      setIsFetching(false);
    }
    fetchData();
  }, []);
  if (error) {
    return <Error title="An error occurred " message={error.message} />;
  }
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
      isLoading={isFetching}
      loadingText="Fetching the data... Thanks for patience!!!"
    />
  );
}
