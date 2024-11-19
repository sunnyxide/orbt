import  { useState } from 'react';

const EmailVerification = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  const handleSendVerification = async () => {
    // 이메일 인증 코드 전송 로직
  };

  const handleVerifyCode = async () => {
    // 인증 코드 확인 로직
  };

  return (
    <div>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
      <button onClick={handleSendVerification}>Send Verification Code</button>
      <input type="text" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter verification code" />
      <button onClick={handleVerifyCode}>Verify Code</button>
    </div>
  );
};

export default EmailVerification;