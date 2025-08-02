# 이미지 스프라이트

`이미지 스프라이트(Image Sprite)` 는 여러 개의 작은 이미지들을 하나의 큰 이미지 파일로 합쳐서 사용하는 웹 최적화 기법. 웹 페이지가 로딩될 때 발생하는 HTTP 요청 횟수를 줄여 성능을 향상시키는 것이 주된 목적임.

## 이미지 스트라이프 종류

### CSS 스프라이트 (PNG/JPG)

- 여러 비트맵 이미지(PNG, JPG)를 합쳐 하나의 파일로 만듬
- 사용법: HTML 요소의 background-image로 스프라이트 파일을 지정하고, background-position 속성을 이용해 원하는 아이콘이 있는 영역만 잘라내서 보여줌
- 오래전부터 사용된 전통적인 방법
- 픽셀 기반이라 확대하면 이미지가 깨지고, CSS로 색상 변경이 어려움
- 이미지 생성 사이트 예시) https://www.toptal.com/developers/css/sprite-generator/

### SVG 스프라이트

- 여러 개의 `벡터 아이콘(SVG)` 을 `<symbol>` 태그를 사용해 하나의 SVG 파일에 정의함
- HTML에서 `<use>` 태그를 이용해 스프라이트 파일의 특정 `<symbol>` ID를 참조하여 아이콘을 불러옴
- 벡터 기반이라 크기를 키워도 깨지지 않고 선명합니다. fill 속성을 이용해 CSS로 색상 변경이 자유로움
- SVG 파일 자체가 XML 형식이라 관리가 번거로울 수 있음

## SVG 스프라이트 적용방법

### 정적 파일 추가 방식

SVG 스프라이트 파일을 public 폴더에 두고, 컴포넌트에서 해당 파일을 참조하는 방법으로 캐싱 효율이 높음

- 구현:
  - `public/sprite.svg` 파일 생성: 모든 아이콘의 `<symbol>` 을 합친 하나의 `sprite.svg` 파일을 `public` 폴더에 저장
  - `SvgIcon.tsx` 컴포넌트 생성: `use` 태그를 활용해 아이콘 ID를 참조하여 `sprite.svg` 를 불러오는 재사용 가능한 컴포넌트
  - 컴포넌트 사용: `<SvgIcon name="google" className="w-8 h-8" />` 와 같이 사용

```svg
// public/sprite.svg
<svg xmlns="http://www.w3.org/2000/svg">
  <symbol id="icon_id" viewBox="...">
    ...
  </symbol>
  ...
</svg>
```

```ts
// src/components/SvgIcon.tsx
export function SvgIcon({ name, className }: { name: string; className?: string }) {
  return (
    <svg className={className}>
      <use href={`/sprite.svg#${name}`} />
    </svg>
  );
}
```

### 컴포넌트 방식

모든 SVG 아이콘을 포함하는 하나의 React 컴포넌트를 만들고, 이 컴포넌트를 최상위 컴포넌트에서 한 번만 렌더링하는 방법으로 별도의 네트워크 요청이 없다는 장점이 있지만, 초기 HTML 파일 크기가 커짐

- 구현:
  - `SvgSprite.tsx` 컴포넌트 생성: 모든 아이콘의 `<symbol>`을 담은 컴포넌트 생성
  - `RootLayout` 에 컴포넌트 추가: `<Layout>` 컴포넌트 내부에 `<SvgSprite />`를 한 번만 렌더링
  - 컴포넌트 사용: `<use>` 태그로 `<SvgSprite>` 컴포넌트 내부의 아이콘 ID를 참조하여 사용

```ts
// component/SvgSprite.tsx
export function SvgSprite() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg">
      <symbol id="icon_id" viewBox="...">
        ...
      </symbol>
      ...
    </svg>
  )
}

// src/app/layout.tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body>
        <SvgSprite />
      </body>
    </html>
  )
}

// src/components/SvgIcon.tsx
export function SvgIcon({ name, className }: { name: string; className?: string }) {
  return (
    <svg className={className}>
      <use href={`/sprite.svg#${name}`} />
    </svg>
  );
}
```

## SVG 캐시 버스팅

`/public/sprite.svg` 파일을 수정했을 때, 사용자의 브라우저에 캐시된 이전 버전의 파일이 로드되는 문제가 발생함. `캐시 버스팅(Cache Busting)` 은 파일의 내용이 변경될 때 URL을 바꿔서 브라우저가 새로운 파일을 다운로드하도록 강제하는 기술임.
