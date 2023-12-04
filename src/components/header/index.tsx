import { Link } from 'react-router-dom'
import { BiLogOut } from 'react-icons/bi'
import { signOut } from 'firebase/auth'
import { auth } from '../../services/firebaseConnection'

export function Header() {
  async function handleLogout() {
    await signOut(auth)
  }

  return (
    <header className='w-full max-w-2xl mt-4 px-1'>
      <nav className='flex items-center justify-between w-full bg-white h-12 rounded-md px-3'>
        <div className='flex gap-4 font-medium'>
          <Link
            to='/'
            className='flex items-center justify-center hover:bg-slate-300 rounded py-1 px-2 transition-colors'
          >
            Home
          </Link>
          <Link
            to='/admin'
            className='flex items-center justify-center hover:bg-slate-300 rounded py-1 px-2 transition-colors'
          >
            Links
          </Link>
          <Link
            to='/admin/social'
            className='flex items-center justify-center hover:bg-slate-300 rounded py-1 px-2 transition-colors'
          >
            Redes Sociais
          </Link>
        </div>

        <button onClick={handleLogout}>
          <BiLogOut size={28} color='#db2629' />
        </button>
      </nav>
    </header>
  )
}
