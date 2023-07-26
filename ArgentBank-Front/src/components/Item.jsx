import PropTypes from 'prop-types'

/**
 * @param {String} image image of introduce information
 * @param {String} titre title of Item
 * @param {String} description the desciption of Item
 * @component
 */
function Item ({ image, titre, description }) {
  return (
    <div className='item'>
      <img src={image} alt='item' />
      <h3> {titre} </h3>
      <p> {description} </p>
    </div>
  )
}

Item.propTypes = {
  image: PropTypes.string.isRequired,
  titre: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}
export default Item
