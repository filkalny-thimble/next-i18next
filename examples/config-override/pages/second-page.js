import Link from 'next/link'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

const SecondPage = () => {

  const { t } = useTranslation('second-page')

  return (
    <>
      <main>
        <Header heading={t('h1')} title={t('title')} />
        <div>
          <Link href='/'>
            <button
              type='button'
            >
              {t('back-to-home', {ns: 'page'})}
            </button>
          </Link>
          <Link href='/third-page'>
            <button
              type='button'
            >
              {t('to-third-page')}
            </button>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['second-page', 'page', 'footer']),
  },
})

export default SecondPage
