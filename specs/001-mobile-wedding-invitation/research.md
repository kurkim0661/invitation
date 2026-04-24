# Research: 모바일 청첩장

**Date**: 2026-04-24
**Feature**: Mobile Wedding Invitation

## R1: Frontend Framework Selection

**Decision**: React + Vite (static SPA)

**Rationale**: 
- 단일 페이지 모바일 청첩장으로 SSR/SSG가 불필요하며, Vite의 빠른 빌드와 HMR이 개발 생산성을 높임
- React는 갤러리 뷰어, 연락처 팝업 등 인터랙티브 컴포넌트 구현에 적합
- 빌드 결과가 정적 파일이므로 어떤 정적 호스팅에도 배포 가능

**Alternatives considered**:
- Next.js: SSR/SSG 기능이 이 프로젝트에는 과도함. 정적 export 가능하지만 불필요한 복잡성 추가
- Plain HTML/CSS/JS: 인터랙티브 요소(갤러리 뷰어, 팝업)가 많아 컴포넌트 기반 접근이 유리
- Astro: 콘텐츠 중심 사이트에 적합하나, React 생태계 활용도가 낮음

## R2: Styling Approach

**Decision**: Tailwind CSS

**Rationale**:
- Figma 디자인을 픽셀 단위로 정확히 구현하기에 유틸리티 클래스 접근이 효율적
- 모바일 반응형 디자인에 강점 (모바일 우선 breakpoint 시스템)
- 빌드 시 사용하지 않는 CSS 제거로 최종 번들 사이즈 최소화

**Alternatives considered**:
- CSS Modules: 컴포넌트 격리에 좋지만, Figma 디자인 변환 속도가 느림
- styled-components: 런타임 CSS-in-JS 오버헤드가 모바일 성능에 불리
- Vanilla CSS: 유지보수 어려움, 클래스 충돌 위험

## R3: Gallery Viewer

**Decision**: Swiper.js

**Rationale**:
- 모바일 터치 스와이프에 최적화된 성숙한 라이브러리
- 풀스크린 모드, 좌우 스와이프 네비게이션 기본 제공
- React 용 공식 컴포넌트 제공 (swiper/react)
- Tree-shakeable하여 필요한 모듈만 번들에 포함

**Alternatives considered**:
- PhotoSwipe: 좋은 라이브러리이나 React 통합이 비공식적
- react-image-gallery: 기능이 제한적이고 커스터마이징 어려움
- 자체 구현: 터치 이벤트, 제스처, 애니메이션 등 구현 비용이 큼

## R4: Map Integration

**Decision**: Kakao Maps JavaScript SDK v3

**Rationale**:
- 사용자 명시 선택 (clarification Q4)
- 한국 지도 데이터가 가장 정확하고 상세함
- 무료 API 키로 일간 300,000회 호출 가능 (청첩장 트래픽에 충분)
- 마커, 인포윈도우, 길찾기 URL 생성 지원

**Alternatives considered**:
- 네이버맵: 유사한 기능이지만 API 키 발급이 더 까다로움
- Google Maps: 한국 상세 지도 데이터 부족, 비용 발생 가능

## R5: Deployment Strategy

**Decision**: Vercel (정적 사이트 호스팅)

**Rationale**:
- Vite 프로젝트 자동 감지 및 빌드
- 무료 플랜으로 개인 프로젝트 커버 가능
- 전 세계 CDN으로 빠른 로딩 속도
- GitHub 연동으로 push 시 자동 배포
- 커스텀 도메인 지원 (HTTPS 자동)

**Alternatives considered**:
- Netlify: 유사한 기능, 동등한 대안
- GitHub Pages: 가능하지만 SPA 라우팅 설정이 번거로움
- AWS S3 + CloudFront: 과도한 설정 복잡성

## R6: Clipboard API for Address Copy

**Decision**: Clipboard API (navigator.clipboard.writeText) + fallback

**Rationale**:
- 모던 브라우저에서 표준 지원
- HTTPS 환경에서 동작 (Vercel 배포 시 기본 HTTPS)
- 구형 브라우저 대비 document.execCommand('copy') fallback 구현

## R7: Contact Popup Implementation

**Decision**: 자체 Modal 컴포넌트

**Rationale**:
- 연락처 목록 + 전화/문자 버튼이라는 단순한 UI
- tel: 및 sms: URI scheme으로 모바일 기기 기본 앱 연동
- 외부 라이브러리 불필요한 수준의 간단한 모달
