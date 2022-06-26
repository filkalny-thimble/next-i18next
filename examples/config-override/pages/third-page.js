import Link from 'next/link'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import nextI18nextConfig from '../next-i18next.config'
import { useRouter } from 'next/router'

const ThirdPage = () => {
  const router = useRouter()
  const { t, i18n } = useTranslation('third-page')

  return (
    <>
      <main>
        <Header heading={t('h1')} title={t('title')} />
        <div>
          <button type='button' onClick={i18n.reloadResources}>
            {t('reload-resources')}
          </button>
          <Link
            href={router.asPath}
            locale={router.locale === 'en' ? 'de' : 'en'}
          >
            <button>
              {t('change-locale', {ns: 'common'})}
            </button>
          </Link>
          <Link href='/'>
            <button
              type='button'
            >
              {t('back-to-home', {ns: 'page'})}
            </button>
          </Link>
          <Link href='/second-page'>
            <button
              type='button'
            >
              {t('back-to-second-page')}
            </button>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}

export const getStaticProps = async ({ locale }) => {
  const configOverride = {
    ...nextI18nextConfig,
    key: 'third-page',
    localePath: './public/alternate-locales',
  }

  return ({
    props: {
      ...await serverSideTranslations(locale, ['common', 'third-page', 'page', 'footer'], configOverride),
    },
  })
}

export default ThirdPage
