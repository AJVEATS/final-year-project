import Head from 'next/head'
import styles from '@/styles/Index.module.scss'
import Base from 'Components/Base/BaseComponent'
import AuthenticationComponent from 'Components/authenticationComponent/AuthenticationComponent'

const Index = () => {

  return (
    <Base>
      <Head>
        <title>Index page</title>
      </Head>
      <div className={styles.main}>
        <p>Walking Application</p>
      </div>
      <AuthenticationComponent />
    </Base>
  )
}

export default Index;
