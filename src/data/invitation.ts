import type { Invitation } from './types';

const base = import.meta.env.BASE_URL;

export const invitation: Invitation = {
  groomName: '지환',
  brideName: '인화',
  greeting:
    '언제나 손을 잡고 걷는 지금처럼\n앞으로의 모든 날도 함께 걸어가겠습니다.\n저희의 시작을 함께해 주시면 감사하겠습니다.',
  weddingDate: '2026-07-11T17:00:00+09:00',
  weddingDateDisplay: '2026년 7월 11일 토요일, 오후 5시',
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
    { name: '지환', role: '신랑', phone: '010-9425-0661' },
    { name: '인화', role: '신부', phone: '010-3301-3108' },
    { name: '김동희', role: '신랑 아버지', phone: '010-5651-0661' },
    { name: '조진숙', role: '신랑 어머니', phone: '010-9651-0661' },
    { name: '강대연', role: '신부 아버지', phone: '010-8761-9108' },
    { name: '장옥분', role: '신부 어머니', phone: '010-2651-3108' },
  ],
  galleryImages: Array.from({ length: 28 }, (_, i) => ({
    src: `${base}images/gallery-${i + 1}.jpg`,
    thumb: `${base}images/thumbs/gallery-${i + 1}.jpg`,
    alt: `웨딩 사진 ${i + 1}`,
    order: i + 1,
  })),
  groomAccounts: [
    { bank: '토스뱅크', number: '1000-1510-9525', holder: '김지환' },
    { bank: '농협', number: '216-02-007282', holder: '김동희' },
    { bank: '농협', number: '302-0461-9352-71', holder: '조진숙' },
  ],
  brideAccounts: [
    { bank: '기업은행', number: '07819867701010', holder: '강인화' },
    { bank: '기업은행', number: '450-035996-01-018', holder: '강대연' },
    { bank: '기업은행', number: '11209651701019', holder: '장옥분' },
  ],
  externalLinks: {
    rsvpFormUrl: 'https://forms.gle/6QvEacDEoZRcnR9D9',
    kakaoMapUrl: 'https://map.kakao.com/link/to/노블발렌티 삼성,37.5117,127.0601',
  },
};
