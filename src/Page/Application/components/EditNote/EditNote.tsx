import * as React from 'react';

import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';

import HeaderDesktop from './components/Header/HeaderDesktop';
import HeaderMovil from './components/Header/HeaderMovil';
import Note from './components/Note';

const EditNote = ({
  showMarkdown,
  setShowMakdown,
  selectedNote,
  trash,
  allNotes,
  setEditNote,
  editNote,
  updateNote,
}) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 767px)',
  });
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 766px)' });

  return (
    <Content>
      {isDesktopOrLaptop && (
        <>
          <HeaderDesktop
            showMarkdown={showMarkdown}
            setShowMakdown={setShowMakdown}
            selectedNote={selectedNote}
            trash={trash}
            allNotes={allNotes}
          />
          <Note
            showMarkdown={showMarkdown}
            selectedNote={selectedNote}
            trash={trash}
            updateNote={updateNote}
          />
        </>
      )}
      {isTabletOrMobile && selectedNote && editNote && (
        <>
          <HeaderMovil
            showMarkdown={showMarkdown}
            setShowMakdown={setShowMakdown}
            selectedNote={selectedNote}
            trash={trash}
            allNotes={allNotes}
            setEditNote={setEditNote}
          />
          <Note
            showMarkdown={showMarkdown}
            selectedNote={selectedNote}
            trash={trash}
            updateNote={updateNote}
          />
        </>
      )}
    </Content>
  );
};

//-------------STYLED-----------

const Content = styled.div`
  flex-grow: 1;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
`;

export default EditNote;
