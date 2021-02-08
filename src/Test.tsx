import * as React from 'react';

const Test = ({ listNotesTag, setListNotesTag }) => {
  console.log({ listNotesTag });

  React.useEffect(() => {
    if (listNotesTag) {
      console.log('hay algo');

      console.log({ listNotesTag });
    } else {
      console.log('no hay algo');
      setListNotesTag([1, 2, 3]);
    }
  }, []);

  return <div></div>;
};

export default Test;
