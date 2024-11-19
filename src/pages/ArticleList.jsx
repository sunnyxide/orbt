import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// 인사말을 위한 스타일 추가
const GreetingText = styled.h1`
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 2rem;
  font-weight: 500;
  padding: 0 2rem;
`;

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [greeting, setGreeting] = useState('');
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  useEffect(() => {
    fetchArticles();
    if (isLoggedIn) {
      setUserGreeting();
    }
  }, [isLoggedIn]);

  const setUserGreeting = () => {
    const hour = new Date().getHours();
    let greetingText = '';
    
    if (hour < 12) greetingText = 'Good morning';
    else if (hour < 18) greetingText = 'Good afternoon';
    else greetingText = 'Good evening';

    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setGreeting(`${greetingText}, ${storedName}!`);
    }
  };

  const fetchArticles = async () => {
    try {
      const response = await fetch('http://localhost:8000/articles');
      if (response.ok) {
        const data = await response.json();
        setArticles(data);
      } else {
        console.error('Failed to fetch articles');
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  return (
    <div className="articles-container">
      {/* 로그인 상태일 때만 인사말 표시 */}
      {isLoggedIn && greeting && (
        <GreetingText>{greeting}</GreetingText>
      )}
      
      <div className="articles-grid">
        {articles.map(article => (
          <div key={article.id} className="article-card">
            <img 
              src={article.thumbnail || '/static/images/thumbnails/orbt_logo.png'} 
              alt={article.title}
              onError={(e) => {
                e.target.src = '/static/images/thumbnails/orbt_logo.png';
              }}
            />
            <h3>{article.title}</h3>
            <Link to={`/article/${article.id}`}>Read More</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArticleList; 