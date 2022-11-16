import { useState } from "react";

export const Country = ({
  codes,
  name,
  capital,
  population,
  region,
  flag,
  onNewCountry,
}) => {
  const [changeButton, setChangeButton] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    onNewCountry(codes);
    setChangeButton(!changeButton);
  };

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
          <form onSubmit={onSubmit}>
            {changeButton ? (
              <button
                onClick={onSubmit}
                type="button"
                className="text-white bg-gradient-to-r from-green-400 via-green-600 to-green-900 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 shadow-lg rounded-lg text-sm px-5 py-2 text-center mr-2 mb-2"
              >
                Seleccionar
              </button>
            ) : (
              <button
                onClick={onSubmit}
                type="button"
                className="text-white bg-gradient-to-r from-amber-400 via-amber-600 to-amber-900 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-amber-200 dark:focus:ring-amber-800 shadow-lg rounded-lg text-sm px-5 py-2 text-center mr-2 mb-2"
              >
                Seleccionar
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};
