import * as React from 'react';

import { useMediaQuery } from 'react-responsive';

import Sidebar from './Sidebar';

const Index = ({ sidebar, editNote, setEditNote }) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 767px)',
  });
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 766px)' });

  return (
    <>
      {isDesktopOrLaptop && sidebar && <Sidebar setEditNote={setEditNote} />}
      {isTabletOrMobile && !editNote && <Sidebar setEditNote={setEditNote} />}
    </>
  );
};

export default Index;
