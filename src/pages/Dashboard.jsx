import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Dashboard.css';

function Dashboard() {
  const [articles, setArticles] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [fullName, setFullName] = useState('');
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    fetchArticles();
    setUserGreeting();
  }, []);

  const setUserGreeting = () => {
    const hour = new Date().getHours();
    let greetingText = '';
    
    if (hour < 12) greetingText = 'Good morning';
    else if (hour < 18) greetingText = 'Good afternoon';
    else greetingText = 'Good evening';

    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setFullName(storedName);
      setGreeting(`${greetingText}, ${storedName}!`);
    } else {
      setFullName('Guest');
      setGreeting(`${greetingText}, Guest!`);
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
    <div className="dashboard-container">
      <h1 className="greeting-text">{greeting}</h1>
      
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

export default Dashboard;