import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

// 콘텐츠 렌더링을 위한 로직을 별도의 함수로 분리
const renderContent = (content) => {
    return content.split('\n').map((paragraph, index) => (
        <p key={index} style={styles.paragraph}>{paragraph}</p>
    ));
};

// Article 컴포넌트는 동적으로 ID에 맞는 article 데이터를 받아와서 렌더링합니다.
const Article = ({ articles }) => {
    const { id } = useParams();  // URL에서 id를 가져옴
    const article = articles.find(article => article.id === parseInt(id));  // 해당 ID에 맞는 기사 데이터 찾기

    if (!article) {
        return <p>Article not found</p>;  // 해당하는 기사가 없을 때
    }

    return (
        <div style={styles.container}>
            {/* Article Image */}
            <img src={article.imageUrl} alt={article.title} style={styles.image} />

            {/* Article Title */}
            <h1 style={styles.title}>{article.title}</h1>

            {/* Article Content */}
            <div style={styles.content}>
                {renderContent(article.content)}
            </div>
        </div>
    );
};

// PropTypes 설정
Article.propTypes = {
    articles: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            imageUrl: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired,
        })
    ).isRequired,
};

// 스타일 객체 정의
const styles = {
    container: {
        maxWidth: '600px',
        margin: '20px auto',
        backgroundColor: '#fefefe',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    },
    image: {
        width: '100%',
        height: 'auto',
        borderRadius: '10px',
        marginBottom: '20px',
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '15px',
    },
    content: {
        color: '#555',
        fontSize: '16px',
        lineHeight: '1.6',
    },
    paragraph: {
        marginBottom: '10px',
    },
};

export default Article;
