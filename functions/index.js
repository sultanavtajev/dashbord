/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");


const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const express = require("express");
const app = express();

const deepFetch = require("./deepFetch");
exports.deepFetch = deepFetch.deepFetch;

app.get("/download/:folderId/:fileId", async (req, res) => {
  const { folderId, fileId } = req.params;
  const bucket = admin.storage().bucket("bachelor-7e242.appspot.com");
  const file = bucket.file(`${folderId}/${fileId}`);
  const filePath = `${folderId}/${fileId}`; // Sammensatt sti til filen

  try {
    // Increment folder access count in Firestore
    const folderRef = admin.firestore().collection("folderStats").doc(folderId);
    const fileRef = admin
      .firestore()
      .collection("fileStats")
      .doc(filePath.replace(/\//g, "_")); // Skap en unik ID for filen

    // Oppdaterer mappe og fil aksess samtidig
    await Promise.all([
      folderRef.set(
        {
          accesses: admin.firestore.FieldValue.increment(1),
          lastAccessed: admin.firestore.Timestamp.now(),
        },
        { merge: true }
      ),
      fileRef.set(
        {
          accesses: admin.firestore.FieldValue.increment(1),
          lastAccessed: admin.firestore.Timestamp.now(),
        },
        { merge: true }
      ),
    ]);

    // Fetch signed URL for direct file access
    const signedUrl = await file.getSignedUrl({
      action: "read",
      expires: Date.now() + 300000, // URL expires in 5 minutes
    });

    res.redirect(signedUrl[0]);
  } catch (error) {
    console.error("Error generating signed URL", error);
    res.status(500).send("Error downloading file.");
  }
});

exports.downloadFile = functions.https.onRequest(app);