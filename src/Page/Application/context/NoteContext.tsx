import * as React from 'react';

import { useQuery } from '@apollo/client';
import GET_NOTES from '../graphql/GetNotes.graphql';

type NoteState = {
  note: Note;
  selectNote(note: Note): void;
  listNotes: Note[];
  setListNotes(note: Note[]): void;
  updateListNote(): void;
  newNote(note: Note): void;
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
  const [listNotes, setListNotes] = React.useState(undefined);

  const { loading, error, data } = useQuery(GET_NOTES);

  React.useEffect(() => {
    if (data) {
      console.log('seteando la list desde effect context');
      setListNotes(data.notes);
    }
  }, [data]);

  const selectNote = (note: Note) => {
    setNote(note);
  };

  const updateListNote = () => {
    if (data && !error) {
      setListNotes(data.notes);
    }
  };
  const newNote = (note: Note) => {
    console.log('desde newnote');
    setListNotes([...listNotes, note]);
  };

  return (
    <NoteContext.Provider
      value={{
        note,
        selectNote,
        listNotes,
        setListNotes,
        updateListNote,
        newNote,
      }}
    >
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
