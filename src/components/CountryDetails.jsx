import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function CountryDetails() {
  const { countryCode } = useParams();
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState({});

//   useEffect(() => {
//     axios
//       .get(`https://ih-countries-api.herokuapp.com/countries/${countryCode}`)
//       .then(response => {
//         setCountry(response.data);
//         setLoading(false);
//       })
//       .catch(err => console.log(err));
//   }, [countryCode]);

  const getCountries = async () => {
    const { data } = await axios.get(
      `https://ih-countries-api.herokuapp.com/countries/${countryCode}`
    );
    setCountry(() => data);
    setLoading(false)
  };
  useEffect(() => {
    try {
      getCountries();
    } catch (error) {}
  }, [countryCode]);

  if (loading) {
    return <h1>Loading ...</h1>;
  }
  return (
    <div className="col-5" >
      <h1 className="list-group-item list-group-item-action">
      <img src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`} alt="" /></h1>
      {country.name.common}
      <table className="table">
        <thead></thead>
        <tbody>
          <tr>
            <td style={{ width: '30%' }}>Capital</td>
            <td>{country.capital}</td>
          </tr>
          <tr>
            <td>Area</td>
            <td>
              {country.area} km
              <sup>2</sup>
            </td>
          </tr>
          <tr>
            <td>Borders</td>
            <td>
              <ul>
                {country.borders.map(borderCountry => {
                  return (
                    <li key={borderCountry}>
                      {/* {borderCountry ? borderCountry : 'No bordering countries'} */}
                      <Link to={`/${borderCountry}`}>{borderCountry}</Link>
                    </li>
                  );
                })}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CountryDetails;
