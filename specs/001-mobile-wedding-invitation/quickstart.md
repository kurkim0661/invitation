# Quickstart: 모바일 청첩장

## Prerequisites

- Node.js 18+ 
- npm 또는 yarn
- 카카오맵 API 키 (https://developers.kakao.com/ 에서 발급)

## Setup

```bash
# 의존성 설치
npm install

# 환경변수 설정
cp .env.example .env
# .env 파일에서 VITE_KAKAO_MAP_API_KEY 값 설정

# 개발 서버 실행
npm run dev
```

## Development

```bash
# 개발 서버 (Hot Reload)
npm run dev

# 빌드
npm run build

# 빌드 결과 미리보기
npm run preview

# 린트
npm run lint

# 테스트
npm run test
```

## Project Structure

```
src/
├── components/          # React 컴포넌트
│   ├── Header.tsx       # Wedding Day 헤더 + 메인 사진
│   ├── Greeting.tsx     # 인사말 섹션
│   ├── Calendar.tsx     # 달력 컴포넌트
│   ├── FamilyInfo.tsx   # 혼주 정보
│   ├── ContactModal.tsx # 연락처 팝업 모달
│   ├── Rsvp.tsx         # 참석 여부 (Google Form 링크)
│   ├── Gallery.tsx      # 갤러리 그리드 + 풀스크린 뷰어
│   ├── Location.tsx     # 지도 + 주소
│   └── Transportation.tsx # 교통편 안내
├── data/
│   └── invitation.ts    # 청첩장 데이터 (정적)
├── App.tsx              # 메인 앱 (섹션 조합)
├── main.tsx             # 엔트리포인트
└── index.css            # 글로벌 스타일 + Tailwind

public/
├── images/              # 웨딩 사진 등 이미지 리소스
└── fonts/               # 웹폰트 (선택)
```

## Deployment

```bash
# Vercel CLI로 배포
npx vercel

# 또는 GitHub 연동 후 push 시 자동 배포
git push origin main
```

## Key Configuration

- **카카오맵 API 키**: `.env` 파일의 `VITE_KAKAO_MAP_API_KEY`
- **Google Form URL**: `src/data/invitation.ts`의 `rsvpFormUrl`
- **청첩장 데이터**: `src/data/invitation.ts`에서 모든 텍스트/정보 수정
- **갤러리 이미지**: `public/images/` 디렉토리에 파일 추가 후 `invitation.ts`에 등록
