/* eslint-disable no-redeclare */
/* global localStorage */
/* eslint no-undef: "error" */

import { createStore, applyMiddleware } from 'redux'
import { reducer } from './reducer'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// État initial de l'application
export const initialeState = {
  users: null,
  connected: false,
  status: 'void',
  user: {
    UserName: ' ',
    prenom: ' ',
    nom: ' '
  },
  token: '',
  error: null
}

/**
 * Fonction saveToLocalStorage
 * @param {object} state État de l'application
 * Sauvegarde l'état dans le localStorage
 */
function saveToLocalStorage(state) {
  try {
    // Sérialise l'état en JSON avant de le sauvegarder dans le localStorage
    const serialisedState = JSON.stringify(state)
    localStorage.setItem('persistantState', serialisedState)
  } catch (e) {
    // En cas d'erreur lors de la sauvegarde, affiche un avertissement
    console.warn(e)
  }
}

/**
 * Fonction loadFromLocalStorage
 * Charge l'état depuis le localStorage
 */
function loadFromLocalStorage() {
  try {
    // Récupère l'état sérialisé depuis le localStorage
    const serialisedState = localStorage.getItem('persistantState')

    // Si aucun état n'est trouvé, renvoie "undefined"
    if (serialisedState === null) return undefined

    // Sinon, désérialise l'état depuis le JSON et le renvoie
    return JSON.parse(serialisedState)
  } catch (e) {
    // En cas d'erreur lors du chargement, affiche un avertissement et renvoie "undefined"
    console.warn(e)
    return undefined
  }
}

// Middleware de Redux - Asynchrone car appel API
const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

// Création du store avec le reducer, l'état initial chargé depuis le localStorage et le middleware
const store = createStore(reducer, loadFromLocalStorage(), composedEnhancer)

// Abonnement au store pour sauvegarder l'état dans le localStorage à chaque changement
store.subscribe(() => saveToLocalStorage(store.getState()))

export default store
