import styles from './account.module.css';  // CSS 모듈을 불러옴
import PropTypes from 'prop-types';

// InputField 컴포넌트: 입력 필드를 위한 컴포넌트로 분리
const InputField = ({ placeholder, type }) => (
    <input type={type} placeholder={placeholder} className={styles.input} />
);

// InputField 컴포넌트 propTypes 정의
InputField.propTypes = {
    placeholder: PropTypes.string.isRequired,  // placeholder는 필수 문자열
    type: PropTypes.string,  // 입력 필드의 타입 (기본값: 'text')
};

// 기본값 설정 (type을 제공하지 않을 경우 'text'로 설정)
InputField.defaultProps = {
    type: 'text',
};


// LinkItem 컴포넌트: 링크 항목을 위한 컴포넌트로 분리
const LinkItem = ({ href, children }) => (
    <a href={href} className={styles.link}>{children}</a>
);

// LinkItem 컴포넌트 propTypes 정의
LinkItem.propTypes = {
    href: PropTypes.string.isRequired,  // href는 필수 문자열
    children: PropTypes.node.isRequired,  // children은 필수로 렌더링할 내용
};

const Account = () => {
    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <button className={styles.backButton}>&larr;</button>
                <h2 className={styles.title}>Settings</h2>
            </div>

            {/* Profile Section */}
            <h3 className={styles.subtitle}>My profile</h3>

            {/* Form */}
            <form className={styles.form}>
                <InputField placeholder="Full Name" />
                <InputField placeholder="Ethnicity" />
                <InputField placeholder="Location" />
                <InputField placeholder="Age" type="number" />
                <InputField placeholder="Email" type="email" />
                <button type="button" className={styles.changePasswordButton}>Change Password</button>
            </form>

            {/* Links */}
            <div className={styles.links}>
                <LinkItem href="#">Terms of Service</LinkItem>
                <LinkItem href="#">Privacy Policy</LinkItem>
                <LinkItem href="#">Join Us</LinkItem>
            </div>
        </div>
    );
};

export default Account;
