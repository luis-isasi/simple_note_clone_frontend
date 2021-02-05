import * as React from 'react';

import hotkeys from 'hotkeys-js';

const NoteTest = () => {
  hotkeys('ctrl + m', function (event, handler) {
    // Prevent the default refresh event under WINDOWS system
    event.preventDefault();
    console.log('AÑADIENDO SHORTCUTS');

    alert('you pressed ctrl + m!');
  });

  const onClick = () => {
    console.log('DELETE SHORTCUT');

    hotkeys.unbind('ctrl + m');
  };

  return (
    <div>
      {' '}
      <h1>DESDE NOTE TEST</h1>
      <button onClick={onClick}>DELETE</button>
    </div>
  );
};

export default NoteTest;
