/**
* @fileoverview This file represets the index page, which allows users to login, create an account or reset their password
* via emai. This page includes the:
* - AuthenticationComponent
* - LayoutComponent
* - Base
*/
import Head from 'next/head'
import styles from '@/styles/pages/Index.module.scss'
import Base from 'Components/Layout/Base/BaseComponent'
import AuthenticationComponent from 'Components/authenticationComponent/AuthenticationComponent'

const Index = () => {

  return (
    <Base>
      <Head>
        <title>Welcome to the BUWS App</title>
      </Head>
      <div className={styles.main}>
        <div className={styles.titleSection}>
          <p className={styles.title}>Welcome to <br /> BU Walking Society</p>
          <p className={styles.subTitle}>The walking route sharing application</p>
        </div>
        <AuthenticationComponent />
      </div>
    </Base >
  )
}

export default Index;
