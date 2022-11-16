import { useState, useEffect } from "react";
import { Country } from "./Country";

export const UserCountry = () => {

  const [data, setData] = useState({});
  const nCountries = data.status || data.message;

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
        this.selectsCountries(reg.country);
        console.log(reg.country);
      
      });
    })
  }, []);

  const selectsCountries = async(id_pais) => {

    const response = await fetch(
      `https://restcountries.com/v2/callingcode/${id_pais}`
    );
    const data = await response.json();
    if (data.status === 404) {
      setData([]);
      return;
    }
    setData(data);
  }

  return (
    <div
      id="usuarios"
      className="bg-gradient-to-b from-gray-800 to-black w-full h-screen">
      <div>
      {!nCountries ? (
                data.map((country) => (
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
                <p className="text-white">No hay usuarios registrados </p>
              )}
        </div>
    </div>
  );
};
