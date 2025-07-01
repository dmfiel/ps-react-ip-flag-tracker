// Pull data based on IP address or domain nmae from the Geo Location API at geo.ipify.org
import { useContext, useEffect, useState } from 'react';
import { useFetch } from './useFetch';
import { ErrorContext } from '../context/ErrorContext';

// Pull country and flag info from the RESTCountries API

const BASE_URL = 'https://restcountries.com/v3.1';
const ENDPOINT_COUNTRY_CITY = '/alpha/';

export type CountryData = {
  flagImg: string;
  flagAlt: string;
  countryName: string;
};

export function useCountry(countryCode: string = 'US'): CountryData {
  const { setError } = useContext(ErrorContext);

  countryCode = countryCode.trim();

  const { data, error, loading } = useFetch(
    BASE_URL + ENDPOINT_COUNTRY_CITY + `${countryCode}?fields=name,flags`
  );
  const [countryData, setCountryData] = useState<CountryData>({
    flagImg: '',
    flagAlt: '',
    countryName: ''
  });

  useEffect(() => console.log('Loading:', loading), [loading]);
  useEffect(() => {
    if (error) {
      console.error('Fetch error during getCountry:', error);
      setError('Unable to find country code: ' + countryCode);
    }
  }, [error]);
  useEffect(() => {
    if (data) {
      console.log('country data ', data);
      setCountryData({
        flagImg: data.flags.svg,
        flagAlt: data.flags.alt,
        countryName: data.name.common
      });
      setError('');
    }
  }, [data]);

  return countryData;
}
