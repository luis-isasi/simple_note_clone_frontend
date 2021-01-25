// import * as React from 'react';

// type NoteState = {
//   listNotes: Note[];
//   setListNotes(note: Note[]): void;
//   // addNote(note: Note): void;
// };

// type Note = {
//   id: string;
//   text: string;
//   user: User;
// };

// type User = {
//   id: string;
//   email: string;
// };

// const NoteListContext = React.createContext<NoteState | undefined>(undefined);

// export const NoteListContextProvider = ({ children }) => {
//   const [listNotes, setListNotes] = React.useState(undefined);

//   // const addNote = (note: Note) => {
//   //   setListNotes([note, ...listNotes]);
//   // };

//   return (
//     <NoteListContext.Provider
//       value={{
//         listNotes,
//         setListNotes,
//         // addNote,
//       }}
//     >
//       {children}
//     </NoteListContext.Provider>
//   );
// };

// export const useNoteListContext = () => {
//   const noteListData = React.useContext(NoteListContext);

//   if (noteListData === undefined) {
//     throw new Error('useNoteContext must be within the NoteContextProvide.');
//   }

//   return noteListData;
// };
