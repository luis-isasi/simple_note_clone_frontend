import * as React from 'react';

import { useMediaQuery } from 'react-responsive';

import Sidebar from './Sidebar';

const Index = ({
  isOpenSidebar,
  editNote,
  setEditNote,
  switchPinned,
  setSwitchPinned,
  loadingUpdateTextNote,
}) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 767px)',
  });
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 766px)' });

  return (
    <>
      {isDesktopOrLaptop && isOpenSidebar && (
        <Sidebar
          setEditNote={setEditNote}
          switchPinned={switchPinned}
          setSwitchPinned={setSwitchPinned}
          loadingUpdateTextNote={loadingUpdateTextNote}
        />
      )}
      {isTabletOrMobile && !editNote && (
        <Sidebar
          setEditNote={setEditNote}
          switchPinned={switchPinned}
          setSwitchPinned={setSwitchPinned}
          loadingUpdateTextNote={loadingUpdateTextNote}
        />
      )}
    </>
  );
};

export default Index;
