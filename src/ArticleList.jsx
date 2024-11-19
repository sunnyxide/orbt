import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ArticleContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
  width: 100%;
`;

const ArticleCard = styled.div`
  background: #1a1a1a;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  position: relative;
  padding-top: 56.25%; // 16:9 비율 유지 (1792:1024 ≈ 16:9)
  overflow: hidden;
`;

const ArticleImage = styled.img.attrs({
  loading: 'lazy',
  decoding: 'async',
  onError: (e) => {
    e.target.src = '/static/images/thumbnails/orbt_logo.png';
  }
})`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const ArticleContent = styled.div`
  padding: 1rem;
`;

const ArticleTitle = styled.h2`
  margin: 0;
  font-size: 1.2rem;
  color: #ffffff;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

function ArticleList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await fetch('http://localhost:8000/articles');
      const data = await response.json();
      setArticles(data.map(article => ({
        ...article,
        thumbnail: `http://localhost:8000${article.thumbnail}`
      })));
    } catch (error) {
      console.error('기사 목록을 불러오는데 실패했습니다:', error);
    }
  };

  return (
    <ArticleContainer>
      {articles.map((article) => (
        <StyledLink to={`/article/${article.id}`} key={article.id}>
          <ArticleCard>
            <ImageContainer>
              <ArticleImage 
                src={article.thumbnail}
                alt={article.title}
              />
            </ImageContainer>
            <ArticleContent>
              <ArticleTitle>{article.title}</ArticleTitle>
            </ArticleContent>
          </ArticleCard>
        </StyledLink>
      ))}
    </ArticleContainer>
  );
}

export default ArticleList;