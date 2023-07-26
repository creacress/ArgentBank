import { createBrowserHistory } from 'history'

export default createBrowserHistory()
// Si besoin pour naviguer sans recharger la page : 

//Navigation vers une autre URL en utilisant history.push('/nouvelle-url').
// Navigation vers l'historique précédent en utilisant history.goBack().
// Navigation vers l'historique suivant en utilisant history.goForward()