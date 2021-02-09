import * as React from 'react';

import Markdown from 'markdown-to-jsx';

// import Test from './Test';

const NoteTest = () => {
  // const [listNotesTag, setListNotesTag] = React.useState(undefined);

  const textMarkdown = `
  1. First item
  2. Second item
  3. Third item
  4. Fourth item


  ## Heading level 2
  ## Heading level 2
  
  `;
  return (
    <div>
      <h1>DESDE NOTE TEST</h1>
      <textarea>
        <Markdown>{textMarkdown}</Markdown>
      </textarea>
      {/* <Test listNotesTag={listNotesTag} setListNotesTag={setListNotesTag} /> */}
    </div>
  );
};

export default NoteTest;
