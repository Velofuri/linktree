import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAyeMZpKSk4inECibRDWY45Qlf2fjYQHSQ',
  authDomain: 'linketree-d000f.firebaseapp.com',
  projectId: 'linketree-d000f',
  storageBucket: 'linketree-d000f.appspot.com',
  messagingSenderId: '321485892751',
  appId: '1:321485892751:web:af6b5fc6a7e66e944314fa',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }
