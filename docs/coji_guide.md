// 📁 docs/coji_guide.md
// Create at 2504191545

# 코지(Coji) 챗봇 사용 가이드

- 작성일: 2025년 4월 19일
- 버전: 1.1.0

## 🤖 코지 소개

코지(Coji)는 CorpEasy 서비스의 AI 비서로, 사용자가 CorpEasy의 다양한 기능을 더 쉽게 활용할 수 있도록 도와줍니다. 코지는 문서 기반 지식과 Claude 3 Haiku 모델을 결합하여 정확하고 친절한 답변을 제공합니다.

## 💬 주요 기능

1. **CorpEasy 기능 안내**
   - 콘텐츠 상세분석기 사용법 안내
   - 영어 자막 번역 기능 설명
   - 블로그 생성 프로세스 안내
   - AI 모델 활용 방법 설명

2. **문서 기반 응답**
   - CorpEasy의 공식 문서를 참조하여 정확한 정보 제공
   - 문서에 없는 내용에 대해서는 솔직하게 모른다고 답변

3. **실시간 지원**
   - CorpEasy 사용 중 발생하는 질문에 즉시 답변
   - 오류 해결 방법 안내
   - 추가 도움이 필요한 경우 관련 문서 링크 제공

4. **안전한 응답 처리**
   - HTML 태그 자동 제거로 텍스트 응답만 제공
   - 상황에 맞는 이모지로 친근한 대화 제공
   - 다중 보안 시스템으로 안전한 상호작용 보장

## 📋 사용 방법

1. **코지 열기**
   - 화면 우측 하단의 분홍색 둥근 버튼(👼✨)을 클릭하면 코지 채팅창이 나타납니다.
   - 모든 페이지에서 접근 가능합니다.

2. **질문하기**
   - 채팅창 하단의 입력란에 질문을 입력하고 엔터 키를 누르거나 전송 버튼을 클릭합니다.
   - 간결하고 명확한 질문이 더 정확한 답변을 받는데 도움이 됩니다.

3. **답변 확인**
   - 코지는 문서를 참조하고 Claude API를 활용하여 최적의 답변을 생성합니다.
   - 이모지로 감정을 표현하여 대화를 더 친근하게 만듭니다.
   - 답변이 오래 걸리는 경우 진행 중임을 표시하는 애니메이션이 나타납니다.

## 💡 활용 사례

### 시나리오 1: 콘텐츠 분석기 사용법 문의
```
사용자: 유튜브 영상을 분석하는 방법을 알려줘
코지: 유튜브 영상 분석은 아주 간단해요! 콘텐츠 상세분석기 페이지에서 유튜브 URL을 입력란에 붙여넣고 '분석하기' 버튼을 클릭하면 됩니다. 자동으로 자막을 추출하고 요약해 드립니다. 영어 자막도 자동으로 한글로 번역해요! 😊
```

### 시나리오 2: 블로그 생성 문의
```
사용자: SEO 최적화된 블로그는 어떻게 만들어?
코지: SEO 블로그 생성은 다음과 같이 진행됩니다: 
1. 먼저 콘텐츠 분석기로 주제를 분석하세요
2. 상세 분석 결과에서 '추천 SEO 최적화 제목' 중 마음에 드는 것을 선택
3. '블로그 콘텐츠 생성 시작' 버튼을 클릭하면 자동으로 최적화된 블로그가 생성됩니다 ✨
```

### 시나리오 3: 오류 해결 도움
```
사용자: 유튜브 분석이 안 돼요. 오류가 발생했다고 나와요.
코지: 죄송해요, 유튜브 분석 오류가 발생했군요 ⚠️ 몇 가지 확인해 볼 사항이 있어요:
1. 영상 URL이 올바른 형식인지 확인해보세요(youtube.com/watch?v=...)
2. 해당 영상에 자막이 있는지 확인하세요
3. 네트워크 연결 상태를 확인해보세요
문제가 계속되면 다른 영상으로 시도해보시거나 지원팀에 문의해주세요!
```

## 🙋‍♀️ 자주 묻는 질문

### 코지는 어떤 질문에 답변할 수 있나요?
코지는 CorpEasy 서비스에 관한 모든 질문에 답변할 수 있습니다. 특히 콘텐츠 분석, 블로그 생성, AI 모델 사용 등에 대해 잘 알고 있습니다.

### 코지가 모르는 질문을 하면 어떻게 되나요?
코지는 솔직하게 모른다고 답변하며, 가능한 경우 관련된 다른 정보를 제안합니다.

### 코지의 답변은 얼마나 정확한가요?
코지는 공식 문서를 우선적으로 참조하여 정확한 정보를 제공합니다. 문서에 없는 내용은 Claude API를 통해 응답하지만, 이 경우 정보의 정확성이 100% 보장되지 않을 수 있습니다.

### 코지와의 대화는 저장되나요?
코지와의 대화는 현재 세션에만 유지되며, 페이지를 새로고침하거나 브라우저를 닫으면 초기화됩니다. 대화 내용은 서버에 저장되지 않습니다.

### HTML 태그나 코드가 그대로 보이는 경우는 어떻게 하나요?
코지 채팅창에 HTML 태그가 그대로 표시되는 경우는 v1.1.0 업데이트로 해결되었습니다. 만약 아직도 이런 문제가 발생한다면 브라우저 캐시를 지우고 페이지를 새로고침 해보세요. 문제가 지속되면 고객센터에 문의해주세요.

## 📚 관련 문서

- [콘텐츠 상세분석기 사용 가이드](/docs/content_analyzer_guide.md)
- [블로그 생성 가이드](/docs/blog_style_guide.txt)
- [자주 묻는 질문](/docs/faq.md)
- [코지 서비스 기술 문서](/docs/coji-service.md)

## 📝 업데이트 내역

### 버전 1.1.0 (2025년 4월 19일)
- HTML 태그 처리 개선으로 태그가 그대로 표시되는 문제 해결
- Claude 3 Haiku 모델로 업그레이드하여 응답 품질 향상
- 다중 방어 보안 시스템 추가로 더 안전한 대화 보장
- 응답 처리 속도 최적화

### 버전 1.0.0 (2025년 4월 15일)
- 코지 서비스 최초 출시
- GPT-3.5 모델 기반 구현
- 문서 기반 지식 검색 시스템 구현
- 기본 대화 기능 제공

## 📞 도움이 필요하신가요?

코지가 해결해드리지 못하는 문제가 있다면:
- 이메일: support@corpeasy.com
- 고객센터: 02-123-4567 (평일 09:00-18:00)
- 웹사이트: [www.corpeasy.com/support](https://www.corpeasy.com/support)