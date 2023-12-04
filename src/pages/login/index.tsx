import { Link, useNavigate } from 'react-router-dom'
import { Input } from '../../components/input'
import { useState, FormEvent } from 'react'
import { auth } from '../../services/firebaseConnection'
import { signInWithEmailAndPassword } from 'firebase/auth'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    try {
      const teste = await signInWithEmailAndPassword(auth, email, password)
      console.log('Logado com Sucesso', teste)
      navigate('/admin', { replace: true })
    } catch (error) {
      alert('Usuario ou senha inválido')
    }
  }
  return (
    <div className='flex flex-col w-full h-screen items-center justify-center'>
      <Link to='/'>
        <h1 className='mt-11 mb-7 text-white font-bold text-5xl'>
          Dev
          <span className='bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent'>
            Link
          </span>
        </h1>
      </Link>

      <form onSubmit={handleSubmit} className='flex flex-col w-full max-w-xl px-2'>
        <Input
          required
          placeholder='Digite seu e-mail'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          required
          placeholder='Digite sua senha'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type='submit'
          className='h-9 bg-blue-600 rounded border-0 text-lg font-medium text-white'
        >
          Acessar
        </button>
      </form>
    </div>
  )
}
