import {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

export default function useDocument(path = '') {
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscriber = firestore()
      .doc(path)
      .onSnapshot((querySnapshot) => {
        setDocument(querySnapshot);
        setLoading(false);
      });

    return () => subscriber();
  }, [path]);

  return [document, loading];
}
