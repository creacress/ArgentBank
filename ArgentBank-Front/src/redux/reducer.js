import { initialeState } from './store'

/**
 * Fonction reducer
 * @param {String} state État par défaut (initialeState)
 * @param {String} action Action affectant l'état
 * Fonction de réduction qui gère les modifications de l'état de l'application en fonction des actions.
 */
export function reducer(state, action) {
  // Si l'état est indéfini (au démarrage), il est initialisé avec l'état initial (initialeState).
  if (state === undefined) {
    state = initialeState
  }

  // On utilise un switch pour déterminer quel type d'action a été dispatchée et effectuer la mise à jour appropriée de l'état.
  switch (action.type) {
    case 'error':
      // En cas d'erreur, on met à jour l'état avec le statut 'error'.
      return { ...state, status: 'error' }

    case 'loading':
      // Lorsque des données sont en cours de chargement, on met à jour l'état avec le statut 'loading'.
      return { ...state, status: 'loading' }

    case 'connexion':
      // Lorsqu'une connexion réussie a lieu, on met à jour l'état avec le token et le statut 'connexion'.
      return { ...state, token: action.payload.body.token, status: 'connexion' }

    case 'profile':
      // Lorsqu'un profil est chargé, on met à jour l'état avec les informations du profil connecté.
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

    case 'updateUser':
      // Lorsqu'un utilisateur met à jour son profil, on met à jour les informations spécifiées dans l'action.
      return {
        ...state,
        user: {
          ...state.user,
          userName: action.payload.body.userName,
          prenom: action.payload.body.firstName.disabled,
          nom: action.payload.body.lastName.disabled
        }
      }

    case 'deconnexion':
      // Lorsqu'un utilisateur se déconnecte, on réinitialise l'état avec les valeurs par défaut.
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

    default:
      // Si aucune action correspondante n'est trouvée, on retourne simplement l'état inchangé.
      return state
  }
}
