import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

function Article({ articles }) {
  const { id } = useParams(); // URL에서 ID 추출
  const article = articles.find(article => article.id === parseInt(id));

  if (!article) {
    return <h2>해당 기사를 찾을 수 없습니다.</h2>;
  }

  return (
    <div>
      <h1>{article.title}</h1>
      <img src={article.imageUrl} alt={article.title} />
      <p>{article.content}</p>
      {/* 투표 UI는 나중에 추가 */}
    </div>
  );
}

Article.propTypes = {
  articles: PropTypes.array.isRequired,
};

export default Article;
