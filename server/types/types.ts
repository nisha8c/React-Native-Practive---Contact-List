export interface CustomerData {
    gender: string,
    name: NameData,
    location: LocationData,
    email: string,
    dob: DobRegData,
    registered: DobRegData,
    phone: string,
    cell: string,
    id: IdData,
    picture: PictureData,
    nat: string
}

export interface PictureData {
    large: string,
    medium: string,
    thumbnail: string,
}
export interface IdData {
    name: string,
    value: number | null,
}
export interface DobRegData {
    date:  string,
    age: number
}

export interface NameData {
    title: string,
    first: string,
    last: string
}

export interface LocationData {
    street: StreetData,
    city: string,
    state: string,
    country: string,
    postcode: string,
    coordinates: CoordinatesData,
    timezone: TimezoneData
}

export interface StreetData {
    number: number,
    name: string
}

export interface CoordinatesData {
    latitude: string,
    longitude: string
}

export interface TimezoneData {
    offset: string,
    description: string
}