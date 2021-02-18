import * as React from 'react';

import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';

import HeaderDesktop from './components/Header/HeaderDesktop';
import HeaderMovil from './components/Header/HeaderMovil';
import Note from './components/Note';

const EditNote = ({
  showMarkdown,
  setShowMakdown,
  note,
  trash,
  allNotes,
  setEditNote,
  editNote,
  textNote,
  setTextNote,
}) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 767px)',
  });
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 766px)' });

  return (
    <>
      {isDesktopOrLaptop && (
        <ContentDesktop>
          <HeaderDesktop
            showMarkdown={showMarkdown}
            setShowMakdown={setShowMakdown}
            note={note}
            trash={trash}
            allNotes={allNotes}
          />
          <Note
            showMarkdown={showMarkdown}
            note={note}
            trash={trash}
            textNote={textNote}
            setTextNote={setTextNote}
          />
        </ContentDesktop>
      )}
      {isTabletOrMobile && note && editNote && (
        <ContentMovil>
          <HeaderMovil
            showMarkdown={showMarkdown}
            setShowMakdown={setShowMakdown}
            note={note}
            trash={trash}
            allNotes={allNotes}
            setEditNote={setEditNote}
          />
          <Note showMarkdown={showMarkdown} note={note} trash={trash} />
        </ContentMovil>
      )}
    </>
  );
};

//-------------STYLED-----------

const ContentDesktop = styled.div`
  flex-grow: 1;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
`;

const ContentMovil = styled.div.attrs((props) => ({
  id: props.id,
}))`
  flex-grow: 1;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
`;

export default EditNote;
