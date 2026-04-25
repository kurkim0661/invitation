export interface Invitation {
  groomName: string;
  brideName: string;
  greeting: string;
  weddingDate: string;
  weddingDateDisplay: string;
  venue: Venue;
  families: Family[];
  contacts: Contact[];
  galleryImages: GalleryImage[];
  externalLinks: ExternalLinks;
  groomAccounts: AccountInfo[];
  brideAccounts: AccountInfo[];
}

export interface Family {
  side: 'groom' | 'bride';
  fatherName: string;
  motherName: string;
  relation: string;
  childName: string;
}

export interface Contact {
  name: string;
  role: string;
  phone: string;
}

export interface Venue {
  name: string;
  address: string;
  lat: number;
  lng: number;
  transportation: Transportation[];
  parking: Parking[];
}

export interface Transportation {
  type: 'subway' | 'bus' | 'shuttle';
  lines: TransportLine[];
}

export interface TransportLine {
  name: string;
  detail: string;
  walkMinutes?: number;
}

export interface Parking {
  name: string;
  capacity: number;
  address: string;
  note: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  order: number;
}

export interface AccountInfo {
  bank: string;
  number: string;
  holder: string;
}

export interface ExternalLinks {
  rsvpFormUrl: string;
  kakaoMapUrl: string;
}
