import {Review} from './review';

export class Bathroom {
    coordinates: firebase.firestore.GeoPoint;
    title: string;
    about: string;
    registered: Date;
    address: any;
    submittedby: string;
    rating: number;
    reviewCount: number;
    pictures: [
          {
            _id: string,
            src: string;
          }
    ];
    timing ?: any[];
    wheelchairAccess: boolean;
    genderNeutral: boolean;
    changingTable: boolean;
    toiletPly: number;

    constructor() {
        this.title = '';
        this.address = '';
        this.about = '';
        this.registered = new Date();
        this.rating = 0;
        this.reviewCount = 0;
        this.wheelchairAccess = false;
        this.genderNeutral = false;
        this.changingTable = false;
        this.toiletPly = 1;
        this.pictures = [null];
        this.timing = [
            {...new OpenClose('sunday')},
            {...new OpenClose('monday')},
            {...new OpenClose('tuesday')},
            {...new OpenClose('wednesday')},
            {...new OpenClose('thursday')},
            {...new OpenClose('friday')},
            {...new OpenClose('saturday')},
        ];
    }
}

export class OpenClose {
    day: string;
    open: Date;
    close: Date;

    constructor(day) {
        this.day = day;
        this.open = null;
        // this.open.setHours(0, 0);
        this.close = null;
        // this.close.setHours(0, 0);
    }
}




