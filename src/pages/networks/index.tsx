import { FormEvent, useEffect, useState } from 'react'
import { Header } from '../../components/header'
import { Input } from '../../components/input'

import { db } from '../../services/firebaseConnection'
import { setDoc, doc, getDoc } from 'firebase/firestore'

export function Networks() {
  const [facebook, setFacebook] = useState('')
  const [instagram, setInstagram] = useState('')
  const [youtube, setYoutube] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [github, setGithub] = useState('')

  useEffect(() => {
    async function loadLinks() {
      try {
        const docRef = doc(db, 'social', 'link')
        const snapshot = await getDoc(docRef)
        if (snapshot.data() !== undefined) {
          setFacebook(snapshot.data()?.facebook)
          setInstagram(snapshot.data()?.instagram)
          setYoutube(snapshot.data()?.youtube)
          setLinkedin(snapshot.data()?.linkedin)
          setGithub(snapshot.data()?.github)
        }
      } catch (error) {
        console.log('Erro ao buscar as redes sociais, ERROR: ', error)
      }
    }
    loadLinks()
  }, [])

  function handleRegister(e: FormEvent) {
    e.preventDefault()
    try {
      setDoc(doc(db, 'social', 'link'), {
        facebook: facebook,
        instagram: instagram,
        youtube: youtube,
        linkedin: linkedin,
        github: github,
      })
    } catch (error) {
      console.log('Erro ao salvar as redes sociais, ERROR: ', error)
    }
  }

  return (
    <div className='flex flex-col items-center min-h-screen pb-7 px-2'>
      <Header />
      <h1 className='text-white text-2xl font-medium mt-8 mb-4'>Minhas redes sociais</h1>

      <form onSubmit={handleRegister} className='flex flex-col max-w-xl w-full'>
        <label className='text-white font-medium my-2'>Link do Facebook</label>
        <Input
          type='url'
          placeholder='Digite a url do facebook...'
          value={facebook}
          onChange={(e) => setFacebook(e.target.value)}
        />
        <label className='text-white font-medium my-2'>Link do Instagram</label>
        <Input
          type='url'
          placeholder='Digite a url do instagram...'
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />
        <label className='text-white font-medium my-2'>Link do Youtube</label>
        <Input
          type='url'
          placeholder='Digite a url do youtube...'
          value={youtube}
          onChange={(e) => setYoutube(e.target.value)}
        />
        <label className='text-white font-medium my-2'>Link do LinkedIn</label>
        <Input
          type='url'
          placeholder='Digite a url do linkedin...'
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
        />
        <label className='text-white font-medium my-2'>Link do GitHub</label>
        <Input
          type='url'
          placeholder='Digite a url do github...'
          value={github}
          onChange={(e) => setGithub(e.target.value)}
        />

        <button
          type='submit'
          className='flex text-white bg-blue-600 h-9 rounded-md items-center justify-center mt-7 font-medium select-none transition-opacity hover:opacity-70'
        >
          Salvar links
        </button>
      </form>
    </div>
  )
}
