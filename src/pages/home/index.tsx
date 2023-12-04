import { useEffect, useState } from 'react'
import { Social } from '../../components/social'
import { FaInstagram, FaLinkedin, FaGithub, FaYoutube, FaFacebook } from 'react-icons/fa'

import { db } from '../../services/firebaseConnection'
import { getDocs, getDoc, collection, orderBy, query, doc } from 'firebase/firestore'

type LinkProps = {
  id: string
  name: string
  url: string
  bg: string
  color: string
}

type SocialLinksProps = {
  facebook: string
  youtube: string
  instagram: string
  linkedin: string
  github: string
}

export function Home() {
  const [links, setLinks] = useState<LinkProps[]>([])
  const [socialLinks, setSocialLinks] = useState<SocialLinksProps>()

  useEffect(() => {
    async function loadLinks() {
      try {
        const linksRef = collection(db, 'links')
        const queryRef = query(linksRef, orderBy('created', 'asc'))
        const snapshot = await getDocs(queryRef)
        const lista: LinkProps[] = []

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            name: doc.data().name,
            url: doc.data().url,
            bg: doc.data().bg,
            color: doc.data().color,
          })
        })
        setLinks(lista)
      } catch (error) {
        console.log('Erro ao buscar os links, ERROR: ', error)
      }
    }

    loadLinks()
  }, [])

  useEffect(() => {
    async function loadSocialLinks() {
      try {
        const docRef = doc(db, 'social', 'link')

        const snapshot = await getDoc(docRef)
        if (snapshot.data() !== undefined) {
          setSocialLinks({
            facebook: snapshot.data()?.facebook,
            instagram: snapshot.data()?.instagram,
            youtube: snapshot.data()?.youtube,
            linkedin: snapshot.data()?.linkedin,
            github: snapshot.data()?.github,
          })
        }
      } catch (error) {
        console.log('Erro ao buscar as redes sociais, ERROR: ', error)
      }
    }
    loadSocialLinks()
  }, [])

  return (
    <div className='flex flex-col w-full py-4 items-center justify-center'>
      <h1 className='text-3xl md:text-4xl font-bold text-white mt-20'>Rafael Velofuri</h1>
      <span className='text-gray-50 mb-5 mt-3'>Veja meus links 👇</span>

      <main className='flex flex-col w-11/12 max-w-xl text-center'>
        {links.map((link) => (
          <section
            key={link.id}
            style={{ backgroundColor: link.bg }}
            className='bg-gray-500 mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer'
          >
            <a href={link.url} target='_blank'>
              <p
                style={{ color: link.color }}
                className='text-white text-base md:text-lg'
              >
                {link.name}
              </p>
            </a>
          </section>
        ))}

        {socialLinks && Object.keys(socialLinks).length > 0 && (
          <footer className='flex justify-center gap-3 my-4'>
            {socialLinks.instagram && (
              <Social url={socialLinks.instagram}>
                <FaInstagram size={35} color={'#fff'} />
              </Social>
            )}
            {socialLinks.linkedin && (
              <Social url={socialLinks.linkedin}>
                <FaLinkedin size={35} color={'#fff'} />
              </Social>
            )}
            {socialLinks.github && (
              <Social url={socialLinks.github}>
                <FaGithub size={35} color={'#fff'} />
              </Social>
            )}
            {socialLinks.facebook && (
              <Social url={socialLinks.facebook}>
                <FaFacebook size={35} color={'#fff'} />
              </Social>
            )}
            {socialLinks.youtube && (
              <Social url={socialLinks.youtube}>
                <FaYoutube size={35} color={'#fff'} />
              </Social>
            )}
          </footer>
        )}
      </main>
    </div>
  )
}
