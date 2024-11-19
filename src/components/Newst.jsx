import PropTypes from 'prop-types'; 

const Newst = ({ title, summary, imageUrl, onClick }) => {
    return (
        <div onClick={onClick} style={styles.container}>
            {renderImage(imageUrl, title)}
            {renderContent(title, summary)}
        </div>
    );
};

// 이미지 렌더링 함수
const renderImage = (imageUrl, title) => (
    <img
        src={imageUrl}
        alt={title}
        style={styles.image}
    />
);

// 내용 렌더링 함수
const renderContent = (title, summary) => (
    <div style={styles.content}>
        <h2 style={styles.title}>{title}</h2>
        <p style={styles.summary}>{summary}</p>
    </div>
);


// PropTypes 설정
Newst.propTypes = {
    title: PropTypes.string.isRequired,       // title은 필수 문자열
    summary: PropTypes.string.isRequired,     // summary는 필수 문자열
    imageUrl: PropTypes.string.isRequired,    // imageUrl은 필수 문자열
    onClick: PropTypes.func.isRequired,       // onClick은 필수 함수
};

// 스타일 객체를 컴포넌트 외부로 분리
const styles = {
    container: {
        border: '1px solid #ccc',
        borderRadius: '8px',
        overflow: 'hidden',
        margin: '20px auto',
        width: '90%',
        maxWidth: '600px',
        cursor: 'pointer',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    image: {
        width: '100%',
        height: 'auto',
        display: 'block',
    },
    content: {
        padding: '15px',
    },
    title: {
        margin: '0 0 10px',
    },
    summary: {
        margin: '0',
        color: '#666',
    },
};

export default Newst;
