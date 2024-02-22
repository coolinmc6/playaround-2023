type UserSettingsState = {
  name: string;
  email: string;
  receiveNewsletter: boolean;
  theme: string;
  active: boolean;
}

type UserSettingsAction = {
  type: string;
  payload?: any;
}

export const userSettingsReducer = (
    state: UserSettingsState,
    action: UserSettingsAction
  ) => {
  switch (action.type) {
    case 'toggle-activation': {
      return { ...state, active: !state.active };
    }
    case 'toggle-theme': {
      const theme = state.theme === 'dark' ? 'light' : 'dark';
      return { ...state, theme };
    }
    case 'toggle-newsletter': {
      return { ...state, receiveNewsletter: !state.receiveNewsletter };
    }
    case 'update-email': {
      const { email } = action.payload;
      return { ...state, email };
    }
    case 'update-name':{
      const { name } = action.payload;
      return { ...state, name };
    }
    default: {
      return state;
    }
  }
}
