import { db } from "./Firebase";

export const addData = async (collection, document, data) => {
  firebaseCache.addItem(collectionAndDocumentToId(collection, document), data);
  return await db.collection(collection).doc(document).set(data);
};

export const readData = async (collection, document) => {
  if (!!document) {
    const doc = await db.collection(collection).doc(document).get();
    if (!doc.exists) {
      return null;
    }
    const data = doc.data();
    firebaseCache.addItem(collectionAndDocumentToId(collection, document), data);
    return data;
  } else {
    if (firebaseCache.itemExists(collection)) return firebaseCache.getItem(collection);
    const snapshots = await db.collection(collection).get();
    const res = [];
    snapshots.forEach(snapshot => res.push(snapshot.data()));
    firebaseCache.addItem(collection, res);
    return res;
  }
};

export const deleteData = async (collection, document) => {
  if (!!document) {
    return await db.collection(collection).doc(document).delete();
  } else {
    const deleteCollection = async (collectionPath, batchSize) => {
      const collectionRef = db.collection(collectionPath);
      const query = collectionRef.orderBy("__name__").limit(batchSize);

      return new Promise((resolve, reject) => {
        deleteQueryBatch(query, resolve).catch(reject);
      });
    };

    const deleteQueryBatch = async (query, resolve) => {
      const snapshot = await query.get();

      const batchSize = snapshot.size;
      if (batchSize === 0) {
        resolve();
        return;
      }

      const batch = db.batch();
      snapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });
      await batch.commit();

      process.nextTick(() => {
        deleteQueryBatch(query, resolve);
      });
    };
    return await deleteCollection(collection, 10);
  }
};

export const readDataWhere = async (collection, fieldPath, opStr, value) => {
  const snapshots = await db.collection(collection).where(fieldPath, opStr, value).get();
  const res = [];

  snapshots.forEach(snapshot => res.push(snapshot.data()));

  return res;
};

export const getSnapshotWhere = (collection, fieldPath, opStr, value) =>
  db.collection(collection).where(fieldPath, opStr, value);

const collectionAndDocumentToId = (collection, document) => `${collection}/${document}`;
