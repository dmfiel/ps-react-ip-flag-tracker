// Pull country and flag info from the RESTCountries API
import { showError } from '../main';
import { timedFetch } from './timedfetch';

const BASE_URL = 'https://restcountries.com/v3.1';
const ENDPOINT_COUNTRY_CITY = '/alpha/';

export type CountryData = {
  flagImg: string;
  flagAlt: string;
  countryName: string;
};

export async function getCountry(countryCode: string = 'US') {
  try {
    countryCode = countryCode.trim();

    // try to get cached data from local storage first, to save on API calls
    let localCountry;
    if (countryCode) localCountry = localStorage.getItem(countryCode);
    else localCountry = localStorage.getItem('local');
    if (localCountry) {
      const data = JSON.parse(localCountry);
      if (data) {
        let countryData: CountryData = {
          flagImg: data.flags.svg,
          flagAlt: data.flags.alt,
          countryName: data.name.common
        };
        console.log(`Country info pulled from local storage: ${countryCode}`);
        return countryData;
      }
    }

    let data = await timedFetch(
      BASE_URL + ENDPOINT_COUNTRY_CITY + `${countryCode}?fields=name,flags`
    );

    let countryData: CountryData = {
      flagImg: data.flags.svg,
      flagAlt: data.flags.alt,
      countryName: data.name.common
    };
    localStorage.setItem(countryCode, JSON.stringify(data));
    console.log(`Country info pulled from API: ${countryCode}`);
    return countryData;
  } catch (error) {
    console.error('Fetch error during getCountry:', error);
    showError('Unable to find country code: ' + countryCode);
  }
}

// Sample data from the RESTCountries API
// let cn = {
//   flags: {
//     png: 'https://flagcdn.com/w320/cn.png',
//     svg: 'https://flagcdn.com/cn.svg',
//     alt: 'The flag of China has a red field. In the canton are five yellow five-pointed stars — a large star and four smaller stars arranged in a vertical arc on the fly side of the large star.'
//   },
//   name: {
//     common: 'China',
//     official: "People's Republic of China",
//     nativeName: { zho: { official: '中华人民共和国', common: '中国' } }
//   }
// };

// let cn = [
//   {
//     name: {
//       common: 'China',
//       official: "People's Republic of China",
//       nativeName: { zho: { official: '中华人民共和国', common: '中国' } }
//     },
//     tld: ['.cn', '.中国', '.中國', '.公司', '.网络'],
//     cca2: 'CN',
//     ccn3: '156',
//     cioc: 'CHN',
//     independent: true,
//     status: 'officially-assigned',
//     unMember: true,
//     currencies: { CNY: { symbol: '¥', name: 'Chinese yuan' } },
//     idd: { root: '+8', suffixes: ['6'] },
//     capital: ['Beijing'],
//     altSpellings: [
//       'CN',
//       'Zhōngguó',
//       'Zhongguo',
//       'Zhonghua',
//       "People's Republic of China",
//       '中华人民共和国',
//       'Zhōnghuá Rénmín Gònghéguó'
//     ],
//     region: 'Asia',
//     subregion: 'Eastern Asia',
//     languages: { zho: 'Chinese' },
//     latlng: [35.0, 105.0],
//     landlocked: false,
//     borders: [
//       'AFG',
//       'BTN',
//       'MMR',
//       'HKG',
//       'IND',
//       'KAZ',
//       'NPL',
//       'PRK',
//       'KGZ',
//       'LAO',
//       'MAC',
//       'MNG',
//       'PAK',
//       'RUS',
//       'TJK',
//       'VNM'
//     ],
//     area: 9706961.0,
//     demonyms: {
//       eng: { f: 'Chinese', m: 'Chinese' },
//       fra: { f: 'Chinoise', m: 'Chinois' }
//     },
//     cca3: 'CHN',
//     translations: {
//       ara: { official: 'جمهورية الصين الشعبية', common: 'الصين' },
//       bre: { official: 'Republik Pobl Sina', common: 'Sina' },
//       ces: { official: 'Čínská lidová republika', common: 'Čína' },
//       cym: { official: 'Gweriniaeth Pobl Tsieina', common: 'Tsieina' },
//       deu: { official: 'Volksrepublik China', common: 'China' },
//       est: { official: 'Hiina Rahvavabariik', common: 'Hiina' },
//       fin: { official: 'Kiinan kansantasavalta', common: 'Kiina' },
//       fra: { official: 'République populaire de Chine', common: 'Chine' },
//       hrv: { official: 'Narodna Republika Kina', common: 'Kina' },
//       hun: { official: 'Kínai Népköztársaság', common: 'Kína' },
//       ind: { official: 'Republik Rakyat Tiongkok', common: 'Tiongkok' },
//       ita: { official: 'Repubblica popolare cinese', common: 'Cina' },
//       jpn: { official: '中華人民共和国', common: '中国' },
//       kor: { official: '중화인민공화국', common: '중국' },
//       nld: { official: 'Volksrepubliek China', common: 'China' },
//       per: { official: 'جمهوری خلق چین', common: 'چین' },
//       pol: { official: 'Chińska Republika Ludowa', common: 'Chiny' },
//       por: { official: 'República Popular da China', common: 'China' },
//       rus: { official: 'Народная Республика Китай', common: 'Китай' },
//       slk: { official: 'Čínska ľudová republika', common: 'Čína' },
//       spa: { official: 'República Popular de China', common: 'China' },
//       srp: { official: 'Народна Република Кина', common: 'Кина' },
//       swe: { official: 'Folkrepubliken Kina', common: 'Kina' },
//       tur: { official: 'Çin Halk Cumhuriyeti', common: 'Çin' },
//       urd: { official: 'عوامی جمہوریہ چین', common: 'چین' }
//     },
//     flag: '\uD83C\uDDE8\uD83C\uDDF3',
//     maps: {
//       googleMaps: 'https://goo.gl/maps/p9qC6vgiFRRXzvGi7',
//       openStreetMaps: 'https://www.openstreetmap.org/relation/270056'
//     },
//     population: 1402112000,
//     gini: { '2016': 38.5 },
//     fifa: 'CHN',
//     car: { signs: ['RC'], side: 'right' },
//     timezones: ['UTC+08:00'],
//     continents: ['Asia'],
//     flags: {
//       png: 'https://flagcdn.com/w320/cn.png',
//       svg: 'https://flagcdn.com/cn.svg',
//       alt: 'The flag of China has a red field. In the canton are five yellow five-pointed stars — a large star and four smaller stars arranged in a vertical arc on the fly side of the large star.'
//     },
//     coatOfArms: {
//       png: 'https://mainfacts.com/media/images/coats_of_arms/cn.png',
//       svg: 'https://mainfacts.com/media/images/coats_of_arms/cn.svg'
//     },
//     startOfWeek: 'monday',
//     capitalInfo: { latlng: [39.92, 116.38] },
//     postalCode: { format: '######', regex: '^(\\d{6})$' }
//   }
// ];
