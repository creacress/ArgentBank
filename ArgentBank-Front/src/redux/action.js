/* eslint-disable no-redeclare */
/* global fetch */
/* eslint no-undef: "error" */

import store from './store'

// Actions Redux pour modifier l'état de l'application en fonction des requêtes

/**
 * Fonction dataFetching
 * Indique que des données sont en cours de chargement.
 * @returns {Object} - Action Redux indiquant que des données sont en cours de chargement.
 */
const dataFetching = () => ({ type: 'loading' })

/**
 * Fonction dataError
 * Indique qu'une erreur s'est produite lors du chargement des données.
 * @returns {Object} - Action Redux indiquant qu'une erreur s'est produite.
 */
const dataError = () => ({ type: 'error' })

/**
 * Fonction connexionAction
 * Met à jour l'état avec le jeton d'accès reçu lors de la connexion.
 * @param {Object} data - Données reçues lors de la connexion (contenant le jeton d'accès).
 * @returns {Object} - Action Redux avec les données de connexion.
 */
const connexionAction = (data) => ({ type: 'connexion', payload: data })

/**
 * Fonction profileAction
 * Met à jour l'état avec les informations du profil de l'utilisateur.
 * @param {Object} data - Données du profil de l'utilisateur.
 * @returns {Object} - Action Redux avec les informations du profil de l'utilisateur.
 */
const profileAction = (data) => ({ type: 'profile', payload: data })

/**
 * Fonction updateUserAction
 * Met à jour l'état avec les nouvelles informations de l'utilisateur (prénom, nom).
 * @param {Object} data - Nouvelles informations de l'utilisateur.
 * @returns {Object} - Action Redux avec les nouvelles informations de l'utilisateur.
 */
const updateUserAction = (data) => ({ type: 'updateUser', payload: data })

/**
 * Fonction deconnexionAction
 * Change l'état de connexion en non connecté.
 * @returns {Object} - Action Redux indiquant la déconnexion de l'utilisateur.
 */
const deconnexionAction = () => ({ type: 'deconnexion' })

// Actions Redux Thunk pour effectuer des opérations asynchrones

/**
 * Fonction deconnexion
 * Change l'état de connexion en non connecté.
 * @returns {Function} - Fonction de rappel redux thunk.
 */
export function deconnexion() {
  return function (dispatch) {
    // Dispatch de l'action de déconnexion
    dispatch(deconnexionAction())
  }
}

/**
 * Fonction login
 * Effectue une requête pour se connecter avec un email et un mot de passe.
 * Si les paramètres sont corrects, la requête renvoie un jeton d'accès.
 * Utilise ensuite le jeton pour appeler la fonction profile.
 * @param {String} email - Email du compte.
 * @param {String} password - Mot de passe du compte.
 * @returns {Function} - Fonction de rappel redux thunk.
 */
export function login(email, password) {
  return function (dispatch) {
    try {
      // Dispatch de l'action indiquant le chargement des données
      dispatch(dataFetching())

      // Options de requête pour la connexion
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({ "email": email, "password": password })
      }

      // Appel de l'API pour la connexion
      fetch('http://localhost:3001/api/v1/user/login', requestOptions)
        .then(function (response) {
          if (response.ok) {
            response.json().then(function (data) {
              // Dispatch de l'action avec les données de connexion
              dispatch(connexionAction(data))

              // Appel de la fonction profile pour récupérer les informations du profil de l'utilisateur
              dispatch(profile())
            })
          } else {
            // En cas d'erreur de connexion, dispatch de l'action d'erreur
            dispatch(dataError())
          }
        })
    } catch (error) {
      // En cas d'erreur inattendue, dispatch de l'action d'erreur
      dispatch(dataError())
    }
  }
}

/**
 * Fonction profile
 * Effectue une requête pour récupérer les informations de profil de l'utilisateur à partir du jeton d'accès.
 * @returns {Function} - Fonction de rappel redux thunk.
 */
export function profile() {
  return function (dispatch) {
    try {
      // Options de requête pour récupérer le profil de l'utilisateur
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: 'Bearer ' + store.getState().token
        }
      }

      // Appel de l'API pour récupérer le profil de l'utilisateur
      fetch('http://localhost:3001/api/v1/user/profile', requestOptions)
        .then(function (response) {
          if (response.ok) {
            response.json().then(function (data) {
              // Dispatch de l'action avec les informations du profil de l'utilisateur
              dispatch(profileAction(data))
            })
          }
        })
    } catch (error) {
      // En cas d'erreur inattendue, dispatch de l'action d'erreur
      dispatch(dataError())
    }
  }
}

/**
 * Fonction updateUserInfo
 * Met à jour les informations de l'utilisateur (prénom, nom) dans la base de données.
 * @param {String} userName - Nom d'utilisateur à mettre à jour.
 * @returns {Function} - Fonction de rappel redux thunk.
 */
export function updateUserInfo(userName) {
  return function (dispatch) {
    try {
      // Dispatch de l'action indiquant le chargement des données
      dispatch(dataFetching())

      // Options de requête pour mettre à jour les informations de l'utilisateur
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: 'Bearer ' + store.getState().token
        },
        body: JSON.stringify({ "userName": userName })
      }

      // Appel de l'API pour mettre à jour les informations de l'utilisateur
      fetch("http://localhost:3001/api/v1/user/profile", requestOptions)
        .then(function (response) {
          if (response.ok) {
            response.json().then(function (data) {
              // Dispatch de l'action avec les nouvelles informations de l'utilisateur
              dispatch(updateUserAction(data))
            })
          }
        })
    } catch (error) {
      // En cas d'erreur inattendue, dispatch de l'action d'erreur
      dispatch(dataError())
    }
  }
}
