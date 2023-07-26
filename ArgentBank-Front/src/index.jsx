import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Accueil from './pages/Accueil'
import Connexion from './pages/Connexion'
import User from './pages/User'
import { Provider } from 'react-redux'
import store from './redux/store'
import './Sass/main.scss'
import history from './redux/history'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  // Utilisation du composant Provider de react-redux pour fournir le store Redux à l'application
  <Provider store={store}>
    {/* Utilisation de React.StrictMode pour détecter les problèmes potentiels dans l'application */}
    <React.StrictMode>
      {/* Utilisation du Router pour gérer les routes de l'application */}
      <Router history={history}>
        {/* Utilisation de Routes pour définir les différentes routes de l'application */}
        <Routes>
          {/* Route pour la page d'accueil */}
          <Route path='/' element={<Accueil />} />
          {/* Route pour la page de connexion */}
          <Route path='/Login' element={<Connexion />} />
          {/* Route pour la page de profil utilisateur */}
          <Route path='/Profile/*' element={<User />} />
          {/* Route par défaut en cas d'URL inconnue */}
          <Route path='/*' element={<Connexion />} />
        </Routes>
      </Router>
    </React.StrictMode>
  </Provider>
)
