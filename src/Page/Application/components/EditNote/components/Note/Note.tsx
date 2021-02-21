import * as React from 'react';

import Markdown from 'markdown-to-jsx';
import styled from 'styled-components';
import debounce from 'lodash/debounce';

import { useAppContext } from 'ContextApp/AppContext';
import { scrollbarStyle } from 'StylesApp';
import AddTag from './components/AddTag';
import SimpleNoteBlack from 'Images/simplenNoteBlack-logo.png';
import { MarkdownCSS } from './components/MarkdownCSS';

const Note = ({ showMarkdown, selectedNote, trash, updateNote }) => {
  const { setTextSelectedNote } = useAppContext();

  const onUpdateNodeDebounce = React.useCallback(
    debounce((id: string, text: string) => {
      updateNote({
        variables: {
          id,
          text,
        },
      });
    }, 500),
    []
  );

  const onChange = (e) => {
    const {
      target: { value },
    } = e;

    setTextSelectedNote(value);
    onUpdateNodeDebounce(selectedNote.id, value);
  };

  return (
    <Div>
      {selectedNote ? (
        <>
          {selectedNote.isMarkdown && showMarkdown ? (
            <CodeMarkdown>
              <MarkdownCSS
                style={{
                  color: `${(props) => props.theme.colorText} !important`,
                }}
              >
                <Markdown>{selectedNote.text}</Markdown>
              </MarkdownCSS>
            </CodeMarkdown>
          ) : (
            <TextArea
              id="textNote"
              onChange={onChange}
              value={selectedNote.text}
              // value={textNote}
              autoFocus
            ></TextArea>
          )}
          {!trash && <AddTag />}
        </>
      ) : (
        <DivLogo>
          <img src={SimpleNoteBlack} alt="SimpleNoteBlack" />
        </DivLogo>
      )}
    </Div>
  );
};

//--------------styled-----------------

const Div = styled.div`
  width: 100%;
  flex-grow: 1;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
`;

const CodeMarkdown = styled.code`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  max-height: 100%;
  padding: 60px 12%;
  overflow-y: auto;

  ${scrollbarStyle}
`;

const TextArea = styled.textarea.attrs((props) => ({
  id: props.id,
}))`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 60px 12%;
  border: none;
  resize: none;
  font-size: 18px;
  font-weight: 300;
  font-family: inherit;
  overflow-y: auto;
  color: ${(props) => props.theme.colorText};

  ${scrollbarStyle};
`;

const DivLogo = styled.div`
  padding: 14px;
  font-family: inherit;
  font-size: 22px;
  font-weight: 300;
  text-align: center;
  margin: auto;
  height: 100px;
  width: 100px;

  > * {
    opacity: 0.25;
    height: 100%;
    width: 100%;
  }
`;

export default React.memo(Note);
