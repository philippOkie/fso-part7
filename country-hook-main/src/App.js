import React, { useState, useEffect } from "react";
import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (name) {
      axios
        .get(`https://restcountries.com/v3/name/${name}`)
        .then((response) => {
          if (response.data.length > 0) {
            setCountry({ found: true, data: response.data[0] });
          } else {
            setCountry({ found: false });
          }
        })
        .catch((error) => {
          console.error(error);
          setCountry({ found: false });
        });
    }
  }, [name]);

  return country;
};

const Country = ({ country }) => {
  if (!country) {
    return null;
  }

  if (!country.found) {
    return <div>not found...</div>;
  }

  const { data } = country;

  return (
    <div>
      <h3>{data.name.common} </h3>
      <div>capital {data.capital} </div>
      <div>population {data.population}</div>
      {data.flag}
    </div>
  );
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);

  const fetch = async (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  console.log("Country data:", country);

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
