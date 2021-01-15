import * as React from 'react';

import { useQuery, gql } from '@apollo/client';

const NOTES = gql`
  query GetNotes {
    notes {
      id
      text
      user {
        email
      }
    }
  }
`;

const NoteTest = () => {
  const { loading, error, data } = useQuery(NOTES);

  // const token = JSON.parse(localStorage.getItem('user_session'));
  // console.log(token);

  // console.log(loading);
  // console.log(error);
  console.log(data);
  return (
    <div>
      {' '}
      <h1>DESDE NOTE TEST</h1>
    </div>
  );
};

export default NoteTest;
