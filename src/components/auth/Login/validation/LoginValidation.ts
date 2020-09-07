const ValidateEmail = (email) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
};

export const validateForm = (key, state, options = {form:''}) => {
  let errors = {
    ...state.errors,
    errorMessage: { ...state.errors.errorMessage },
    isError: state.errors.isError,
  };
  switch (key) {
    case 'username':
      errors.errorMessage[key] =
        state.data[key].length !== 0 ? '' : `${key} is required`;
      break;
    case 'email':
      errors.errorMessage[key] = ValidateEmail(state.data[key])
        ? ''
        : 'invalid email';
      break;
    case 'password':
      if(options.form && options.form   === 'login'){
        errors.errorMessage[key] =
        state.data[key].length !== 0 ? '' : `${key} is required`;
        break;
      }
      errors.errorMessage[key] = state.data[key]
        ? state.data[key].length <= 6
          ? 'weak password'
          : state.data['confirmPassword'].length > 6
            ?
             state.data['confirmPassword'] === state.data[key]
            ? '' : 'passwords dont match'
            : ''
        : `${key} is required`
      break;
    case 'confirmPassword':
      errors.errorMessage[key] = state.data[key]
        ? state.data['password'] === state.data[key]
          ? ''
          : 'passwords dont match'
        : `${key} is required`;
      break;
    default:
      errors.errorMessage[key] = state.data[key] ? '' : `${key} is Required`;
      break;
  }
  errors.isError =
  Object.values(errors.errorMessage).filter((err) => err).length > 0;
  return errors;
};
