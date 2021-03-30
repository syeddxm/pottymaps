import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// tslint:disable-next-line:no-implicit-dependencies


admin.initializeApp(functions.config().firestore);


// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.countreviews = functions.firestore.document('/locations/{locationid}/reviews/{reviewsid}').onWrite((change, context) => {
        const locationRef = change.after.ref.parent.parent;

        let currentRating: number;
        let currentReviewCount: number;
        let newRating: number;
        let newAverage: number;


        locationRef?.get().then((data) => {

            const location = data.data()?.d;
            currentRating = location.rating;
            currentReviewCount = location.reviewCount;

            const review = change.after.data();
            newRating = review?.rating;

            if (currentReviewCount === 0) {
                newAverage = newRating;
            } else {

                const currentR = currentRating * (currentReviewCount) / (currentReviewCount + 1);
                const newR = newRating * 1 / (currentReviewCount + 1);

                newAverage = + currentR + newR;

            }

            locationRef.set({
                d: {
                    rating: newAverage,
                    reviewCount: currentReviewCount + 1
                }
            },  {merge: true}).catch();

        }).catch();

        return null;


});
