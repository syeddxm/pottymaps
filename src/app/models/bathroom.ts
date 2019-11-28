import {Review} from './review';

export class Bathroom {
    coordinates: firebase.firestore.GeoPoint;
    title: string;
    about: string;
    registered: Date;
    address: any;
    submittedby: {
        id: string,
        name: string;
    };
    average: number;
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
        this.title = 'Lorem Title';
        this.address = '99 agnes St';
        this.about = 'this is an example of a bathroom location';
        this.registered = new Date();
        this.average = 0;
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
        this.open = new Date();
        this.open.setHours(9, 30);
        this.close = new Date();
        this.close.setHours(18, 30);
    }
}




