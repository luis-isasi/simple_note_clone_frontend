import * as React from 'react';
import Note from '../Page/Application/components/Note';

type NoteState = {
  note: Note;
  selectNote(note: Note): void;
  colorIcon: string;
};

type Note = {
  id: string;
  text: string;
  user: User;
};

type User = {
  id: string;
  email: string;
};

const NoteContext = React.createContext<NoteState | undefined>(undefined);

export const NoteContextProvider = ({ children }) => {
  const [note, setNote] = React.useState(undefined);

  const selectNote = (note: Note) => {
    setNote(note);
  };

  const colorIcon = '#3361cc';
  return (
    <NoteContext.Provider value={{ note, selectNote, colorIcon }}>
      {children}
    </NoteContext.Provider>
  );
};

export const useNoteContext = () => {
  const noteData = React.useContext(NoteContext);

  if (noteData === undefined) {
    throw new Error('useNoteContext must be within the NoteContextProvide.');
  }

  return noteData;
};
