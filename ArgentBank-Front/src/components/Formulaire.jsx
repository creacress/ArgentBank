/* eslint-disable no-redeclare */
/* global sessionStorage */
/* eslint no-undef: "error" */

import { useNavigate } from 'react-router-dom'
import { login } from '../redux/action'
import store from '../redux/store'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

/**
 * Composant Formulaire
 * Un formulaire avec des contrôles
 * @component
 */
function Formulaire() {
  const navigate = useNavigate()
  const statutReq = useSelector(state => state.status)
  let rememberMe = document.getElementById('remember-me')
  let email = document.getElementById('email')
  let password = document.getElementById('password')
  let form = document.getElementsByTagName('form')[0]
  let divInputUsername = document.getElementsByClassName('input-wrapper')[0]

  useEffect(() => {
    // Au montage du composant, vérifie l'état de connexion et restaure les informations de session si nécessaire.
    if (statutReq === 'void') {
      recupererSession()
    }
    if (statutReq === 'connecte') {
      rememberMe = document.getElementById('remember-me')
      // Si l'option "Se souvenir de moi" est cochée, sauvegarde les informations de session.
      if (rememberMe.checked) {
        sauvegarderSession()
      } else {
        // Sinon, supprime les informations de session.
        supprimerSession()
      }
      // Redirige l'utilisateur vers la page de profil.
      navigate('/Profile')
    }
    if (statutReq === 'error') {
      // En cas d'erreur de connexion, affiche un message d'erreur dans le formulaire.
      form = document.getElementsByTagName('form')[0]
      let pError = document.getElementsByClassName('error')[0]
      if (pError === undefined) {
        pError = document.createElement('p')
        pError.classList.add('error')
        pError.textContent = 'Nom d\'utilisateur ou mot de passe invalide'
        form.appendChild(pError)
      }
    }
  }, [statutReq, navigate])

  function connexion(e) {
    e.preventDefault()
    email = document.getElementById('email')
    password = document.getElementById('password')
    // Vérifie que les champs email et mot de passe ne sont pas vides avant de lancer la connexion.
    if (email !== (undefined, null) || password !== (undefined, null)) {
      // Dispatch de l'action de connexion avec les informations saisies par l'utilisateur.
      store.dispatch(login(email.value, password.value))
    }
  }

  function sauvegarderSession() {
    try {
      email = document.getElementById('email')
      password = document.getElementById('password')
      // Vérifie que les champs email et mot de passe ne sont pas vides avant de sauvegarder les informations de session.
      if (email !== (undefined, null) || password !== (undefined, null)) {
        // Sauvegarde les informations de session dans le sessionStorage.
        sessionStorage.setItem('email', email.value)
        sessionStorage.setItem('password', password.value)
        sessionStorage.setItem('rememberMe', rememberMe.checked)
      }
    } catch (e) {
      // En cas d'erreur lors de la sauvegarde, affiche un avertissement.
      console.warn(e)
    }
  }

  function supprimerSession() {
    try {
      divInputUsername = document.getElementsByClassName('input-wrapper')[0]
      const dataList = document.getElementById('usernames')
      // Supprime la liste des utilisateurs enregistrés dans le formulaire.
      if (dataList !== (undefined, null)) divInputUsername.removeChild(dataList)
      // Supprime toutes les informations de session du sessionStorage.
      sessionStorage.clear()
    } catch (e) {
      // En cas d'erreur lors de la suppression, affiche un avertissement.
      console.warn(e)
    }
  }

  function recupererSession() {
    try {
      email = document.getElementById('email')
      password = document.getElementById('password')
      rememberMe = document.getElementById('remember-me')
      divInputUsername = document.getElementsByClassName('input-wrapper')[0]
      // Récupère les informations de session depuis le sessionStorage et les restaure dans le formulaire.
      if (email !== (undefined, null) || password !== (undefined, null)) {
        email.value = sessionStorage.getItem('email')
        password.value = sessionStorage.getItem('password')
        rememberMe.checked = sessionStorage.getItem('rememberMe')
        // Crée la liste des utilisateurs enregistrés dans le formulaire s'il y a des informations de session sauvegardées.
        let dataList = document.getElementById('usernames')
        if (dataList === (undefined, null) && email.value !== '') {
          dataList = document.createElement('datalist')
          const optionUsername = document.createElement('option')
          optionUsername.value = email.value
          dataList.id = 'usernames'
          divInputUsername.appendChild(dataList)
          dataList.appendChild(optionUsername)
        }
      }
    } catch (e) {
      // En cas d'erreur lors de la récupération, affiche un avertissement.
      console.warn(e)
    }
  }

  return (
    <section>
      <i className='fa fa-user-circle fa-4x sign-in-icon' />
      <h1> Sign In </h1>
      <form>
        <div className='input-wrapper'>
          <label htmlFor='username'>Username:</label>
          <input type='text' list='usernames' id='email' required />
        </div>
        <div className='input-wrapper'>
          <label htmlFor='password'>Password:</label>
          <input type='password' id='password' required />
        </div>
        <div className='input-remember'>
          <input type='checkbox' id='remember-me' />
          <label htmlFor='remember-me'>Remember me</label>
        </div>
        <button
          className='sign-in-button'
          onClick={connexion}
        > Sign In
        </button>
      </form>
    </section>
  )
}

export default Formulaire
