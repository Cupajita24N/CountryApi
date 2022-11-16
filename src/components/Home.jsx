import "./style.css";
import { FiSave } from "react-icons/fi";
import { Country } from "./Country";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

export const Home = () => {
  const [userCountry, setUserCountry] = useState({
    nombre_completo: "",
    country: "",
  });
  const [msg, setMsg] = useState({
    message: "",
    color: "",
    visible: "no",
  });
  const [countries, setCountries] = useState([]);
  // const countriesInputRef = useRef();
  const regionRef = useRef();

  const nCountries = countries.status || countries.message;

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchData = async () => {
    const response = await fetch("https://restcountries.com/v2/all");
    const data = await response.json();

    if (data.status === 404) {
      setCountries([]);
      return;
    }

    setCountries(data);
  };

  // const searchCountries = () => {
  //   const searchValue = countriesInputRef.current.value;

  //   if (searchValue.trim()) {
  //     const fetchSearch = async () => {
  //       const response = await fetch(
  //         `https://restcountries.com/v2/name/${searchValue}`
  //       );
  //       const data = await response.json();

  //       setCountries(data);
  //     };

  //     try {
  //       fetchSearch();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   } else {
  //     fetchData();
  //   }
  // };

  const selectRegion = () => {
    const selectValue = regionRef.current.value;

    if (selectValue.trim()) {
      const fetchSelect = async () => {
        const response = await fetch(
          `https://restcountries.com/v2/region/${selectValue}`
        );
        const data = await response.json();

        if (selectValue === "All") {
          try {
            fetchData();
          } catch (error) {
            console.log(error);
          }
          return;
        }

        setCountries(data);
      };

      try {
        fetchSelect();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    userCountry.nombre_completo = value;
  };

  const onCountrySelect = (newUser) => {
    userCountry.country = newUser[0];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:8000/api/pais`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(userCountry),
    });
    const content = await response.json();
    setMsg(
      content.msg === 1
        ? {
            message: "Se ha añadido el usuario correctamente",
            color: "success",
            visible: "si",
          }
        : {
            message: "No se ha podido añadir al usuario",
            color: "danger",
            visible: "si",
          }
    );
    setUserCountry({ nombre_completo: "", newUser: "" });
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <form onSubmit={handleSubmit}>
              <div
                name="home"
                className="h-96 w-full bg-gradient-to-b from-black
                     via-black to-gray-800"
              >
                {msg.visible === "si" ? (
                  <div className={"alert alert-" + msg.color} role="alert">
                    {msg.message}
                  </div>
                ) : (
                  ``
                )}
                <div
                  className="max-w-h-96-lg mx-auto flex
             items-center h-full px-4 md:flex-row "
                >
                  <div className="flex justify-center w-full">
                    {/* INPUTS */}
                    <div className="my-2 justify-center w-56">
                      <label
                        className="block text-white text-sm font-bold mb-2 my-8"
                        for="username"
                      >
                        Nombre:
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-72 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="nombre_completo"
                        onBlurCapture={handleChange}
                        // value={userCountry.nombre_completo}
                        type="text"
                        placeholder="Username"
                        required
                      />
                      <select
                        className="block appearance-none w-60 bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 my-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        ref={regionRef}
                        onChange={selectRegion}
                      >
                        <option>Seleccione continente...</option>
                        <option>All</option>
                        <option>Africa</option>
                        <option>Americas</option>
                        <option>Europe</option>
                        <option>Asia</option>
                        <option>Oceania</option>
                      </select>

                      {/* BUTTONS */}
                      <button
                        type="submit"
                        className="group text-white w-fit px-5 py-2 my-2
                                flex rounded-md bg-gradient-to-r
                                from-amber-500 to-amber-800 cursor-pointer"
                        id="save"
                      >
                        Guardar &nbsp;
                        <span className="group-hover:rotate-45 duration-300">
                          <FiSave size={22} className="ml-1" />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>

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
                    onNewCountry={onCountrySelect}
                  />
                ))
              ) : (
                <p className="text-white">País no encontrado </p>
              )}
            </div>
          </>
        }
      />
    </Routes>
  );
};
