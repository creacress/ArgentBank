import PropTypes from 'prop-types'

/**
 * @param {String} titre title of account
 * @param {String} montant the global ammount of account
 * @param {String} description the desciption of account
 * @component
 */

function Compte ({ titre, montant, description }) {
  
  return (
    <section className='compte'>
      <div>
        <h3> {titre} </h3>
        <p className='compte-montant'> {montant} </p>
        <p className='compte-description'> {description} </p>
      </div>
      <div className='cta'>
        <button className='buttonTrans' onClick={() => console.log("g")}> View transactions </button>
      </div>
    </section>
  )
}

Compte.propTypes = {
  titre: PropTypes.string.isRequired,
  montant: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

export default Compte
