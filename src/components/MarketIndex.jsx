import { useState, useEffect } from 'react';
import styled from 'styled-components';

const MarketContainer = styled.div`
  width: 100%;
  background: #1a1a1a;
  padding: 8px 0;
  overflow: hidden;
  border-bottom: 1px solid rgba(92,225,230,0.1);
`;

const MarketList = styled.div`
  display: flex;
  justify-content: center;
  gap: 32px;
  white-space: nowrap;
`;

const MarketItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fff;
  font-size: 14px;

  .symbol {
    font-weight: 500;
  }

  .price {
    color: #999;
  }

  .change {
    color: ${props => props.isPositive ? '#00C853' : '#FF3D00'};
  }
`;

function MarketIndex() {
  const [marketData, setMarketData] = useState({});

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await fetch('http://localhost:8000/market-indices');
        const data = await response.json();
        setMarketData(data);
      } catch (error) {
        console.error('Error fetching market data:', error);
      }
    };

    fetchMarketData();
    const interval = setInterval(fetchMarketData, 60000); // 1분마다 업데이트

    return () => clearInterval(interval);
  }, []);

  return (
    <MarketContainer>
      <MarketList>
        {Object.entries(marketData).map(([symbol, data]) => (
          <MarketItem key={symbol} isPositive={data.change >= 0}>
            <span className="symbol">{symbol}</span>
            <span className="price">{data.price.toLocaleString()}</span>
            <span className="change">
              {data.change >= 0 ? '+' : ''}{data.change}%
            </span>
          </MarketItem>
        ))}
      </MarketList>
    </MarketContainer>
  );
}

export default MarketIndex;
