import styles from './AuthenticationComponent.module.scss';
import CreateAccountComponent from './createAccountComponent/CreateAccountComponent';
import LoginComponent from './loginComponent/LoginComponent';

const AuthenticationComponent = () => {
    return (
        <div className={styles.authenticationComponent}>
            <LoginComponent />
            {/* <CreateAccountComponent /> */}
        </div>
    );
}

export default AuthenticationComponent;

