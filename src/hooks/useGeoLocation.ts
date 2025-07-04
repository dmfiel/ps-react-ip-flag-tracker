// Pull data based on IP address or domain nmae from the Geo Location API at geo.ipify.org
import { useContext, useEffect, useState } from 'react';
import { API_KEY_IP_GEOLOCATION } from '../secrets';
import { useFetch } from './useFetch';
import { ErrorContext } from '../context/ErrorContext';
// import { useLocalThenFetch } from './useLocalThenFetch';

const BASE_URL = 'https://geo.ipify.org/api/v2';
const ENDPOINT_COUNTRY_CITY = '/country,city';

export type GeoLoc = {
  ipAddr: string;
  location: string;
  lat: number;
  lng: number;
  country: string;
  timeZone: string;
  isp: string;
  loading: boolean;
  error: Error | null;
};

export function useGeoLocation(ipAddr: string): GeoLoc {
  const { setError } = useContext(ErrorContext);
  const { data, error, loading } = useFetch(getGeoURL(ipAddr));
  const [geoLoc, setGeoLoc] = useState<GeoLoc>({
    ipAddr: '',
    location: '',
    lat: 0,
    lng: 0,
    country: '',
    timeZone: '',
    isp: '',
    loading: false,
    error: null
  });

  useEffect(() => console.log('Loading:', loading), [loading]);
  useEffect(() => {
    if (error) {
      console.error('Fetch error during getGeolocation:', error);
      setError(`Unable to find that IP address or domain.`);
    }
  }, [error]);
  useEffect(() => {
    if (data && validateIPGeo(data))
      setGeoLoc({
        ipAddr: data.ip,
        location: `${data.location.city}, ${data.location.region} ${data.location.postalCode}`,
        lat: data.location.lat,
        lng: data.location.lng,
        country: data.location.country,
        timeZone: 'UTC ' + data.location.timezone,
        isp: data.isp,
        loading: loading,
        error: error
      });
  }, [data]);

  function validateIPGeo(data: any): boolean {
    if (!data) setError('No geolocation data returned.');
    if (!data.location.city) setError(`Geolocation error: No city found`);
    if (!data.ip) setError(`Geolocation error: No ip address found`);
    if (!data.location.timezone)
      setError(`Geolocation error: No timezone found`);
    // lots of the entries don't have an ISP entry, so don't validate this field
    // if (!this.isp) throw new Error(`Geolocation error: No ISP found`);
    return true;
  }

  return geoLoc as GeoLoc;
}

export function getGeoURL(ipAddr: string = ''): string {
  // https://stackoverflow.com/questions/5284147/validating-ipv4-addresses-with-regexp/68104187#68104187
  // Thanks to Danail Gabenski for the IPv4 regex
  if (ipAddr.match(/^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/))
    return (
      BASE_URL +
      ENDPOINT_COUNTRY_CITY +
      `?apiKey=${API_KEY_IP_GEOLOCATION}&ipAddress=${ipAddr}`
    );

  // consider the search parameter to be a domain name

  return (
    BASE_URL +
    ENDPOINT_COUNTRY_CITY +
    `?apiKey=${API_KEY_IP_GEOLOCATION}&domain=${ipAddr}`
  );
}
