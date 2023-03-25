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
          <p className={styles.title}>Welcome to Walk</p>
          <p className={styles.subTitle}>The walking route sharing application</p>
        </div>
        <div className={styles.divider}></div>
        <AuthenticationComponent />
      </div>
    </Base>
  )
}

export default Index;
