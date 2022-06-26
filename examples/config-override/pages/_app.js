import { appWithTranslation } from 'next-i18next'
import i18nextConfig from '../next-i18next.config'

const MyApp = ({ Component, pageProps }) => <Component {...pageProps} />

export default appWithTranslation(MyApp, i18nextConfig)
