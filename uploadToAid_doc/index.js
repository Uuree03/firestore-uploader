const admin = require('./node_modules/firebase-admin');
const serviceAccount = require("./serviceAccountKey.json");
const data = require("./indexKeys.json");
const collectionKey = "indexKeys"; //name of the collection
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
  // data[docKey].expire = new Date(data[docKey].expire);
  // console.log(data[docKey].expire);
 firestore.collection(collectionKey).doc(docKey).set(data[docKey]).then((res) => {
   counter ++;
   console.log("Document " + docKey + " written! " + counter);
}).catch((error) => {
   console.error("Error writing document: ", error);
});
});
}