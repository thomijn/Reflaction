import {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

export default function useCollectionData(path = '', options = {}) {
  const [collectionData, setCollectionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  let query = firestore().collection(path);
  const {where, orderBy, limit} = options;

  if (where) {
    if (where[0] instanceof Array) {
      for (let w of where) {
        query = query.where(...w);
      }
    } else {
      query = query.where(...where);
    }
  }

  if (orderBy) {
    query = query.orderBy(...orderBy);
  }

  if (limit) {
    query = query.limit(limit);
  }

  useEffect(() => {
    const subscriber = query.onSnapshot(
      (querySnapshot) => {
        const docs = [];

        querySnapshot?.forEach((documentSnapshot) => {
          docs.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
          });
        });

        setCollectionData(docs);
        setLoading(false);
      },
      (error) => setError(error),
    );

    return () => subscriber();
  }, [path]);

  return [collectionData, loading, error];
}
