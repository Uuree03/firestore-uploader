const admin = require('./node_modules/firebase-admin');
const serviceAccount = require("./serviceAccountKey.json");
const data = require("./curriculums.json");
const collectionKey = "curriculums"; //name of the collection
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://studentaidmn.firebaseio.com"
});
const firestore = admin.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);
var counter = 0;
if (data && (typeof data === "object")) {
Object.keys(data).forEach(docKey => {
 firestore.collection(collectionKey).add(data[docKey]).then((res) => {
   counter ++;
   console.log("Document " + docKey + " created! " + counter);
}).catch((error) => {
   console.error("Error writing document: ", error);
});
});
}