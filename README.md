# candiy-health-dashboard

CANDiY API를 활용한 건강검진 결과 시각화 대시보드 구현

## 0. 배포 링크

- [https://candiy-health-dashboard.vercel.app/](https://candiy-health-dashboard.vercel.app/)

## 1. 주요 기능

- 인증 폼 생성 및 유효성 검사
- 건강검진 결과 조회 (CANDiY API 연동)
- 건강검진 결과 시각화

## 2. 기술 스택

### Frontend

- Next.js
- React
- TypeScript
- styled-components

### 상태 관리 & 폼

- Zustand
- React Hook Form
- Zod

### 차트 & 시각화

- Chart.js

### 개발 도구

- ESLint
- Jest

### 배포

- Vercel

## 3. 프로젝트 실행

### 의존성 설치

```bash
npm install
```

### 환경변수 설정

1. `.env.default` 파일을 복사하여 `.env` 파일 생성

```bash
cp .env.default .env
```

2. [CANDiY API KEY 발급 페이지](https://developer.candiy.io/user/api-key/)에 접속
3. 회원가입 또는 로그인
4. API 키 발급받기
5. 발급받은 API 키를 `.env` 파일의 `NEXT_PUBLIC_CANDIY_API_KEY`에 설정

### 웹 서버 실행

```bash
npm start
```

서버가 실행되면 브라우저에서 [http://localhost:8000](http://localhost:8000)으로 접속하여 확인할 수 있습니다.

### 테스트 실행

```bash
npm test
```

### 린트 검사

```bash
npm run lint
```

### 빌드

```bash
npm run build
```

## 4. 페이지

- `/` - 서비스 선택
- `/health-checkups` - 건강검진 결과 조회를 위한 정보 입력
- `/health-checkups/result` - 건강검진 결과 대시보드
- `/treatments` - 진료 및 투약정보 (서비스 준비 중)
- `/records` - 내 진료 정보 열람 (서비스 준비 중)
- `/pills` - 내가 먹는 약 한눈에 (서비스 준비 중)
