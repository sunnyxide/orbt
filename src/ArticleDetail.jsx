import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';

const PageWrapper = styled.div`
  height: 100vh;
  overflow-y: auto;
  background-color: white;
  scroll-behavior: smooth;
`;

const ArticleContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 40px;
`;

const ArticleImage = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  margin: 20px 0;
  border-radius: 8px;
`;

const BackButton = styled(Link)`
  display: inline-block;
  margin-bottom: 20px;
  color: #333;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const ArticleTitle = styled.h1`
  font-size: 2.5rem;
  font-family: 'Georgia', serif;
  line-height: 1.2;
  margin: 30px 0;
  color: #1a1a1a;
  font-weight: 700;
  hyphens: auto;
  max-width: 900px;
`;

const ArticleContent = styled.div`
  line-height: 1.6;
  font-size: 1.1rem;
  color: black;

  /* HTML 스타일 적용 */
  h3 {
    margin: 1.5em 0 0.5em;
    color: #333;
  }

  ul {
    padding-left: 20px;
    margin: 1em 0;
  }

  li {
    margin: 0.5em 0;
  }

  strong {
    font-weight: 600;
  }

  .summary-content {
    margin-top: 2em;
  }

  .key-points, .impact-analysis, .related-events {
    margin: 2em 0;
  }
`;

function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState({ 
    title: '', 
    content: '',
    thumbnail: '' 
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8000/article/${id}`);
        const data = await response.json();
        setArticle(data);
      } catch (error) {
        console.error('기사를 불러오는데 실패했습니다:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;

  return (
    <PageWrapper>
      <ArticleContainer>
        <BackButton to="/">← 목록으로 돌아가기</BackButton>
        <ArticleImage 
          src={`http://localhost:8000/static/images/thumbnails/article_${id}.png`}
          alt={article.title} 
        />
        <ArticleTitle>{article.title}</ArticleTitle>
        <ArticleContent dangerouslySetInnerHTML={{ __html: article.content }} />
      </ArticleContainer>
    </PageWrapper>
  );
}

export default ArticleDetail;