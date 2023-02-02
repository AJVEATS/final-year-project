import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '@/styles/Index.module.scss'
import Base from 'Components/Base/BaseComponent'
import LoginComponent from 'Components/loginComponent/loginComponent'
import CreateAccountComponent from 'Components/createAccountComponent/createAccountComponent'

export default function Index() {

  return (
    <Base>
      <Head>
        <title>Index page</title>
      </Head>
      <div className={styles.main}>
        <p>FYP</p>
      </div>
      {/* <LoginComponent /> */}
      <CreateAccountComponent />
    </Base>
  )
}
