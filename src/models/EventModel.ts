interface EventModel {
  __v?: number;
  _id?: string;
  authorId: string;
  category: string;
  date: Date;
  description: string;
  endAt: Date;
  imgUrl: string;
  location: Location;
  position: Position;
  price: number;
  startAt: Date;
  title: string;
  uids: any[];
}
interface Position {
  latitude: number;
  longitude: number;
}
interface Location {
  adress: string;
  title: string;
}
