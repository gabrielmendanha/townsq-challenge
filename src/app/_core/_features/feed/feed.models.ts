export class Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export class User {
  id: number;
  name: string;
  username: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
  email: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: GeoLocation;
}

interface GeoLocation {
  lat: string;
  lng: string;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}
