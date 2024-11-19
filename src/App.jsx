import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate, Link, Navigate } from 'react-router-dom'
import styled from 'styled-components'
import ArticleList from './ArticleList'
import ArticleDetail from './ArticleDetail'
import AccountPage from './pages/AccountPage'
import SignupPage from './pages/SignupPage'
import Login from './pages/Login'
import './styles/global.css'

const ORBIT_LOGO = '/orbt logo (1).png'

const NavBar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: var(--dark-bg);
  box-shadow: 0 2px 5px rgba(92,225,230,0.2);
  padding: 15px 30px;
  z-index: 1000;
  
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
`

const StockTickerBar = styled.div`
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  background: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
  height: 40px;
  z-index: 999;
  overflow: hidden;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
`

const RegionLabel = styled.span`
  font-weight: bold;
  color: #666;
  margin-right: 15px;
  padding: 2px 8px;
  background: #e0e0e0;
  border-radius: 4px;
`

const TickerWrapper = styled.div`
  white-space: nowrap;
  display: inline-block;
  animation: ticker 45s linear infinite;
  padding: 10px 0;

  &:hover {
    animation-play-state: paused;
  }

  @keyframes ticker {
    0% { transform: translateX(100%); }
    100% { transform: translateX(-100%); }
  }
`

const StockItem = styled.span`
  margin-right: 30px;
  font-size: 14px;
  color: #333;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  opacity: ${props => props.isLive ? 1 : 0.8};

  .symbol {
    font-weight: bold;
  }

  .price {
    color: #666;
  }

  .change {
    color: ${props => props.change >= 0 ? '#4CAF50' : '#FF5252'};
    font-weight: 500;
  }

  .last-update {
    font-size: 12px;
    color: #999;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    padding: 2px 6px;
    margin: -2px 24px -2px -6px;
  }
`

const TimeWelcome = styled.div`
  font-size: 1.5rem;
  color: var(--text-light);
  flex: 1;
  
  h1 {
    margin: 0;
    font-size: 1.8rem;
  }
  
  p {
    margin: 5px 0;
    font-size: 1.2rem;
    color: var(--text-secondary);
  }
`

const LogoText = styled(Link)`
  color: #5ce1e6;
  font-size: 2rem;
  text-align: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-decoration: none;
  font-weight: bold;
  margin-top: -5px;
  color: #5ce1e6;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(90deg, #5CE1E6 0%, #7FE1D7 50%, #5CC6BA 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    background-position: right center;
  }
`

const AuthButtons = styled.div`
  display: flex;
  gap: 10px;
`

const AuthButton = styled.button`
  background: ${props => props.primary ? 'var(--theme-color)' : 'transparent'};
  color: ${props => props.primary ? 'var(--dark-bg)' : 'var(--theme-color)'};
  border: 2px solid var(--theme-color);
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(92,225,230,0.3);
  }
`

const LogoutButton = styled(AuthButton)`
  background: transparent;
  color: var(--theme-color);
  
  &:hover {
    background: rgba(92, 225, 230, 0.1);
  }
`

const MyPageButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  width: 40px;
  height: 40px;
  
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 2px solid var(--theme-color);
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.1);
    }
  }
`

const MainContent = styled.main`
  padding-top: 120px;
  min-height: calc(100vh - 120px);
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  overflow-x: hidden;
  position: relative;
`

const AuthSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-left: auto;
`

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #666;
  font-size: 14px;
`;

function StockTicker() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await fetch('http://localhost:8000/market-indices');
        const data = await response.json();
        
        const stocksArray = Object.entries(data)
          .filter(([, info]) => info.price !== 0)
          .map(([name, info]) => ({
            symbol: name,
            price: info.price.toLocaleString(),
            change: info.change,
            changePercent: info.changePercent,
            region: info.region,
            isLive: info.isLive,
            lastTradeDate: info.lastTradeDate,
            lastUpdate: info.lastUpdate
          }));
        
        const regionOrder = ['America', 'Europe', 'Asia', 'Oceania'];
        stocksArray.sort((a, b) => {
          const regionA = regionOrder.indexOf(a.region);
          const regionB = regionOrder.indexOf(b.region);
          return regionA - regionB;
        });
        
        setStocks(stocksArray);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch market data:', error);
        setLoading(false);
      }
    };

    fetchMarketData();
    const interval = setInterval(fetchMarketData, 300000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <StockTickerBar>
        <LoadingWrapper>
          Loading market data...
        </LoadingWrapper>
      </StockTickerBar>
    );
  }

  console.log('Rendering stocks:', stocks);

  return (
    <StockTickerBar>
      <TickerWrapper>
        {stocks.map((stock, index, arr) => {
          console.log(`Rendering stock item: ${stock.symbol}, region: ${stock.region}`);
          return (
            <React.Fragment key={index}>
              {(index === 0 || stock.region !== arr[index - 1].region) && (
                <RegionLabel>{stock.region}</RegionLabel>
              )}
              <StockItem 
                change={stock.changePercent}
                isLive={stock.isLive}
              >
                <span className="symbol">{stock.symbol}</span>
                <span className="price">{stock.price}</span>
                <span className="change">
                  {stock.change >= 0 ? '+' : ''}{stock.change.toLocaleString()} 
                  ({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent}%)
                </span>
                {!stock.isLive && (
                  <span className="last-update">
                    (Last: {stock.lastTradeDate})
                  </span>
                )}
              </StockItem>
            </React.Fragment>
          );
        })}
      </TickerWrapper>
    </StockTickerBar>
  );
}

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:8000/articles');
        
        if (!response.ok) {
          throw new Error('Failed to load articles.');
        }
        
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setArticles([
          {
            id: 1,
            title: "글로벌 금융시장 변동성 확대, 각국 중앙은행 대응책 마련",
            thumbnail: "/static/images/thumbnails/article_1.png"
          },
          {
            id: 2,
            title: "친환경 에너지 산업 투자 급증, 신재생에너지 시장 성장세",
            thumbnail: "/static/images/thumbnails/article_2.png"
          },
          {
            id: 3,
            title: "디지털 전환 가속화, 기업들의 클라우드 도입률 상승",
            thumbnail: "/static/images/thumbnails/article_3.png"
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    const checkLoginStatus = () => {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      
      setIsAuthenticated(isLoggedIn);
      if (isLoggedIn && userData.fullName) {
        setUserName(userData.fullName);
      }
      setIsLoading(false);
    };

    checkLoginStatus();
  }, []);

  const handleLogin = async (loginResponse) => {
    try {
      console.log('Received login response:', loginResponse); // 로그인 응답 데이터 확인

      if (loginResponse.success) {
        // 로그인 성공
        setIsAuthenticated(true);
        setUserName(loginResponse.user.fullName);
        
        // 로컬 스토리지에 사용자 정보 저장
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userData', JSON.stringify(loginResponse.user));
        
        console.log('Authentication state updated, navigating...'); // 상태 업데이트 확인
        navigate('/');
      } else {
        throw new Error('Login response is invalid.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8000/logout', {
        method: 'POST',
        credentials: 'include'
      });

      if (response.ok) {
        setIsAuthenticated(false);
        setUserName('');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userData');
        navigate('/');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const formatDate = () => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const date = new Date();
    return `${months[date.getMonth()]}, ${date.getDate()}`;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ width: '100%' }}>
      <NavBar>
        <TimeWelcome>
          {isAuthenticated ? (
            <h1>Good {getTimeOfDay()}, {userName}!</h1>
          ) : (
            <h1>Welcome to Orbt</h1>
          )}
          <p>{formatDate()}</p>
        </TimeWelcome>
        <LogoText to="/">Orbt</LogoText>
        <AuthSection>
          {isAuthenticated ? (
            <>
              <LogoutButton onClick={handleLogout}>
                Logout
              </LogoutButton>
              <MyPageButton onClick={() => navigate('/account')}>
                <img src={ORBIT_LOGO} alt="Profile" />
              </MyPageButton>
            </>
          ) : (
            <AuthButtons>
              <AuthButton onClick={() => navigate('/login')}>
                Log In
              </AuthButton>
              <AuthButton primary onClick={() => navigate('/signup')}>
                Sign Up
              </AuthButton>
            </AuthButtons>
          )}
        </AuthSection>
      </NavBar>
      <StockTicker />
      <MainContent>
        <Routes>
          <Route path="/" element={
            <ArticleList 
              articles={articles} 
              isLoading={isLoading}
            />
          } />
          <Route path="/article/:id" element={<ArticleDetail />} />
          <Route 
            path="/login" 
            element={
              isAuthenticated ? (
                <Navigate to="/" replace />
              ) : (
                <Login onLogin={handleLogin} />
              )
            } 
          />
          <Route 
            path="/account" 
            element={
              isAuthenticated ? (
                <AccountPage onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </MainContent>
    </div>
  );
}

function App() {224
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function getTimeOfDay() {
  const hour = new Date().getHours()
  if (hour < 12) return 'morning'
  if (hour < 17) return 'afternoon'
  return 'evening'
}

export default App
