import type { Invitation } from './types';

const base = import.meta.env.BASE_URL;

export const invitation: Invitation = {
  groomName: '지환',
  brideName: '인화',
  greeting:
    '언제나 손을 잡고 걷는 지금처럼\n앞으로의 모든 날도 함께 걸어가겠습니다.\n\n저희의 시작을 함께해 주시면 감사하겠습니다.',
  weddingDate: '2026-07-11T17:00:00+09:00',
  weddingDateDisplay: '2026년 7월 11일 토요일 오후 5시',
  venue: {
    name: '노블발렌티 삼성',
    address: '서울 강남구 봉은사로 637',
    lat: 37.5117,
    lng: 127.0601,
    transportation: [
      {
        type: 'subway',
        lines: [
          {
            name: '9호선 봉은사역',
            detail: '4번 출구, 도보 약 4분',
            walkMinutes: 4,
          },
          {
            name: '2호선 삼성역',
            detail: '8번 출구, 도보 약 15분',
            walkMinutes: 15,
          },
        ],
      },
      {
        type: 'bus',
        lines: [
          {
            name: '3417번',
            detail: '노블발렌티 정류장 하차, 8분 소요',
          },
          {
            name: '강남01번',
            detail: '노블발렌티 정류장 하차, 9분 소요',
          },
        ],
      },
      {
        type: 'shuttle',
        lines: [
          {
            name: '셔틀버스',
            detail: '봉은사역 5번 출구 우측 50~60m (5분 간격)',
            walkMinutes: 5,
          },
        ],
      },
    ],
    parking: [
      {
        name: '본관',
        capacity: 100,
        address: '서울 강남구 봉은사로 637',
        note: '이중주차 포함, 발렛',
      },
      {
        name: '별관',
        capacity: 200,
        address: '서울 강남구 봉은사로 610',
        note: '웨딩홀까지 도보 5분 or 셔틀 이용 가능',
      },
    ],
  },
  families: [
    {
      side: 'groom',
      fatherName: '김동희',
      motherName: '조진숙',
      relation: '의 장남',
      childName: '지환',
    },
    {
      side: 'bride',
      fatherName: '강대연',
      motherName: '장옥분',
      relation: '의 장녀',
      childName: '인화',
    },
  ],
  contacts: [
    { name: '지환', role: '신랑', phone: '010-0000-0000' },
    { name: '인화', role: '신부', phone: '010-0000-0000' },
    { name: '김동희', role: '신랑 아버지', phone: '010-0000-0000' },
    { name: '조진숙', role: '신랑 어머니', phone: '010-0000-0000' },
    { name: '강대연', role: '신부 아버지', phone: '010-0000-0000' },
    { name: '장옥분', role: '신부 어머니', phone: '010-0000-0000' },
  ],
  galleryImages: [
    { src: `${base}images/gallery-1.jpg`, alt: '웨딩 사진 1', order: 1 },
    { src: `${base}images/gallery-2.jpg`, alt: '웨딩 사진 2', order: 2 },
    { src: `${base}images/gallery-3.jpg`, alt: '웨딩 사진 3', order: 3 },
    { src: `${base}images/gallery-4.jpg`, alt: '웨딩 사진 4', order: 4 },
    { src: `${base}images/gallery-5.jpg`, alt: '웨딩 사진 5', order: 5 },
    { src: `${base}images/gallery-6.jpg`, alt: '웨딩 사진 6', order: 6 },
  ],
  externalLinks: {
    rsvpFormUrl: import.meta.env.VITE_RSVP_FORM_URL || 'https://docs.google.com/forms',
    kakaoMapUrl: 'https://map.kakao.com/link/to/노블발렌티 삼성,37.5117,127.0601',
  },
};
