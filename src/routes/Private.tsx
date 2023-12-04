import { ReactNode, useEffect, useState } from 'react'
import { auth } from '../services/firebaseConnection'
import { onAuthStateChanged } from 'firebase/auth'
import { Navigate } from 'react-router-dom'

type PrivateProps = {
  children: ReactNode
}

export function Private({ children }: PrivateProps) {
  const [loading, setLoading] = useState(true)
  const [signed, steSigned] = useState(false)
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          uid: user?.uid,
          email: user?.email,
        }
        localStorage.setItem('@linktree', JSON.stringify(userData))
        setLoading(false)
        steSigned(true)
      } else {
        setLoading(false)
        steSigned(false)
      }
    })

    return () => unsub()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!signed) {
    return <Navigate to='/login' />
  }

  return children
}
