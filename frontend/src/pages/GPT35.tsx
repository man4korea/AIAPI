// 📁 src/pages/GPT35.tsx
// Create at 2504201830 Ver1.5

import React, { useState, useCallback } from 'react';
import axios from 'axios';

const GPT35 = () => {
  const [input, setInput] = useState('');
  const [responses, setResponses] = useState<Array<{text: string, timestamp: string}>>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiDebug, setApiDebug] = useState<string>('');

  const clearResponses = useCallback(() => {
    setResponses([]);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    setError('');
    setApiDebug('');

    try {
      console.log('🚀 GPT-3.5 API 요청 전송:', { input });
      setApiDebug('요청 보내는 중...');
      
      // 요청 내용 생성
      const requestBody = {
        messages: [
          {
            role: 'system',
            content: "당신은 정확하고 사실에 입각한 답변을 제공하는 AI 어시스턴트입니다. 확실하지 않은 정보는 추측하지 말고, 모르는 것은 솔직히 모른다고 말하세요. 답변할 때는 신뢰할 수 있는 정보와 논리적 근거를 바탕으로 설명하세요."
          },
          { 
            role: 'user', 
            content: input 
          }
        ]
      };
      
      // 요청 상세 정보 로깅
      console.log('📝 요청 상세:', JSON.stringify(requestBody, null, 2));
      setApiDebug(prev => prev + '\n요청 데이터: ' + JSON.stringify(requestBody).substring(0, 100) + '...');
      
      // 중요: 로컬 상대 경로를 사용하여 Vite 프록시 활용
      const response = await axios.post('/api/openai/gpt35', requestBody);
      
      // 응답 로깅
      console.log('✅ GPT-3.5 API 응답 수신:', response);
      setApiDebug(prev => prev + `\n응답 상태: ${response.status}\n응답 데이터: ${JSON.stringify(response.data).substring(0, 150)}...`);
      
      // 응답 데이터 추출 로직 개선
      let responseText = '';
      if (typeof response.data === 'string') {
        responseText = response.data;
      } else if (response.data && typeof response.data === 'object') {
        // 응답 객체에서 텍스트 데이터 추출
        responseText = response.data.content || 
                       response.data.message || 
                       response.data.text || 
                       response.data.response || 
                       JSON.stringify(response.data);
      } else {
        responseText = '응답을 받지 못했습니다.';
      }

      setResponses(prev => [...prev, {
        text: responseText,
        timestamp: new Date().toISOString()
      }]);
      setInput('');
    } catch (err: any) {
      console.error('❌ GPT-3.5 API 오류:', err);
      
      // 상세 오류 정보 추출 및 로깅
      let responseData = '';
      try {
        if (err.response) {
          responseData = `상태: ${err.response.status}, 데이터: ${JSON.stringify(err.response.data)}`;
          console.error('📌 응답 오류 상세:', err.response);
        }
      } catch (e) {
        responseData = '응답 데이터 파싱 실패';
      }
      
      setApiDebug(prev => prev + `\n오류 발생: ${err.message}\n${responseData}`);
      
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.error || 
                          err.message || 
                          '오류가 발생했습니다.';
                          
      setError(`GPT-3.5 API 호출 오류: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  // 테스트 메시지 입력
  const handleTestMessage = () => {
    setInput('안녕하세요! 간단한 자기소개를 해주세요.');
  };

  // API 상태 확인
  const checkApiStatus = async () => {
    try {
      setIsLoading(true);
      setApiDebug('API 상태 확인 중...');
      
      // 상대 경로 사용
      const response = await axios.get('/api/openai/status');
      console.log('API 상태 확인 결과:', response.data);
      
      setApiDebug(prev => prev + `\nAPI 상태: ${JSON.stringify(response.data)}`);
      
      if (response.data.apiKeyValid) {
        setError(`API 키 상태: 유효함 (${response.data.keyType || '일반'} 타입)`);
      } else {
        setError('API 키가 유효하지 않습니다. 서버 환경 변수를 확인해주세요.');
      }
    } catch (err: any) {
      console.error('API 상태 확인 오류:', err);
      setError(`API 상태 확인 실패: ${err.message}`);
      setApiDebug(prev => prev + `\n상태 확인 오류: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* 상단 헤더 */}
      <div className="bg-white shadow-sm border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3 text-blue-600">
              🤖
            </div>
            <h1 className="text-xl font-bold">OpenAI GPT-3.5</h1>
          </div>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={checkApiStatus}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded"
            >
              API 상태 확인
            </button>
            <button
              type="button"
              onClick={handleTestMessage}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded"
            >
              테스트 메시지
            </button>
            <button
              onClick={clearResponses}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded"
            >
              대화 내용 지우기
            </button>
          </div>
        </div>
      </div>

      {/* 응답 영역 - 스크롤 가능 */}
      <div className="flex-1 overflow-y-auto p-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-4">
            <p className="font-medium">상태:</p>
            <p>{error}</p>
          </div>
        )}
        
        {apiDebug && (
          <div className="bg-gray-50 border border-gray-200 text-gray-800 p-4 rounded-md mb-4 font-mono text-xs">
            <p className="font-medium">디버깅 정보:</p>
            <pre className="whitespace-pre-wrap">{apiDebug}</pre>
          </div>
        )}
        
        {responses.map((response, index) => (
          <div key={response.timestamp} className="bg-white shadow rounded-md p-4 mb-4">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2 text-blue-600">
                🤖
              </div>
              <p className="font-medium">GPT-3.5</p>
              <span className="ml-2 text-sm text-gray-500">
                {new Date(response.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <div className="mt-2 prose prose-sm max-w-none whitespace-pre-wrap">
              {response.text}
            </div>
          </div>
        ))}
        
        {responses.length === 0 && !error && !isLoading && (
          <div className="text-center py-8 text-gray-500">
            <p>GPT-3.5에게 질문하면 응답이 여기에 표시됩니다.</p>
          </div>
        )}
        
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            <span className="ml-3 text-gray-600">응답 생성 중...</span>
          </div>
        )}
      </div>

      {/* 입력 영역 */}
      <div className="bg-white p-4 border-t">
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSubmit(e)}
            className="flex-1 border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="메시지를 입력하세요..."
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400"
          >
            {isLoading ? '생성 중...' : '전송'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default GPT35;