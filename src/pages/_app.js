import '@/styles/colors.module.scss'
import 'react-tooltip/dist/react-tooltip.css'
import variables from '@/styles/globals.scss'
import '../../node_modules/mapbox-gl/dist/mapbox-gl.css';
import '../../node_modules/mapbox-gl/dist/mapbox-gl.js'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
