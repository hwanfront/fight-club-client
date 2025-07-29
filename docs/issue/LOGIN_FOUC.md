## Next.js App Router: 서버 상태 Hydration 전략

### 목표

- 새로고침 시 '비로그인 상태'가 잠깐 보이는 `깜빡임 현상(FOUC, Flash of Unauthenticated Content)`을 제거
- Next.js App Router의 서버 컴포넌트를 활용하여 초기 로딩 성능을 최적화하고 검색 엔진 최적화(SEO)에 유리한 구조
- 클라이언트 측 상태 관리 라이브러리(zustand)를 통해 SPA(Single Page Application)처럼 부드럽고 빠른 사용자 상호작용을 보장

### 핵심 컨셉: 서버-클라이언트 하이브리드 패턴

서버 컴포넌트와 클라이언트 컴포넌트의 장점을 모두 활용하는 하이브리드 패턴을 사용함.

1.  서버 렌더링: 사용자가 페이지에 처음 접속하면, 서버 컴포넌트가 먼저 실행되어 백엔드 API로부터 사용자 정보를 가져옴
2.  초기 HTML 생성: 서버는 이 사용자 정보를 바탕으로 완성된 초기 HTML(예: "Welcome, username"이 포함된 헤더)을 생성하여 클라이언트에 전송
3.  Hydration (상태 주입): 클라이언트는 완성된 HTML을 즉시 표시와 동시에 서버에서 전달받은 사용자 정보를 클라이언트의 zustand 스토어에 주입(Hydrate)하여 상태를 초기화
4.  클라이언트 인터랙션: Hydration이 완료된 후, 애플리케이션은 zustand 스토어를 중심으로 동작하는 완전한 SPA처럼 동작

### 주요 구현 요소

이 패턴을 구현하는 핵심 요소들은 다음과 같음.

1. `useUser()` - 서버 전용 데이터 페칭 훅

- 역할: 서버 컴포넌트에서 현재 로그인된 사용자 정보를 가져오는 역할
- 특징:
  - `'server-only'` 지시어를 사용하여 서버 환경에서만 실행됨을 명시
  - `next/headers` 의 `cookies()` 함수를 사용하여 브라우저의 쿠키에 접근
  - 실제 백엔드 API(`process.env.BACKEND_API_URL`)를 직접 호출하여 데이터를 가져옴
  - 불필요한 내부 네트워크 요청을 방지하고 성능을 최적화

2. `Header.tsx` - 서버 컴포넌트 (오케스트레이터)

- 역할: 데이터 페칭과 UI 렌더링을 조율하는 오케스트레이터 역할
- 특징:
  - `async` 함수로 정의된 서버 컴포넌트
  - `useUser()` 훅을 `await` 으로 호출하여 사용자 정보를 가져옴
  - 가져온 user 데이터를 `StoreInitializer` 와 `UserNav` 라는 두 개의 자식 클라이언트 컴포넌트에 prop으로 전달

3. `StoreInitializer.tsx` - 클라이언트 컴포넌트 (Hydration 브릿지)

- 역할: 서버에서 받은 데이터를 클라이언트의 zustand 스토어에 안전하게 주입하는 브릿지 역할
- 특징:
  - UI를 렌더링하지 않음
  - useEffect 훅을 사용하여, 렌더링 과정이 끝난 후에 zustand 스토어의 상태를 업데이트하여 렌더링 중 상태 변경 오류를 방지
  - 이 컴포넌트는 앱이 처음 로드될 때 단 한 번만 상태를 주입하는 역할 수행

4. `UserNav.tsx` - 클라이언트 컴포넌트 (UI 및 상호작용)

- 역할: 실제 사용자 UI(사용자 이름, 로그아웃 버튼 등)를 표시하고 관련 상호작용을 처리
- 특징:
  - `initialUser` prop: 서버에서 렌더링된 초기 HTML과 클라이언트의 첫 렌더링 결과물을 일치
    - "Hydration Mismatch" 오류와 UI 깜빡임을 방지
  - `useUserStore` 구독: zustand 스토어를 구독하여, Hydration 이후에 발생하는 상태 변화에 실시간으로 반응하고 UI 업데이트

4. 데이터 흐름 요약

```
 1 [사용자 요청]
 2       |
 3       v
 4 [Next.js 서버]
 5   1. Header.tsx (서버 컴포넌트) 실행
 6   2.   -> useUser() 훅 호출
 7   3.     -> 백엔드 API (localhost:8080)에 사용자 정보 요청
 8   4.   <- user 데이터 수신
 9   5. Header가 user 데이터를 prop으로 하여 UserNav와 StoreInitializer를 포함한 HTML 생성
10       |
11       v
12 [클라이언트 - 브라우저]
13   6. 서버에서 생성된 완성된 HTML을 즉시 표시 (깜빡임 없음)
14   7. JavaScript 로드 및 React Hydration 시작
15   8.   -> StoreInitializer.tsx (클라이언트 컴포넌트)의 useEffect 실행
16   9.     -> user 데이터를 zustand 스토어에 주입(login, setLoading 호출)
17   10.  -> UserNav.tsx (클라이언트 컴포넌트)는 zustand 스토어를 구독하여 이후의 모든 상태변화에 반응할 준비 완료
```
