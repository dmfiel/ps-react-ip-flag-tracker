// Class to hold data for the Geo Location API at geo.ipify.org
export type IPGeoLocation = {
  country: string;
  region: string;
  city: string;
  lat: number;
  lng: number;
  postalCode: string;
  timezone: string;
  geonameId: number;
};
export type IPGeoAs = {
  asn: number;
  name: string;
  route: string;
  domain: string;
  type: string;
};

export class IPGeolocation {
  ip: string;
  location: IPGeoLocation;
  domains: string[];
  as: IPGeoAs;
  isp: string;

  constructor(
    ip: string,
    location: IPGeoLocation,
    domains: string[],
    as: IPGeoAs,
    isp: string
  ) {
    this.ip = ip;
    this.location = location;
    this.domains = domains;
    this.as = as;
    this.isp = isp;
  }

  validateIPGeo(): boolean {
    if (!this.location.city)
      throw new Error(`Geolocation error: No city found`);
    if (!this.ip) throw new Error(`Geolocation error: No ip address found`);
    if (!this.location.timezone)
      throw new Error(`Geolocation error: No timezone found`);
    // lots of the entries don't have an ISP entry, so don't validate this field
    // if (!this.isp) throw new Error(`Geolocation error: No ISP found`);
    return true;
  }
}
