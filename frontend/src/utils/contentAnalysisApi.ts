// 📁 frontend/src/utils/contentAnalysisApi.ts
// Create at 2504191125

import axios from 'axios';

// API 기본 URL 설정
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3002';

/**
 * 콘텐츠 분석 API 클라이언트
 */
const contentAnalysisApi = {
  /**
   * 콘텐츠 분석 요청
   * @param input URL, 키워드, 텍스트 등
   * @returns 분석 결과
   */
  analyzeContent: async (input: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/analyze/content`, { input });
      return response.data;
    } catch (error) {
      console.error('콘텐츠 분석 API 오류:', error);
      throw error;
    }
  },

  /**
   * 파일 업로드 분석 요청
   * @param file 분석할 파일
   * @returns 분석 결과
   */
  analyzeFile: async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(`${API_BASE_URL}/api/analyze/file`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      console.error('파일 분석 API 오류:', error);
      throw error;
    }
  },

  /**
   * 상세 분석 요청
   * @param analysisId 기본 분석 결과 ID
   * @returns 상세 분석 결과
   */
  getDetailedAnalysis: async (analysisId: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/analyze/detail/${analysisId}`);
      return response.data;
    } catch (error) {
      console.error('상세 분석 API 오류:', error);
      throw error;
    }
  },

  /**
   * 블로그 콘텐츠 생성 요청
   * @param analysisId 분석 결과 ID
   * @param title 블로그 제목
   * @returns 생성된 블로그 정보
   */
  generateBlogContent: async (analysisId: string, title: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/analyze/blog`, { analysisId, title });
      return response.data;
    } catch (error) {
      console.error('블로그 생성 API 오류:', error);
      throw error;
    }
  },

  /**
   * 모든 콘텐츠 분석 결과 조회
   * @param limit 조회 개수
   * @returns 콘텐츠 분석 결과 목록
   */
  getAllContentAnalyses: async (limit = 10) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/analyze/content-analyses?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('콘텐츠 분석 결과 조회 API 오류:', error);
      throw error;
    }
  },

  /**
   * 카테고리별 콘텐츠 분석 결과 조회
   * @param category 카테고리
   * @param limit 조회 개수
   * @returns 카테고리별 콘텐츠 분석 결과 목록
   */
  getContentAnalysesByCategory: async (category: string, limit = 10) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/analyze/content-analyses/category/${category}?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('카테고리별 콘텐츠 분석 결과 조회 API 오류:', error);
      throw error;
    }
  },

  /**
   * 게시된 블로그 아티클 조회
   * @param limit 조회 개수
   * @returns 게시된 블로그 아티클 목록
   */
  getPublishedBlogs: async (limit = 10) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/analyze/blogs?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('게시된 블로그 아티클 조회 API 오류:', error);
      throw error;
    }
  },

  /**
   * 블로그 아티클 상세 조회
   * @param blogId 블로그 아티클 ID
   * @returns 블로그 아티클 상세 정보
   */
  getBlogDetail: async (blogId: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/analyze/blog/${blogId}`);
      return response.data;
    } catch (error) {
      console.error('블로그 아티클 상세 조회 API 오류:', error);
      throw error;
    }
  },
};

export default contentAnalysisApi;