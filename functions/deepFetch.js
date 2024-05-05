const functions = require("firebase-functions");
const admin = require("firebase-admin");
if (admin.apps.length === 0) {
  admin.initializeApp();
}

exports.deepFetch = functions.https.onCall(async (data, context) => {
  const machinesCollection = admin.firestore().collection("machines");
  const machines = await machinesCollection.get();
  const results = [];

  for (const machineDoc of machines.docs) {
    const machineData = machineDoc.data();
    machineData.id = machineDoc.id;
    machineData.subcollections = [];

    const subcollections = await machineDoc.ref.listCollections();
    for (const subcollection of subcollections) {
      const subDocs = await subcollection.get();
      const subDocsData = [];

      for (const subDoc of subDocs.docs) {
        const subDocData = subDoc.data();
        subDocData.id = subDoc.id;
        subDocsData.push(subDocData);
      }

      machineData.subcollections.push({
        name: subcollection.id,
        documents: subDocsData,
      });
    }

    results.push(machineData);
  }

  return { machines: results };
});
