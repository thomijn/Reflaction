import {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

export default function useDocumentData(path = '') {
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscriber = firestore()
      .doc(path)
      .onSnapshot((querySnapshot) => {
        if (querySnapshot.exists) {
          setDocument({
            ...querySnapshot.data(),
            id: querySnapshot.id,
          });
        }
        setLoading(false);
      });

    return () => subscriber();
  }, [path]);

  return [document, loading];
}
