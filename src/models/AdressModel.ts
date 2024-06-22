export interface AdressModel {
    items: Item[];
  }
export interface Item {
    title: string;
    id: string;
    resultType: string;
    address: Address;
    position: Position;
    distance: number;
    mapView: MapView;
  }
  export interface MapView {
    west: number;
    south: number;
    east: number;
    north: number;
  }
  export interface Position {
    lat: number;
    lng: number;
  }
  export interface Address {
    label: string;
    countryCode: string;
    countryName: string;
    county: string;
    city: string;
    district: string;
    street: string;
    postalCode: string;
  }