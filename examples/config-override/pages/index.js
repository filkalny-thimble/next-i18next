import Link from 'next/link'
import { useRouter } from 'next/router'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

const Homepage = () => {

  const router = useRouter()
  const { t } = useTranslation('home')

  return (
    <>
      <main>
        <Header heading={t('h1')} title={t('title')} />
        <div>
          <Link
            href={router.asPath}
            locale={router.locale === 'en' ? 'de' : 'en'}
          >
            <button>
              {t('change-locale', {ns: 'common'})}
            </button>
          </Link>
          <Link href='/second-page'>
            <button
              type='button'
            >
              {t('to-second-page')}
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
    ...await serverSideTranslations(locale, ['common', 'home', 'footer']),
  },
})

export default Homepage
