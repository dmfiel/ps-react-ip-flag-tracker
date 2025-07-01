// Pull data based on IP address or domain nmae from the Geo Location API at geo.ipify.org
import { showError } from '../main';
import { IPGeolocation } from '../models/ipgeolocation';
import { API_KEY_IP_GEOLOCATION } from '../secrets';
import { timedFetch } from './timedfetch';

const BASE_URL = 'https://geo.ipify.org/api/v2';
const ENDPOINT_COUNTRY_CITY = '/country,city';

export async function getGeolocation(ipAddr: string = '') {
  let flagIPaddr = true;
  try {
    ipAddr = ipAddr.trim();
    // try to get cached data from local storage first, to save on API calls
    let localGeo;
    if (ipAddr) localGeo = localStorage.getItem(ipAddr);
    else localGeo = localStorage.getItem('local');
    if (localGeo) {
      const data = JSON.parse(localGeo);
      if (data) {
        const ipGeo = new IPGeolocation(
          data.ip,
          data.location,
          data.domains,
          data.as,
          data.isp
        );
        if (ipGeo.validateIPGeo()) {
          console.log(`IPGeolocation pulled from localstorage: ${ipAddr}`);
          return ipGeo;
        }
      }
    }

    // https://stackoverflow.com/questions/5284147/validating-ipv4-addresses-with-regexp/68104187#68104187
    // Thanks to Danail Gabenski for the IPv4 regex
    let data;
    if (ipAddr.match(/^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/))
      data = await timedFetch(
        BASE_URL +
          ENDPOINT_COUNTRY_CITY +
          `?apiKey=${API_KEY_IP_GEOLOCATION}&ipAddress=${ipAddr}`
      );
    // consider the search parameter to be a domain name
    else flagIPaddr = false;
    data = await timedFetch(
      BASE_URL +
        ENDPOINT_COUNTRY_CITY +
        `?apiKey=${API_KEY_IP_GEOLOCATION}&domain=${ipAddr}`
    );

    const ipGeo = new IPGeolocation(
      data.ip,
      data.location,
      data.domains,
      data.as,
      data.isp
    );
    if (ipGeo.validateIPGeo()) {
      if (ipAddr) localStorage.setItem(ipAddr, JSON.stringify(ipGeo));
      else localStorage.setItem('local', JSON.stringify(ipGeo));

      console.log(`IPGeolocation pulled from API: ${ipAddr}`);

      return ipGeo;
    }
  } catch (error) {
    console.error('Fetch error during getGeolocation:', error);
    showError(`Unable to find ${flagIPaddr ? 'IP address' : 'domain'}.`);
  }
}
