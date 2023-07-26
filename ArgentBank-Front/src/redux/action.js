/* eslint-disable no-redeclare */
/* global fetch */
/* eslint no-undef: "error" */

import store from './store'

const dataFetching = () => ({ type: 'loading' })
const dataError = () => ({ type: 'error' })
const connexionAction = (data) => ({ type: 'connexion', payload: data })
const profileAction = (data) => ({ type: 'profile', payload: data })
const updateUserAction = (data) => ({ type: 'updateUser', payload: data })
const deconnexionAction = () => ({ type: 'deconnexion' })

/**
 * Fonction deconnexion
 * Change l'état de connexion en non connecté.
 * @returns {Function} - Fonction de rappel redux thunk.
 */
export function deconnexion() {
  return function (dispatch) {
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
      dispatch(dataFetching())
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({ "email": email, "password": password })
      }
      fetch('http://localhost:3001/api/v1/user/login', requestOptions)
        .then(function (response) {
          if (response.ok) {
            response.json().then(function (data) {
              dispatch(connexionAction(data))
              dispatch(profile())
            })
          } else {
            dispatch(dataError())
          }
        })
    } catch (error) {
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
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: 'Bearer ' + store.getState().token
        }
      }
      fetch('http://localhost:3001/api/v1/user/profile', requestOptions)
        .then(function (response) {
          if (response.ok) {
            response.json().then(function (data) {
              dispatch(profileAction(data))
            })
          }
        })
    } catch (error) {
      dispatch(dataError())
    }
  }
}

/**
 * Fonction updateUserInfo
 * Met à jour les informations de l'utilisateur (prénom, nom) dans la base de données.
 * @param {String} prenom - Prénom de l'utilisateur.
 * @param {String} nom - Nom de l'utilisateur.
 * @returns {Function} - Fonction de rappel redux thunk.
 */
export function updateUserInfo(userName) {
  return function (dispatch) {
    try {
      dispatch(dataFetching())
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: 'Bearer ' + store.getState().token
        },
        body: JSON.stringify({ "userName" : userName })
      }
      fetch("http://localhost:3001/api/v1/user/profile", requestOptions)
        .then(function (response) {
          if (response.ok) {
            response.json().then(function (data) {
              dispatch(updateUserAction(data))
            })
          }
        })
    } catch (error) {
      dispatch(dataError())
    }
  }
}
