// import { useEffect, useState, useRef } from "react";

export const Country = ({ codes, name, capital, population, region, flag }) => {

  const selectCountry = () => {
    console.log(codes);
  }


  return (
    <>
      <div className="country">
        <div className="flag_container">
          <img src={flag} alt="" />
        </div>

        <div className="details">
          <h2 className="name">{name}</h2>
          <p>
            Población: <span className="values">{population}</span>
          </p>
          <p>
            Región: <span className="values">{region}</span>
          </p>
          <p>
            Capital: <span className="values">{capital}</span>
          </p>
          <br />
          <button
            onClick={selectCountry}
            type="button"
            className="text-white bg-gradient-to-r from-amber-400 via-amber-600 to-amber-900 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-amber-200 dark:focus:ring-amber-800 shadow-lg rounded-lg text-sm px-5 py-2 text-center mr-2 mb-2"
          >
            Seleccionar
          </button>
        </div>
      </div>
    </>
  );
};
