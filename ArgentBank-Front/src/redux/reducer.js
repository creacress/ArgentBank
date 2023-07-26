import { initialeState } from './store'

/**
 * Function reducer
 * @param {String} state default initialeState
 * @param {String} action action of state
 * switch in case of type of action the state has update
 */
export function reducer (state, action) {
  if (state === undefined) {
    state = initialeState
  }
  switch (action.type) {
    case 'error' : return { ...state, status: 'error' }
    case 'loading' :
      return { ...state, status: 'loading' }
    case 'connexion' : {
      return { ...state, token: action.payload.body.token, status: 'connexion' }
    }
    case 'profile' : {
      return {
        ...state,
        connected: true,
        status: 'connecte',
        user: {
          ...state.user,
          prenom: action.payload.body.firstName,
          nom: action.payload.body.lastName
        }
      }
    }
    case 'updateUser' : {
      return {
        ...state,
        user: {
          ...state.user,
          userName: action.payload.body.userName,
          prenom: action.payload.body.firstName.disabled,
          nom: action.payload.body.lastName.disabled
        }
      }
    }
    case 'deconnexion' : {
      return {
        ...state,
        connected: false,
        token: '',
        status: 'void',
        user: {
          ...state.user,
          prenom: '',
          nom: ''
        }
      }
    }
    default:
  }
  return state
}
