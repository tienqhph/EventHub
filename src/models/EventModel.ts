export interface EventModel {
    authorId: string;
    date: string;
    description: string;
    imgUrl: string;
    location: Location;
    time: string;
    title: string;
    uids: string[];
  }
 export  interface Location {
    adress: string;
    title: string;
  }