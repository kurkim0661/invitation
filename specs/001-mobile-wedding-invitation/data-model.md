# Data Model: 모바일 청첩장

**Date**: 2026-04-24

## Overview

모바일 청첩장은 백엔드 없이 정적 데이터를 기반으로 동작한다. 모든 데이터는 프론트엔드 설정 파일(JSON 또는 TypeScript 상수)에 정의된다.

## Entities

### Invitation (청첩장 메인 정보)

| Field | Type | Description |
|-------|------|-------------|
| groomName | string | 신랑 이름 ("지환") |
| brideName | string | 신부 이름 ("인화") |
| greeting | string | 인사말 텍스트 |
| weddingDate | string (ISO 8601) | 결혼식 날짜시간 ("2026-07-11T17:00:00+09:00") |
| weddingDateDisplay | string | 표시용 날짜 ("2026년 7월 11일 토요일 오후 5시") |
| venue | Venue | 결혼식장 정보 |

### Family (혼주 정보)

| Field | Type | Description |
|-------|------|-------------|
| side | "groom" \| "bride" | 신랑측/신부측 |
| fatherName | string | 아버지 이름 |
| motherName | string | 어머니 이름 |
| relation | string | 관계 ("의 장남", "의 장녀") |
| childName | string | 자녀 이름 |

### Contact (연락처)

| Field | Type | Description |
|-------|------|-------------|
| name | string | 이름 |
| role | string | 역할 ("신랑", "신부", "신랑 아버지", "신부 어머니" 등) |
| phone | string | 전화번호 |

### Venue (결혼식장)

| Field | Type | Description |
|-------|------|-------------|
| name | string | 식장명 ("노블발렌티 삼성") |
| address | string | 주소 ("서울 강남구 봉은사로 637") |
| lat | number | 위도 |
| lng | number | 경도 |
| transportation | Transportation[] | 교통편 목록 |
| parking | Parking[] | 주차 정보 목록 |

### Transportation (교통편)

| Field | Type | Description |
|-------|------|-------------|
| type | "subway" \| "bus" \| "shuttle" | 교통 유형 |
| lines | TransportLine[] | 노선 정보 목록 |

### TransportLine (노선 상세)

| Field | Type | Description |
|-------|------|-------------|
| name | string | 노선명 ("9호선 봉은사역", "3417번") |
| detail | string | 상세 안내 ("4번 출구, 도보 약 4분") |
| walkMinutes | number? | 도보 소요 시간 (분) |

### Parking (주차 정보)

| Field | Type | Description |
|-------|------|-------------|
| name | string | 주차장명 ("본관", "별관") |
| capacity | number | 수용 대수 |
| address | string | 주소 |
| note | string | 비고 ("이중주차 포함, 발렛") |

### GalleryImage (갤러리 이미지)

| Field | Type | Description |
|-------|------|-------------|
| src | string | 이미지 파일 경로 |
| alt | string | 대체 텍스트 |
| order | number | 표시 순서 |

### ExternalLinks (외부 링크)

| Field | Type | Description |
|-------|------|-------------|
| rsvpFormUrl | string | Google Form URL |
| kakaoMapUrl | string | 카카오맵 길찾기 URL |

## Relationships

```
Invitation
├── Family[] (groom side, bride side)
├── Contact[] (groom, bride, parents)
├── Venue
│   ├── Transportation[]
│   │   └── TransportLine[]
│   └── Parking[]
├── GalleryImage[]
└── ExternalLinks
```

## Data Storage

- 모든 데이터는 `src/data/invitation.ts` (또는 `.json`)에 정적으로 정의
- 이미지 파일은 `public/images/` 디렉토리에 저장
- 환경변수: 카카오맵 API 키 (`VITE_KAKAO_MAP_API_KEY`)
