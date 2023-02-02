/* eslint-disable @typescript-eslint/ban-ts-comment */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-explicit-any
export const collectIdsAndDocs = (doc: { id: string; data: () => any }) => ({
  id: doc.id,
  ...doc.data(),
});

export const onNext =
  // @ts-ignore


    (set) =>
    // @ts-ignore
    (snapshot): void => {
      const result = snapshot.docs.map(collectIdsAndDocs);

      set(result);
    };
