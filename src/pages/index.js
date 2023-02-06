import Head from 'next/head'
import styles from '@/styles/Index.module.scss'
import Base from 'Components/Base/BaseComponent'
import CreateAccountComponent from 'Components/createAccountComponent/createAccountComponent'
import LoginComponent from 'Components/loginComponent/LoginComponent'

const Index = () => {

  return (
    <Base>
      <Head>
        <title>Index page</title>
      </Head>
      <div className={styles.main}>
        <p>Walking Application</p>
      </div>
      <CreateAccountComponent />
      {/* <LoginComponent /> */}
    </Base>
  )
}

export default Index;
