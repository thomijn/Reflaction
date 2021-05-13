import {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

export default function useCollection(path = '') {
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscriber = firestore()
      .collection(path)
      .onSnapshot((querySnapshot) => {
        const docs = [];

        querySnapshot?.forEach((documentSnapshot) => {
          docs.push(documentSnapshot);
        });

        setCollection(docs);
        setLoading(false);
      });

    return () => subscriber();
  }, [path]);

  return [collection, loading];
}
