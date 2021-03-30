import * as functions from "firebase-functions";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.countreviews = functions.firestore
    .document("locations/{locationsId}/reviews/{reviewsId}")
    .onWrite((change, context) => {
      const locationRef = change.after.ref.parent.parent;

      let cR: number;
      let cRC: number;
      let newRating: number;
      let newAverage: number;

      locationRef?.get().then((data) => {
        const location = data.data()?.d;
        cR = location.rating;
        cRC = location.reviewCount;

        const review = change.after.data();
        newRating = review?.rating;

        if (cRC === 0) {
          newAverage = newRating;
        } else {
          const currentR = cR * (cRC) / (cRC + 1);
          const newR = newRating * 1 / (cRC + 1);
          newAverage = + currentR + newR;
        }

        locationRef.set(
            {d: {rating: newAverage, reviewCount: cRC + 1}},
            {merge: true},
        ).catch();
      }).catch();

      return null;
    }
    );
