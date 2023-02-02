import { useState, useEffect, createContext, FunctionComponent, PropsWithChildren } from 'react';
import {
  collection,
  orderBy as orderByQuery,
  query,
  onSnapshot,
  getDocs,
} from 'firebase/firestore';

import { onNext } from '~/utils';
import { db } from '~/firebase-config';

export interface Operator {
  id: string;
  name: string;
}

export const OperatorsContext = createContext<Array<Operator>>([]);

interface PropTypes {
  orderBy?: string;
  path: string;
}

const OperatorsProvider: FunctionComponent<PropsWithChildren<PropTypes>> = ({
  path,
  orderBy = 'createdAt',
  children,
}) => {
  const [operators, setOperators] = useState<Operator[]>([]);

  // when component mounts, we're ready to listen changes.
  // when unmounting, it calls "unsubscribe" function returned by `onSnapshot` so we stop listening for those changes.
  // all of this in one line!
  useEffect(() => {
    const operatorsRef = collection(db, path);

    getDocs(collection(db, path)).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // eslint-disable-next-line no-console
        console.log(`${doc.id} => ${doc.data()}`);
      });
    });

    const q = query(operatorsRef, orderByQuery(orderBy));

    return onSnapshot(q, onNext(setOperators));
  }, [path, orderBy]);

  return <OperatorsContext.Provider value={operators}>{children}</OperatorsContext.Provider>;
};

export default OperatorsProvider;
