import { FormEvent, useState, useEffect } from 'react'
import { Header } from '../../components/header'
import { Input } from '../../components/input'
import { FiTrash } from 'react-icons/fi'

import { db } from '../../services/firebaseConnection'
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc,
} from 'firebase/firestore'

type LinkProps = {
  id: string
  name: string
  url: string
  bg: string
  color: string
}

export function Admin() {
  const [nameInput, setNameInput] = useState('')
  const [urlInput, setUrlInput] = useState('')
  const [textColorInput, setTextColorInput] = useState('#FFFFFF')
  const [bgColorInput, setBgColorInput] = useState('#1100ff')

  const [links, setLinks] = useState<LinkProps[]>([])

  useEffect(() => {
    const linksRef = collection(db, 'links')
    const queryRef = query(linksRef, orderBy('created', 'asc'))

    const unsub = onSnapshot(queryRef, (snapshot) => {
      const listLinks: LinkProps[] = []

      snapshot.forEach((doc) => {
        listLinks.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          color: doc.data().color,
        })
      })
      setLinks(listLinks)
    })

    return () => unsub()
  }, [])

  async function handleRegister(e: FormEvent) {
    e.preventDefault()
    try {
      await addDoc(collection(db, 'links'), {
        name: nameInput,
        url: urlInput,
        bg: bgColorInput,
        color: textColorInput,
        created: new Date(),
      })
      setNameInput('')
      setUrlInput('')
    } catch (error) {
      console.log('Erro ao cadastrar link. ERROR: ', error)
    }
  }

  async function handleDeleteLink(id: string) {
    const docRef = doc(db, 'links', id)
    try {
      await deleteDoc(docRef)
    } catch (error) {
      console.log('Erro ao deletar link, ERROR: ', error)
    }
  }

  return (
    <div className='flex flex-col items-center min-h-screen pb-7 px-2'>
      <Header />
      <form onSubmit={handleRegister} className='flex flex-col mt-8 mb-3 w-full max-w-xl'>
        <label className='text-white font-medium my-2'>Nome do Link</label>
        <Input
          required
          placeholder='Digite o nome do Link'
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />
        <label className='text-white font-medium my-2'>URL do Link</label>
        <Input
          required
          type='url'
          placeholder='Digite a URL do Link'
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
        />

        <section className='flex my-4 gap-5'>
          <div className='flex gap-2'>
            <label className='text-white font-medium my-2'>Cor do Link</label>
            <input
              type='color'
              value={textColorInput}
              onChange={(e) => setTextColorInput(e.target.value)}
            />
          </div>
          <div className='flex gap-2'>
            <label className='text-white font-medium my-2'>Fundo do Link</label>
            <input
              type='color'
              value={bgColorInput}
              onChange={(e) => setBgColorInput(e.target.value)}
            />
          </div>
        </section>

        {nameInput !== '' && (
          <div className='flex flex-col items-center justify-center mb-7 p-1 border border-gray-100/25 rounded-md'>
            <label className='text-white font-medium my-2'>Preview do Botão</label>
            <article
              className={`flex flex-col items-center justify-between w-11/12 rounded-md max-w-lg px-1 py-3 my-2`}
              style={{ backgroundColor: bgColorInput }}
            >
              <p className='font-medium' style={{ color: textColorInput }}>
                {nameInput}
              </p>
            </article>
          </div>
        )}

        <button
          type='submit'
          className='flex items-center justify-center bg-blue-600 h-9 rounded-md text-white font-medium mb-7 select-none'
        >
          Cadastrar
        </button>
      </form>

      <h2 className='font-bold text-white mb-4 text-2xl'>Meus Links</h2>
      {links.map((doc) => (
        <article
          key={doc.id}
          className='flex items-center justify-between w-11/12 max-w-xl rounded py-2 px-4 mb-2 select-none'
          style={{ backgroundColor: doc.bg, color: doc.color }}
        >
          <p>{doc.name}</p>
          <button
            onClick={() => handleDeleteLink(doc.id)}
            className='border border-dashed p-1 rounded hover:bg-gray-700/50'
          >
            <FiTrash size={18} color='#FFF' />
          </button>
        </article>
      ))}
    </div>
  )
}
