'use client'

import { useEffect, useState } from "react";
import { fetchCountries } from "../utils/countriesAPI";

export default function Countries() {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState("");

  const loadCountries= async () => {
    const data = await fetchCountries();
    if (data.length > 0) {
       setCountries(data);
    } 
    else {
      setError("Failed to load countries. Please try again later.");
    }
  }

  useEffect(() => {
    loadCountries();
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-100 text-red-700 border border-red-400 px-4 py-3 rounded-md shadow-md">
          ⚠️ {error}
        </div>
      </div>
    );
  } 

  if (!error && countries.length === 0){
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-semibold text-gray-600 animate-pulse">
          ...Loading
        </div>
      </div>
    )  
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Countries Using USD
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {countries.map((country) => (
          <div
            key={country.code}
            className="p-4 border rounded-lg shadow-sm hover:shadow-md transition bg-white"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {country.name}
            </h2>

            <p className="text-sm text-gray-700 mb-2">
              <strong>Code:</strong> {country.code}
            </p>

            <p className="text-sm text-gray-700 mb-2">
              <strong>Languages:</strong>{" "}
              {country.languages.map((language) => language.name).join(", ") || "Unknown"}
            </p>

            <p className="text-sm text-gray-700">
              <strong>Continent:</strong> {country.continent.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}