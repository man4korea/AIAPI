// 📁 frontend/src/pages/Coji.tsx
// Create at 2504191515

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import { CojiKnowledgeBase } from '../data/cojiKnowledgeBase';
import { cojiService } from '../services/cojiService';
import { documentService } from '../services/documentService';

interface Message {
  id: string;
  text: string;
  type: 'user' | 'coji';
  emotion?: '😊' | '🤔' | '😄' | '💡' | '❤️' | '⚠️' | '✨';
}

const floatingAnimation = {
  y: [0, -10, 0],
  rotate: [0, 5, -5, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

/**
 * HTML 태그 제거 함수
 * @param htmlText HTML 태그가 포함된 텍스트
 * @returns 순수 텍스트
 */
const stripHtmlTags = (htmlText: string): string => {
  if (!htmlText || typeof htmlText !== 'string') return '';
  
  // HTML 태그 제거
  const withoutTags = htmlText.replace(/<[^>]*>/g, '');
  
  // HTML 엔티티 디코딩 
  return withoutTags
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
};

export const Coji: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 외부 클릭 감지 및 창 닫기 처리
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        chatContainerRef.current && 
        !chatContainerRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        setIsOpen(false);
      }
    };

    // 포커스 변경 감지
    const handleFocusChange = () => {
      if (
        document.activeElement && 
        chatContainerRef.current && 
        !chatContainerRef.current.contains(document.activeElement) &&
        isOpen
      ) {
        setIsOpen(false);
      }
    };

    // 이벤트 리스너 등록
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('focusin', handleFocusChange);
    
    return () => {
      // 이벤트 리스너 제거
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('focusin', handleFocusChange);
    };
  }, [isOpen]);

  // 문서 서비스 초기화
  useEffect(() => {
    const initDocService = async () => {
      try {
        await documentService.initialize();
        console.log('문서 서비스가 초기화되었습니다.');
      } catch (error) {
        console.error('문서 서비스 초기화 오류:', error);
      }
    };
    
    initDocService();
  }, []);

  // 코지 초기 메시지 설정
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        setMessages([{
          id: uuidv4(),
          text: CojiKnowledgeBase.responses.greeting,
          type: 'coji',
          emotion: '😊'
        }]);
      }, 500);
    }
  }, [isOpen, messages.length]);

  // 메시지 변경 시 스크롤
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 메시지 전송 처리
  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // 사용자 메시지 추가
    const userMessage: Message = {
      id: uuidv4(),
      text: input.trim(),
      type: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // 코지 서비스로 응답 생성
      const cojiResponse = await cojiService.generateResponse(input.trim());
      
      // HTML 태그 제거하여 순수 텍스트만 표시
      const sanitizedText = stripHtmlTags(cojiResponse.text || "죄송해요, 응답을 받지 못했어요.");
      
      // 응답 추가
      const newCojiMessage: Message = {
        id: uuidv4(),
        text: sanitizedText,
        type: 'coji',
        emotion: cojiResponse.emotion || '😊'
      };
      
      setMessages(prev => [...prev, newCojiMessage]);
    } catch (error) {
      console.error('응답 처리 오류:', error);
      
      // 오류 메시지 추가
      const errorCojiMessage: Message = {
        id: uuidv4(),
        text: error instanceof Error 
          ? error.message 
          : '응답 생성 중 오류가 발생했습니다.',
        type: 'coji',
        emotion: '⚠️'
      };
      
      setMessages(prev => [...prev, errorCojiMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* 코지 버튼 */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.div
          className="relative"
          onHoverStart={() => setShowTooltip(true)}
          onHoverEnd={() => setShowTooltip(false)}
        >
          <motion.button
            className="bg-pink-400 hover:bg-pink-500 text-white rounded-full p-4 shadow-lg relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={floatingAnimation}
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="relative w-8 h-8">
              <span className="absolute text-3xl" style={{ top: '-5px', left: '-2px' }}>👼</span>
              <span className="absolute text-xl" style={{ bottom: '-2px', right: '-2px' }}>✨</span>
            </div>
          </motion.button>

          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-full mb-2 right-0 bg-white px-4 py-2 rounded-lg shadow-lg whitespace-nowrap"
              >
                <div className="text-gray-700 text-sm font-medium">코지 챗봇이에요 💝</div>
                <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-white"></div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* 코지 채팅창 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatContainerRef}
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.3 }}
            className="fixed bottom-24 right-6 w-[400px] bg-white rounded-2xl shadow-xl overflow-hidden z-50"
          >
            {/* 헤더 */}
            <div className="bg-pink-400 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">👼</span>
                <span className="text-white font-bold">코지</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-pink-100"
              >
                ✕
              </button>
            </div>

            {/* 메시지 영역 */}
            <div className="h-[400px] overflow-y-auto p-4 bg-pink-50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-4 ${
                    message.type === 'user' ? 'flex justify-end' : 'flex justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[300px] p-3 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-pink-400 text-white'
                        : 'bg-white shadow-md'
                    }`}
                  >
                    {/* 텍스트 콘텐츠 안전하게 표시 */}
                    {message.text}
                    {message.type === 'coji' && message.emotion && (
                      <span className="ml-2">{message.emotion}</span>
                    )}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2 text-pink-400 text-2xl"
                >
                  <span>.</span>
                  <span>.</span>
                  <span>.</span>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* 입력 영역 */}
            <div className="p-4 bg-white border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="코지에게 물어보세요!"
                  className="flex-1 px-4 py-2 rounded-full border border-pink-200 focus:outline-none focus:border-pink-400"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSendMessage}
                  className="bg-pink-400 text-white rounded-full p-2 hover:bg-pink-500"
                >
                  💝
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Coji;