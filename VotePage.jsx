import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // URL에서 매개변수를 추출
import axios from 'axios'; // HTTP 요청을 위한 Axios

const VotePage = () => {
  const { category, articleId } = useParams(); // URL에서 카테고리와 기사 ID 추출
  const [qualityVote, setQualityVote] = useState(null); // 요약 퀄리티에 대한 투표 상태
  const [neutralVote, setNeutralVote] = useState(null); // 중립성에 대한 투표 상태
  const [result, setResult] = useState(null); // 투표 결과 상태
  const [submitted, setSubmitted] = useState(false); // 투표 완료 여부 상태

  // 페이지 로드 시 기존 투표 결과를 불러옴
  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/summary/${category}/${articleId}/votes`);
        setResult(response.data); // 결과를 상태에 저장
      } catch (error) {
        console.error('Error fetching votes:', error);
      }
    };

    fetchVotes();
  }, [category, articleId]);

  // 사용자가 투표를 제출했을 때 호출되는 함수
  const submitVote = async () => {
    try {
      const voteData = {
        article_id: parseInt(articleId),
        category: category,
        summary_quality: qualityVote,
        neutrality: neutralVote
      };

      // 투표 데이터를 백엔드로 전송
      await axios.post(`http://127.0.0.1:8000/summary/${category}/${articleId}/vote`, voteData);
      setSubmitted(true); // 투표가 완료되었음을 표시

      // 투표 후 최신 투표 결과를 다시 가져옴
      const response = await axios.get(`http://127.0.0.1:8000/summary/${category}/${articleId}/votes`);
      setResult(response.data);
    } catch (error) {
      console.error('Error submitting vote:', error);
    }
  };

  return (
    <div>
      <h1>기사 #{articleId} 투표</h1>
      <p>카테고리: {category}</p>

      <div>
        <h2>요약 퀄리티가 좋은가요?</h2>
        <button onClick={() => setQualityVote(true)}>좋다</button>
        <button onClick={() => setQualityVote(false)}>좋지 않다</button>
      </div>

      <div>
        <h2>요약이 중립적인가요?</h2>
        <button onClick={() => setNeutralVote(true)}>중립적이다</button>
        <button onClick={() => setNeutralVote(false)}>중립적이지 않다</button>
      </div>

      <button onClick={submitVote} disabled={submitted || qualityVote === null || neutralVote === null}>
        투표 제출
      </button>

      {result && (
        <div>
          <h3>투표 결과</h3>
          <p>퀄리티가 좋다고 평가된 비율: {result.quality_percent.toFixed(2)}%</p>
          <p>중립적이라고 평가된 비율: {result.neutral_percent.toFixed(2)}%</p>
          <p>총 투표 수: {result.total_votes}</p>
        </div>
      )}

      {submitted && <p>투표가 완료되었습니다!</p>}
    </div>
  );
};

export default VotePage;
