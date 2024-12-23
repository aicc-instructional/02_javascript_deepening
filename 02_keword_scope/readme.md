# 자바스크립트 변수 선언, 스코프, 클로저 및 호이스팅 이해

## var, let, const의 스코프 차이
자바스크립트에서 변수를 선언할 때 사용하는 `var`, `let`, `const`는 스코프와 동작 방식에서 중요한 차이가 있다.

1. **`var`**
    - **스코프**: 함수 스코프(function scope)를 가진다. 즉, 함수 내부에서 선언된 변수는 함수 외부에서 접근할 수 없다.  
    - **특징**: 블록 스코프를 지원하지 않아 if, for 같은 블록에서 선언해도 외부에서 접근 가능하다.

2. **`let`**
    - **스코프**: 블록 스코프(block scope)를 가진다. `{}`로 감싸진 블록 내부에서만 유효하다.  
    - **특징**: 재선언이 불가능하며, 선언 전에 접근하면 에러가 발생한다.

3. **`const`**
    - **스코프**: `let`과 동일한 블록 스코프를 가진다.  
    - **특징**: 선언 시 반드시 초기화해야 하며, 값을 재할당할 수 없다.

## 표현식
```javascript
function testScope() {
    if (true) {
        var varVariable = "var 스코프";
        let letVariable = "let 스코프";
        const constVariable = "const 스코프";
    }
    console.log(varVariable); // "var 스코프"
    // TDZ 발생생
    // console.log(letVariable); // ReferenceError
    // console.log(constVariable); // ReferenceError
}
testScope();
```

### 스코프 차이가 호이스팅에 미치는 영향
호이스팅이란 변수와 함수 선언이 해당 스코프의 최상단으로 끌어올려지는 현상을 의미한다.

1. var의 호이스팅<br>
선언이 호이스팅되지만 초기화는 호이스팅되지 않는다. 선언 전에 접근하면 undefined가 반환된다.

2. let과 const의 호이스팅 <br>
선언은 호이스팅되지만, 초기화 전에 접근하면 **Temporal Dead Zone(TDZ)** 로 인해 ReferenceError가 발생한다.
    - Temporal Dead Zone(TDZ) : et과 const로 선언된 변수를 사용하기 전에 접근할 수 없는 상태를 설명하는 개념

----

## 렉시컬 스코프와 클로저
1. 렉시컬 스코프 <br>
    렉시컬 스코프는 함수가 정의된 위치에 따라 상위 스코프가 결정된다. 실행 위치와 관계없이 함수의 선언 위치에 따라 스코프가 고정된다.

2. 클로저<br>
    클로저는 함수가 선언된 렉시컬 환경을 기억하고 있는 함수다. 함수가 외부 스코프의 변수에 접근할 수 있는 메커니즘을 제공한다.

```js
function outerFunction() {
    const outerVariable = "Outer";

    function innerFunction() {
        console.log(outerVariable); // "Outer"
    }

    return innerFunction;
}

const myFunction = outerFunction();
myFunction();
```

-----

## this와 실행 컨텍스트
1. this의 동작 원리
    - 전역 컨텍스트: 전역 객체(global in Node.js)를 참조한다.
    - 객체 메서드: 호출한 객체를 참조한다.
    - 화살표 함수: this는 렉시컬 스코프에 의해 결정된다.

2. 실행 컨텍스트
    - 실행 컨텍스트는 코드가 실행되는 환경 정보로, this, 변수 객체, 외부 환경 정보 등이 포함된다.

### 표현식

```js
const obj = {
    name: "Object",
    regularFunction: function () {
        console.log(this.name);
    },
    arrowFunction: () => {
        console.log(this.name);
    },
};

obj.regularFunction(); // "Object"
obj.arrowFunction(); // undefined
```

#### var를 사용하면 안 되는 이유

1. 스코프의 혼란 <br>
var는 함수 스코프를 가지므로 블록 스코프를 지원하지 않는다. 이는 의도치 않은 변수 값 변경을 초래할 수 있다.

2. 호이스팅 문제 <br>
선언 전에 접근하면 undefined로 평가되어 디버깅이 어려워진다.

3. 대체 가능성 <br>
최신 자바스크립트에서는 let과 const로 대부분의 상황을 해결할 수 있다.