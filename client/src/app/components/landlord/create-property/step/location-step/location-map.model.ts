export interface OfficialAndCommon {
    common: string
    official: string
  }
  
  export interface CountyName extends OfficialAndCommon {
    native: {
      [languageCode: string]: OfficialAndCommon
    }
  }
  
  export interface Currency {
    name: string
    symbol: string
  }
  
  export interface IntlDirectDialingCode {
    root: string
    suffixes: string[]
  }
  
  export interface Demonyms {
    f: string
    m: string
  }
  
  export interface County {
    name: CountyName
    tld: string[]
    cca2: string
    ccn3: string
    code: string
    cioc: string
    status: string
    currencies: { [currencyCode: string]: Currency }
    idd: IntlDirectDialingCode
    capital: string[]
    altSpellings: string[]
    region: string
    subregion: string
    languages: { [languageCode: string]: string }
    translations: { [languageCode: string]: OfficialAndCommon }
    latlng: [number, number]
    demonyms: { [languageCode: string]: Demonyms }
    borders: string[]
    area: number
    flag: string
  }
  
  export type Counties = County[]