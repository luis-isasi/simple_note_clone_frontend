import { useQuery } from '@apollo/client';

import { useNoteContext } from '../../context/NoteContext';
import SEARCH_NOTE from '../../graphql/SearchNote.graphql';

const useSearchNote = (search) => {
  const noteData = useNoteContext();
  const { loading, error, data } = useQuery(SEARCH_NOTE, {
    variables: { text: search },
  });

  if (!error && data) {
    noteData.setListNotes(data.notes);
  }
  return { loading, error, data };
};

export default useSearchNote;
