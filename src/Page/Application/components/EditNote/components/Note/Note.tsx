import * as React from 'react';

import Markdown from 'markdown-to-jsx';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import debounce from 'lodash/debounce';

import { scrollbarStyle } from 'StylesApp';
import UPDATE_NOTE from 'GraphqlApp/UpdateNote.graphql';
import AddTag from './components/AddTag';
import SimpleNoteBlack from 'Images/simplenNoteBlack-logo.png';
import { MarkdownCSS } from './components/MarkdownCSS';

const Note = ({ showMarkdown, note, trash }) => {
  const [value, setValue] = React.useState(note ? note.text : '');

  const [updateNote] = useMutation(UPDATE_NOTE);

  React.useEffect(() => {
    if (note) {
      setValue(note.text);
    }
  }, [note]);

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
      target: { value: _value },
    } = e;
    setValue(_value);
    onUpdateNodeDebounce(note.id, _value);
  };

  return (
    <Div>
      {note ? (
        <>
          {note.isMarkdown && showMarkdown ? (
            <CodeMarkdown>
              <MarkdownCSS
                style={{
                  color: `${(props) => props.theme.colorText} !important`,
                }}
              >
                <Markdown>{value}</Markdown>
              </MarkdownCSS>
            </CodeMarkdown>
          ) : (
            <TextArea
              id="textNote"
              onChange={onChange}
              value={value}
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
