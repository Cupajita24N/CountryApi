import "./style.css";
import { FiSave } from "react-icons/fi";
import { Country } from "./Country";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

export const UserCountry = () => {
  const [countries, setCountries] = useState([]);
  const [dates, setData] = useState({});
  const regionRef = useRef();

  const nCountries = countries.status || countries.message;

  useEffect(() => {
    try {
      selectsCountries();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(function () {
    fetch("http://localhost:8000/api/pais", {
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
      },
    }).then((response) => {
      return response.json();
    }).then((data)=> {
      // console.log(data);
      data.forEach(reg =>{
        selectsCountries(reg.country);
        console.log(reg.country);
      
      });
    })
  }, []);

  const selectsCountries = async(id_pais) => {
    const response = await fetch(
      `https://restcountries.com/v2/callingcode/${id_pais}`
    );
    const dates = await response.json();
    if (dates.status === 404) {
      setCountries([]);
      return;
    }
    setCountries(dates);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <div
              id="usuarios"
              className="bg-gradient-to-b from-gray-800 to-gray-500 w-full h-screen"
            >
           <div className="text-white">
              <h1 className=""> Pais registrado </h1>
           </div>
              <div
                className="countries bg-gradient-to-b from-gray-800
                       via-from-gray-800 to-gray-500 "
              >
                {!nCountries ? (
                  countries.map((country) => (
                    <Country
                      key={country.alpha3Code}
                      code={country.alpha2Code}
                      name={country.name}
                      capital={country.capital}
                      population={country.population}
                      region={country.region}
                      flag={country.flag}
                      codes={country.callingCodes}
                    />
                  ))
                ) : (
                  <p className="text-white">No hay usuarios </p>
                )}
              </div>
            </div>
          </>
        }
      />
    </Routes>
  );
};
