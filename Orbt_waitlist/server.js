const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000; // Heroku 환경에서 제공하는 포트를 사용하거나 로컬에서는 3000번 포트를 사용

// 미들웨어 설정
app.use(bodyParser.json());
app.use(cors());

// 정적 파일 제공을 위한 설정
app.use(express.static('public'));

// API 엔드포인트 설정
app.post('/api/waitlist', (req, res) => {
    const {
        name,
        email,
        phone,
        countryCode,
        newsSources,
        subscription,
        frustrations,
        servicePreference,
        difficulty
    } = req.body;

    // 콘솔에 데이터 출력
    console.log('Waitlist Data:', req.body);

    // (데이터베이스에 저장하거나 다른 처리를 여기에 추가)

    res.status(200).json({ message: 'Data received successfully!' });
});

// 서버 시작 - 실행 중복 방지
if (!module.parent) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
