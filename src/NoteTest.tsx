import * as React from 'react';

import Test from './Test';

const NoteTest = () => {
  const [listNotesTag, setListNotesTag] = React.useState(undefined);

  return (
    <div>
      <h1>DESDE NOTE TEST</h1>
      <Test listNotesTag={listNotesTag} setListNotesTag={setListNotesTag} />
    </div>
  );
};

export default NoteTest;
