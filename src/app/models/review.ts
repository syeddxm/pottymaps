import { FireauthService } from '../services/fireauth.service';

export class Review {
    id: string;
    title: string;
    userId: string;
    submitted: Date;
    description: string;
    rating: number;

    constructor() {
        this.submitted = new Date();

    }
}
