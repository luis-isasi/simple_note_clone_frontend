import * as React from 'react';

import { useApolloClient, gql } from '@apollo/client';

import { Note, Tag } from 'TypesApp';

type AppState = {
  note: Note;
  selectNote(note: Note): void;
  addTagInCurrentNote(tag: Tag): void;
  deleteTagInCurrentNote(tag: Tag): void;
  allNotes: boolean;
  setAllNotes(allNotes: boolean): void;
  trash: boolean;
  setTrash(trash: boolean): void;
  sidebar: boolean;
  setSidebar(sidebar: boolean): void;
  main: boolean;
  showMain(): void;
  info: boolean;
  showInfo(show: boolean): void;
};

const AppContext = React.createContext<AppState | undefined>(undefined);

export const AppContextProvider = ({ children }) => {
  const [note, selectNote] = React.useState(undefined);
  const [allNotes, setAllNotes] = React.useState(true);
  const [trash, setTrash] = React.useState(false);
  const [sidebar, setSidebar] = React.useState(true);
  const [main, setMain] = React.useState(false);
  const [info, setInfo] = React.useState(false);

  const client = useApolloClient();

  const showMain = () => {
    const app = document.querySelector('#Application');

    //function a ejecutar para esconder Main
    const onClick = () => {
      const Main = document.getElementById('main');
      //añadimos las clases para los keyframes
      Main.classList.remove('mainActive');
      Main.classList.add('mainNoActive');
      app.removeEventListener('click', onClick);
      setTimeout(() => {
        setMain(false);
      }, 200);
    };

    //show Main
    setMain(true);
    app.addEventListener('click', onClick);
  };

  //accedemos a App del DOM y hacemos que esta funcion se memorize
  // asi logramos limpirar el eventListener satisafactoriamente
  const app = document.querySelector('#Application');
  const onClick = React.useCallback(() => {
    const info = document.querySelector('#info');
    //añadimos las clases para los keyframes
    info.classList.remove('infoActive');
    info.classList.add('infoNoActive');
    app.removeEventListener('click', onClick);
    //luego de la animacion desmontamos el componente del dom
    setTimeout(() => {
      setInfo(false);
    }, 200);
  }, [app]);

  const showInfo = (show: boolean) => {
    if (show) {
      setInfo(show);
      app.addEventListener('click', onClick);
    }

    if (!show) {
      onClick();
    }
  };

  const addTagInCurrentNote = (tag: Tag) => {
    // update the note from the context
    selectNote({
      ...note,
      tags: [...note.tags, tag],
    });
    // update the cache
    client.cache.modify({
      //le pasamos la nota seleccionada para acceder dentro de ella
      id: client.cache.identify(note),
      //accedemos a el campo "tags" y creamos una referencia
      fields: {
        tags(existingsTags = []) {
          const newTagRef = client.cache.writeFragment({
            data: tag,
            fragment: gql`
              fragment newTag on Tag {
                id
                name
                notes {
                  id
                  text
                }
              }
            `,
          });
          return [...existingsTags, newTagRef];
        },
      },
    });
  };

  const deleteTagInCurrentNote = (tag: Tag) => {
    const tags = note.tags.filter((currentTag) => currentTag.id !== tag.id);
    selectNote({
      ...note,
      tags,
    });
    client.cache.modify({
      id: client.cache.identify(note),
      fields: {
        tags(existingstags = []) {
          const tagId = client.cache.identify(tag);

          return existingstags.filter((tag) => tag.__ref !== tagId);
        },
      },
    });
  };

  return (
    <AppContext.Provider
      value={{
        note,
        selectNote,
        addTagInCurrentNote,
        deleteTagInCurrentNote,
        allNotes,
        setAllNotes,
        trash,
        setTrash,
        sidebar,
        setSidebar,
        main,
        showMain,
        info,
        showInfo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const dataApp = React.useContext(AppContext);

  if (dataApp === undefined) {
    throw new Error('useAppContext must be inside AppContextProvider ');
  }
  return dataApp;
};
