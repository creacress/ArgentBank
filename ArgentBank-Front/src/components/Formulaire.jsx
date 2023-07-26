/* eslint-disable no-redeclare */
/* global sessionStorage */
/* eslint no-undef: "error" */

import { useNavigate } from 'react-router-dom'
import { login } from '../redux/action'
import store from '../redux/store'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

/**
 * the Formulaire create
 * a form with controls
 * @component
 */
function Formulaire () {
  const navigate = useNavigate()
  const statutReq = useSelector(state => state.status)
  let rememberMe = document.getElementById('remember-me')
  let email = document.getElementById('email')
  let password = document.getElementById('password')
  let form = document.getElementsByTagName('form')[0]
  let divInputUsername = document.getElementsByClassName('input-wrapper')[0]
  useEffect(() => {
    if (statutReq === 'void') {
      recupererSession()
    }
    if (statutReq === 'connecte') {
      rememberMe = document.getElementById('remember-me')
      if (rememberMe.checked) {
        sauvegarderSession()
      } else {
        supprimerSession()
      }
      navigate('/Profile')
    }
    if (statutReq === 'error') {
      form = document.getElementsByTagName('form')[0]
      let pError = document.getElementsByClassName('error')[0]
      if (pError === undefined) {
        pError = document.createElement('p')
        pError.classList.add('error')
        pError.textContent = 'Invalid username or password'
        form.appendChild(pError)
      }
    }
  }, [statutReq, navigate])

  function connexion (e) {
    e.preventDefault()
    email = document.getElementById('email')
    password = document.getElementById('password')
    if (email !== (undefined, null) || password !== (undefined, null)) {
      store.dispatch(login(email.value, password.value))
    }
  }

  function sauvegarderSession () {
    try {
      email = document.getElementById('email')
      password = document.getElementById('password')
      if (email !== (undefined, null) || password !== (undefined, null)) {
        sessionStorage.setItem('email', email.value)
        sessionStorage.setItem('password', password.value)
        sessionStorage.setItem('rememberMe', rememberMe.checked)
      }
    } catch (e) {
      console.warn(e)
    }
  }

  function supprimerSession () {
    try {
      divInputUsername = document.getElementsByClassName('input-wrapper')[0]
      const dataList = document.getElementById('usernames')
      if (dataList !== (undefined, null)) divInputUsername.removeChild(dataList)
      sessionStorage.clear()
    } catch (e) {
      console.warn(e)
    }
  }

  function recupererSession () {
    try {
      email = document.getElementById('email')
      password = document.getElementById('password')
      rememberMe = document.getElementById('remember-me')
      divInputUsername = document.getElementsByClassName('input-wrapper')[0]
      if (email !== (undefined, null) || password !== (undefined, null)) {
        email.value = sessionStorage.getItem('email')
        password.value = sessionStorage.getItem('password')
        rememberMe.checked = sessionStorage.getItem('rememberMe')
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
