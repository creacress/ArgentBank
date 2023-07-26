import Header from '../components/Header'
import Footer from '../components/Footer'
import Formulaire from '../components/Formulaire'

/**
 * The Connexion Page
 * with header,
 * form to connect at your personnal espace
 * and footer of Argent Bank
 * @component
 */
function Connexion () {
  return (
    <div className='connexion'>
      <Header />
      <main>
        <Formulaire />
      </main>
      <Footer />
    </div>
  )
}

export default Connexion
