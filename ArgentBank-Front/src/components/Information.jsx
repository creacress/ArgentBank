import { useSelector } from 'react-redux'
import { useState } from 'react'
import { updateUserInfo } from '../redux/action'
import store from '../redux/store'

function Information() {
  // État local pour gérer le mode d'édition
  const [editMode, setEditMode] = useState(false)
  // État local pour stocker le nouveau nom d'utilisateur en cours de modification
  const [newUserName, setNewUserName] = useState('')
  // Utilisation du hook useSelector pour accéder aux informations de l'utilisateur depuis le store Redux
  const userName = useSelector((state) => state.user.userName)
  const prenom = useSelector((state) => state.user.prenom)
  const nom = useSelector((state) => state.user.nom)

  function handleSave() {
    // Vérifie si le nouveau nom d'utilisateur n'est pas vide avant de le sauvegarder
    if (newUserName !== '') {
      // Dispatch de l'action pour mettre à jour les informations de l'utilisateur
      store.dispatch(updateUserInfo(newUserName))
      // Sortir du mode édition après la sauvegarde
      setEditMode(false)
      // Afficher une alerte indiquant que le changement a été effectué avec succès
      alert('Changement effectué avec succès')
    }
  }

  function handleCancel() {
    // Sortir du mode édition sans sauvegarder les changements
    setEditMode(false)
  }

  function editData() {
    // Pré-remplit le champ d'édition avec le nom d'utilisateur actuel
    setNewUserName(userName)
    // Activer le mode édition
    setEditMode(true)
  }

  return (
    <div className="information">
      {editMode ? (
        // Formulaire d'édition
        <div>
          <h1>Modifier les informations utilisateur</h1>
          <form>
            <div class="user-name">
              <label for="username">Nom d'utilisateur</label>
              <input
                type="text"
                id="username"
                onChange={(e) => setNewUserName(e.target.value)}
              />
            </div>
            <div class="user-name">
              <label for="username">Prénom</label>
              <input
                type="text"
                id="username"
                placeholder={prenom}
                disabled
              />
            </div>
            <div class="user-name">
              <label for="username">Nom de famille</label>
              <input
                type="text"
                id="username"
                placeholder={nom}
                disabled
              />
            </div>
            <div className="divButton">
              <button type="button" onClick={handleSave}>
                Sauvegarder
              </button>
              <button type="reset" onClick={handleCancel}>
                Annuler
              </button>
            </div>
          </form>
        </div>
      ) : (
        // Affichage des informations utilisateur
        <div>
          <h1>
            Bienvenue <br /> {userName}
          </h1>
          <button type="button" onClick={editData}>
            Modifier les informations utilisateur
          </button>
        </div>
      )}
    </div>
  )
}

export default Information
