import { useContext, useEffect, useState } from 'react';
import { LeafletMap } from '../LeafletMap/LeafletMap';
import { SearchBar } from '../SearchBar/SearchBar';
import { useGeoLocation } from '../../hooks/useGeoLocation';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import { useCountry } from '../../hooks/useCountry';
import { CountryFlag } from '../CountryFlag/CountryFlag';
import { useWindowSize, type WinSize } from '../../hooks/useWindowSize';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { ErrorContext } from '../../context/ErrorContext';

export function IPTracker() {
  const { errorMessage, setError } = useContext(ErrorContext);
  const [searchIpAddr, setSearchIpAddr] = useState<string>('');
  const { ipAddr, location, lat, lng, country, timeZone, isp, loading, error } =
    useGeoLocation(searchIpAddr);
  const countryData = useCountry(country);
  const size = useWindowSize();
  const [mapSize, setMapSize] = useState<WinSize>({
    width: Math.floor(Math.min(1440, window.innerWidth)),
    height: Math.floor(window.innerHeight)
  });

  useEffect(() => {
    const mapSize = { width: Math.min(1440, size.width), height: size.height };
    setMapSize(mapSize);
  }, [size]);

  useEffect(() => {
    setError(error?.message || '');
  }, [error]);

  if (loading) return <LoadingSpinner text="Loading search results..." />;

  return (
    <section className={`font-rubik text-white max-w-[1440px] w-full my-0`}>
      <div
        id="header_flags"
        className="w-full box-border lg:box-content lg:flex flex-row justify-between z-3 whitespace-nowrap"
      >
        <CountryFlag countryData={countryData} big={true} />
        <header role="banner" className="lg:mt-6">
          <div
            id="flags-small"
            className="flags-small flex flex-row justify-between align-top text-center"
          >
            <CountryFlag countryData={countryData} big={false} />
            <h1 className="text-2xl lg:text-4xl font-medium my-5 lg:m-0 lg:mb-5 text-center w-full">
              Web Address Tracker
            </h1>
            <CountryFlag countryData={countryData} big={false} />
          </div>
          <SearchBar setIpaddr={setSearchIpAddr} />
        </header>
        <CountryFlag countryData={countryData} big={true} />
      </div>
      <section
        id="map"
        className={`w-[${mapSize.width}px] h-[${mapSize.height}px] max-h-full top-[280px] lg:top-[280px] max-w-[1440px] box-border`}
      >
        <LeafletMap
          lat={lat}
          lng={lng}
          message={ipAddr}
          width={mapSize.width}
          height={mapSize.height}
        />
      </section>
      <section
        id="main"
        role="main"
        className="absolute top-[140px] lg:top-[135px] max-w-[1338px] pt-5 lg:pt-14 my-0 mx-14  box-border z-2"
      >
        <div
          id="data"
          className="w-full flex flex-col lg:flex-row gap-5 p-7 justify-center lg:justify-around bg-white border-light-gray text-dark-gray rounded-2xl"
        >
          <div className="item w-full box-border flex-col justify-start align-center lg:align-start content-start lg:px-10 m-0">
            <h2 className="mt-0 mb-1.5 lg:mb-0 text-center text-xs lg:text-sm font-medium lg:font-bold">
              IP ADDRESS
            </h2>
            <p
              id="ipaddress"
              className="text-xl lg:text-3xl text-center lg:text-left font-medium text-very-dark-gray"
            >
              {errorMessage !== '' ? <br /> : ipAddr}
            </p>
          </div>
          <div className="item w-full box-border flex-col justify-start align-center lg:align-start content-start lg:px-10 m-0">
            <h2 className="mt-0 mb-1.5 lg:mb-0 text-center text-xs lg:text-sm font-medium lg:font-bold">
              LOCATION
            </h2>
            <p
              id="location"
              className="text-xl lg:text-3xl text-center lg:text-left font-medium text-very-dark-gray"
            >
              {errorMessage !== '' ? <br /> : location}
            </p>
          </div>
          <div className="item w-full box-border flex-col justify-start align-center lg:align-start content-start lg:px-10 m-0">
            <h2 className="mt-0 mb-1.5 lg:mb-0 text-center text-xs lg:text-sm font-medium lg:font-bold">
              TIMEZONE
            </h2>
            <p
              id="timezone"
              className="text-xl lg:text-3xl text-center lg:text-left font-medium text-very-dark-gray"
            >
              {errorMessage !== '' ? <br /> : timeZone}
            </p>
          </div>
          <div className="item w-full box-border flex-col justify-start align-center lg:align-start content-start lg:px-10 m-0">
            <h2 className="mt-0 mb-1.5 lg:mb-0 text-center text-xs lg:text-sm font-medium lg:font-bold">
              ISP
            </h2>
            <p
              id="isp"
              className="text-xl lg:text-3xl text-center lg:text-left font-medium text-very-dark-gray"
            >
              {errorMessage !== '' ? <br /> : isp}
            </p>
          </div>
        </div>
        <ErrorMessage />
      </section>
    </section>
  );
}
