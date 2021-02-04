export type InitialFormState = {
  email: string;
  password: string;
  showPassword: boolean;
  errors: {
    errorMessage: string;
    email: string;
    password: string;
  };
};

export type FormAction =
  | {
      type: 'SET_VALUE';
      name: string;
      value: string;
    }
  | {
      type: 'SET_ERROR';
      field: string;
      error: string;
    }
  | {
      type: 'SET_CLEAR_ERROR';
      field: string;
    }
  | {
      type: 'SET_SHOW_PASSWORD';
    };
