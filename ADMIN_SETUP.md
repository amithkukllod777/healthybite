# Media admin setup

The dashboard at `/admin.html` manages only YouTube videos, Instagram/social cards,
and the six product-gallery images. Product copy, claims, nutrition and purchase
links remain code-controlled.

## Firebase setup

1. Create or open a Firebase project and register a Web app.
2. Paste its public web configuration into `firebase-config.js`.
3. In Authentication, enable Email/Password and create the admin user.
4. Create Firestore and Cloud Storage.
5. Deploy `firestore.rules` and `storage.rules` using the Firebase CLI or console.
6. Copy the admin user's UID from Authentication. In Firestore, create the document
   `admins/ADMIN_UID` with any harmless field, for example `enabled: true`.

The admin collection cannot be written from the website. This prevents a signed-in
user from granting themselves admin access.

## Data and limits

- Three YouTube slots accept normal watch links, Shorts links, youtu.be links or IDs.
- Social cards accept an Instagram URL, title, caption and display image.
- Gallery contains six replaceable image slots.
- Uploaded images must be under 5 MB and have an image MIME type.
- Public visitors may read published media; only UIDs in `admins` may write it.
