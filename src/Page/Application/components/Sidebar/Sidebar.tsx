import * as React from 'react';

import { useMediaQuery } from 'react-responsive';

import SidebarDesktop from './SidebarDesktop';
import SidebarMovil from './SidebarMovil';

const Sidebar = ({ sidebar, editNote, setEditNote }) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 767px)',
  });
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 766px)' });

  return (
    <>
      {isDesktopOrLaptop && sidebar && <SidebarDesktop />}
      {isTabletOrMobile && !editNote && (
        <SidebarMovil id="SidebarMovil" setEditNote={setEditNote} />
      )}
    </>
  );
};

export default Sidebar;
