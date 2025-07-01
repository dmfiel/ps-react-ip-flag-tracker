import type { CountryData } from '../../hooks/useCountry';

export function CountryFlag({
  countryData,
  big = true
}: {
  countryData: CountryData;
  big: boolean;
}) {
  if (!countryData || !countryData.flagImg) return;
  if (big)
    return (
      <section className="flag flag-big hidden lg:flex mt-9 mb-5 mx-9  flex-col gap-2.5 align-center text-center">
        <img
          id="flagsvg"
          src={countryData.flagImg}
          alt={countryData.flagAlt}
          height={100}
          width={190}
        />
        <label className="flaglabel" htmlFor="flagsvg">
          {countryData.countryName}
        </label>
      </section>
    );
  // small
  return (
    <section className="flag flag-small flex lg:hidden flex-col gap-1.5 align-center m-2.5 text-[0.5rem]">
      <img
        id="flagsvg"
        src={countryData.flagImg}
        alt={countryData.flagAlt}
        height={32}
        width={60}
      />
      <label className="flaglabel" htmlFor="flagsvg">
        {countryData.countryName}
      </label>
    </section>
  );
}
