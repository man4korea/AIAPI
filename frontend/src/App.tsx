// 📁 frontend/src/App.tsx
// Create at 2504191740

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import AnalyzeInputPage from './pages/AnalyzeInputPage';
import KnowledgeBasePage from './pages/KnowledgeBasePage';
import CorpEasyBlogPage from './pages/CorpEasyBlogPage';
import ContentAnalysisPage from './pages/ContentAnalysisPage';
import BlogDetailPage from './pages/BlogDetailPage';
import Dashboard from './pages/Dashboard';
import { Coji } from './pages/Coji';

// 신규 추가된 페이지 
const PromptGenerator = () => <div className="container mx-auto p-6"><h1 className="text-2xl font-bold mb-4">프롬프트 생성기</h1><p>효과적인 AI 프롬프트를 자동으로 생성하는 도구입니다.</p></div>;
const BizCounsel = () => <div className="container mx-auto p-6"><h1 className="text-2xl font-bold mb-4">경영 고민 상담소</h1><p>비즈니스 문제에 대한 AI 기반 전문 상담 서비스입니다.</p></div>;
const Community = () => <div className="container mx-auto p-6"><h1 className="text-2xl font-bold mb-4">동종업종 커뮤니티</h1><p>업종별 네트워킹 및 정보 공유 플랫폼입니다.</p></div>;
const YoutubeContent = () => <div className="container mx-auto p-6"><h1 className="text-2xl font-bold mb-4">유튜브 콘텐츠</h1><p>카테고리별 분석된 유튜브 콘텐츠 모음입니다.</p></div>;

// 아직 구현되지 않은 페이지를 위한 임시 컴포넌트
const TrendAlerts = () => <div className="container mx-auto p-6"><h1 className="text-2xl font-bold mb-4">업계 트렌드 알리미</h1><p>맞춤형 트렌드 모니터링 및 알림 서비스입니다.</p></div>;
const CreativeStudio = () => <div className="container mx-auto p-6"><h1 className="text-2xl font-bold mb-4">크리에이티브 스튜디오</h1><p>콘텐츠 제작 도구 모음입니다.</p></div>;
const DataAnalyzer = () => <div className="container mx-auto p-6"><h1 className="text-2xl font-bold mb-4">데이터 분석기</h1><p>업로드된 데이터 자동 분석 도구입니다.</p></div>;
const ReportGenerator = () => <div className="container mx-auto p-6"><h1 className="text-2xl font-bold mb-4">리포트 생성기</h1><p>맞춤형 비즈니스 리포트 생성 도구입니다.</p></div>;
const DecisionSupport = () => <div className="container mx-auto p-6"><h1 className="text-2xl font-bold mb-4">의사결정 지원</h1><p>AI 기반 비즈니스 의사결정 지원 서비스입니다.</p></div>;
const ChatbotBuilder = () => <div className="container mx-auto p-6"><h1 className="text-2xl font-bold mb-4">AI 비서 생성기</h1><p>맞춤형 AI 챗봇 생성 도구입니다.</p></div>;
const AiHelper = () => <div className="container mx-auto p-6"><h1 className="text-2xl font-bold mb-4">AI 활용 도우미</h1><p>AI 도구 활용 가이드입니다.</p></div>;
const Settings = () => <div className="container mx-auto p-6"><h1 className="text-2xl font-bold mb-4">설정</h1><p>시스템 설정 페이지입니다.</p></div>;

/**
 * App 컴포넌트
 * 라우팅 설정 및 메인 레이아웃 구성
 * 우리가 디자인한 UI/UX 스타일과 레이아웃 사용
 */
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* 기본 레이아웃 - 우리가 디자인한 사이드바와 톱바 적용 */}
        <Route path="/" element={<Layout />}>
          {/* 대시보드 */}
          <Route index element={<Dashboard />} />
          
          {/* 콘텐츠 상세분석기 */}
          <Route path="analyze" element={<AnalyzeInputPage />} />
          <Route path="content-analyzer" element={<AnalyzeInputPage />} />
          <Route path="content-analysis/:id" element={<ContentAnalysisPage />} />
          
          {/* 지식정보창고 */}
          <Route path="knowledge-base" element={<KnowledgeBasePage />} />
          <Route path="blog" element={<CorpEasyBlogPage />} />
          <Route path="blog/:id" element={<BlogDetailPage />} />
          <Route path="youtube-content" element={<YoutubeContent />} />
          
          {/* 업계 트렌드 알리미 */}
          <Route path="trend-alerts" element={<TrendAlerts />} />
          
          {/* 크리에이티브 스튜디오 */}
          <Route path="creative/*" element={<CreativeStudio />} />
          
          {/* 비즈 애널리틱스 */}
          <Route path="analytics">
            <Route index element={<Navigate to="/analytics/data-analyzer" replace />} />
            <Route path="data-analyzer" element={<DataAnalyzer />} />
            <Route path="report-generator" element={<ReportGenerator />} />
            <Route path="decision-support" element={<DecisionSupport />} />
          </Route>
          
          {/* AI 비서 생성기 */}
          <Route path="chatbot-builder" element={<ChatbotBuilder />} />
          
          {/* 신규 추가된 메뉴 */}
          <Route path="prompt-generator" element={<PromptGenerator />} />
          <Route path="biz-counsel" element={<BizCounsel />} />
          <Route path="community" element={<Community />} />
          
          {/* AI 활용 도우미 */}
          <Route path="ai-helper/*" element={<AiHelper />} />
          
          {/* 설정 */}
          <Route path="settings/*" element={<Settings />} />
        </Route>
        
        {/* 404 리다이렉트 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      
      {/* 코지 챗봇은 전역으로 표시 */}
      <Coji />
    </Router>
  );
};

export default App;