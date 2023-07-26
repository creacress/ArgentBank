import { useSelector } from 'react-redux'
import { useState } from 'react'
import { updateUserInfo } from '../redux/action'
import store from '../redux/store'

function Information() {
  const [editMode, setEditMode] = useState(false)
  const [newUserName, setNewUserName] = useState('')
  const userName = useSelector((state) => state.user.userName)
  const prenom = useSelector((state) => state.user.prenom)
  const nom = useSelector((state) => state.user.nom)

  function handleSave() {
    if (newUserName !== '') {
      store.dispatch(updateUserInfo(newUserName))
      setEditMode(false)
      alert('Change made successfully')
    }
  }

  function handleCancel() {
    setEditMode(false)
  }

  function editData() {
    setNewUserName(userName)
    setEditMode(true)
  }

  return (
    <div className="information">
      {editMode ? (
        //form
        <div>
          <h1>Edit user info</h1>
          <form>
            <div class="user-name">
              <label for="username">Username</label>
              <input
                type="text"
                id="username"
                onChange={(e) => setNewUserName(e.target.value)}
              />
            </div>
            <div class="user-name">
              <label for="username">First name</label>
              <input
                type="text"
                id="username"
                placeholder={nom}
                disabled
              />
            </div>
            <div class="user-name">
              <label for="username">Last name</label>
              <input
                type="text"
                id="username"
                placeholder={prenom}
                disabled
              />
            </div>
            <div className="divButton">
              <button type="button" onClick={handleSave}>
                Save
              </button>
              <button type="reset" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <h1>
            Welcome back <br /> {userName}
          </h1>
          <button type="button" onClick={editData}>
            Edit user info
          </button>
        </div>
      )}
    </div>
  )
}

export default Information
