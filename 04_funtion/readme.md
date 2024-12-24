# 고급 함수 개념
## 함수 바인딩 (bind, call, apply)
자바스크립트에서 함수의 `this`를 명시적으로 바인딩하거나, 동적으로 호출 시점에서 변경하기 위해 `bind`, `call`, `apply` 메서드를 사용한다.

### 표현식
1. `bind`: 새로 바인딩된 함수를 반환한다.
2. `call`: 호출 시 즉시 실행하며, 첫 번째 인자로 `this`를 지정한다.
3. `apply`: `call`과 유사하나, 두 번째 인자로 배열 형태의 인수를 전달한다.

```javascript
const user = {
    name: "Alice",
    greet: function (greeting) {
        console.log(`${greeting}, ${this.name}`);
    },
};

const anotherUser = { name: "Bob" };

// bind
const boundGreet = user.greet.bind(anotherUser, "Hello");
boundGreet(); // "Hello, Bob"

// call
user.greet.call(anotherUser, "Hi"); // "Hi, Bob"

// apply
user.greet.apply(anotherUser, ["Good Morning"]); // "Good Morning, Bob"
```

- `bind`는 함수를 재사용하거나 이벤트 핸들러에 전달할 때 유용하다.
- `call`과 `apply`는 특정 맥락에서 한 번 호출할 때 적합하다.

-----

## 재귀와 스택
재귀는 함수가 자기 자신을 호출하는 방식이다. 반복 작업을 간결하게 처리할 수 있다. 단, 재귀는 호출 스택을 사용하므로, 스택 오버플로우를 주의해야 한다.

<img src="../00_img/재귀함수.jpg"/>

1. 재귀 함수의 기본 구조:
   - 종료 조건(base case)을 명시해 무한 호출을 방지.
   - 반복적으로 자기 자신을 호출하며, 종료 조건에 도달하면 호출을 끝낸다.
    ```javascript
    function factorial(n) {
        if (n === 1) return 1;
        return n * factorial(n - 1);
    }
    console.log(factorial(5)); // 120
    ```
2. 스택 동작 원리: 재귀 호출 시, 함수 호출이 스택에 쌓였다가 가장 마지막에 호출된 함수부터 실행된다(LIFO).
<img src="../00_img/stack.png"/>


-------


## 클로저와 메모이제이션
클로저는 함수와 그 함수가 선언된 렉시컬 환경의 조합으로, 함수가 외부 함수의 스코프에 접근할 수 있게 한다. 이를 통해 데이터 보호, 상태 유지, 캐싱과 같은 실무 문제를 해결할 수 있다.

### 표현식
```javascript
function createCounter() {
    let count = 0; // 상태를 유지하는 변수
    return function () {
        count++;
        return count;
    };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
```


---

# 고차 함수
## 배열 메서드 활용 심화
배열 메서드 `map`, `filter`, `reduce`, `find`는 데이터를 변형하거나 특정 조건에 따라 필터링, 축소, 탐색하는 데 사용된다. 이 메서드는 모두 고차 함수로, 다른 함수를 인수로 받아 동작을 제어한다.

### 표현식
```javascript
// 주어진 배열
const numbers = [1, 2, 3, 4, 5];

// map: 각 요소에 2를 곱한 새로운 배열 생성
// 역할: 배열의 각 요소를 변형하여 새로운 배열을 만든다.
const doubled = numbers.map((num) => num * 2); 
// 결과: [2, 4, 6, 8, 10]

// filter: 3보다 큰 요소만 포함한 배열 생성
// 역할: 주어진 조건을 만족하는 요소만 필터링하여 새로운 배열을 만든다.
const filtered = numbers.filter((num) => num > 3); 
// 결과: [4, 5]

// reduce: 모든 요소를 합산
// 역할: 배열의 모든 요소를 하나의 값으로 축약합니다. 여기서는 합계를 계산한다.
const sum = numbers.reduce((acc, num) => acc + num, 0); 
// 결과: 15 (1 + 2 + 3 + 4 + 5)

// find: 배열에서 첫 번째로 3보다 큰 요소 찾기
// 역할: 조건을 만족하는 첫 번째 요소를 찾고, 해당 요소를 반환합니다. 없으면 undefined를 반환한다.
const firstGreaterThanThree = numbers.find((num) => num > 3); 
// 결과: 4


console.log(doubled, filtered, sum, firstGreaterThanThree);
// [2, 4, 6, 8, 10] [4, 5] 15 4
```



## compose와 pipe 패턴
Compose와 Pipe는 함수형 프로그래밍에서 여러 함수를 조합하여 복잡한 작업을 간결하게 표현하는 패턴이다. <br>
두 패턴 모두 함수의 출력을 다음 함수의 입력으로 사용하는 방식으로, 함수의 조합을 통해 코드의 가독성을 높이고 재사용성을 증대시킨다.

### compose 패턴
Compose는 함수를 오른쪽에서 왼쪽으로 실행하는 방식이다. 즉, 마지막에 정의한 함수가 먼저 실행되고, 그 결과가 이전 함수의 입력으로 전달된다.

```js
const compose =
    (...fns) =>
    (value) =>
        fns.reduceRight((acc, fn) => fn(acc), value);
```
- ...fns는 여러 개의 함수를 배열 형태로 받는다.
- reduceRight 메서드를 사용하여 배열의 마지막 요소부터 첫 번째 요소까지 함수를 차례로 실행한다.
- 초기값으로 주어진 value가 첫 번째 함수의 인자로 전달되며, 각 함수는 이전 함수의 결과를 입력으로 받s는다.

```js
const add = (x) => x + 1;  // x에 1을 더하는 함수
const double = (x) => x * 2; // x를 2배로 만드는 함수

const composedFunction = compose(double, add);
console.log(composedFunction(3)); // 8
```

### 2. Pipe 패턴
Pipe는 함수를 왼쪽에서 오른쪽으로 실행하는 방식이다. 즉, 첫 번째 함수가 먼저 실행되고, 그 결과가 다음 함수의 입력으로 전달된다.
```js
const pipe =
    (...fns) =>
    (value) =>
        fns.reduce((acc, fn) => fn(acc), value);
```
- ...fns는 여러 개의 함수를 배열 형태로 받는다.
- reduce 메서드를 사용하여 배열의 첫 번째 요소부터 마지막 요소까지 함수를 차례로 실행한다.
- 초기값으로 주어진 value가 첫 번째 함수의 인자로 전달되며, 각 함수는 이전 함수의 결과를 입력으로 받는다.

``` js
const pipedFunction = pipe(add, double);
console.log(pipedFunction(3)); // 8
```


#### 결론
Compose와 Pipe 패턴은 함수형 프로그래밍의 강력한 도구로, 여러 함수를 조합하여 복잡한 작업을 간결하게 표현할 수 있다. 이 두 패턴을 적절히 활용하면 코드의 가독성, 재사용성, 유지보수성을 높일 수 있다. 


----
# 비동기 함수와 처리 흐름
## Promise 체인의 심화 활용
Promise는 비동기 작업을 관리하기 위한 객체로, 비동기 함수의 결과를 `then`, `catch`, `finally` 메서드 체인으로 처리한다. <br>
Promise 체인을 사용하면 복잡한 비동기 작업의 흐름을 가독성 있게 작성할 수 있다.


### 표현식
```javascript
fetch("https://api.example.com/data")
  .then((response) => response.json()) // 데이터를 JSON으로 파싱
  .then((data) => {
    console.log("Fetched Data:", data); // 데이터 처리
    return data.id;
  })
  .catch((error) => console.error("Error occurred:", error)) // 에러 처리
  .finally(() => console.log("Fetch process completed")); // 작업 완료 처리
```

## async/await와 동시성 처리
`async`와 `await`는 JavaScript에서 비동기 처리를 동기적인 문법으로 작성할 수 있게 한다. `async` 함수는 항상 `Promise`를 반환하며, `await` 키워드는 `Promise`가 해결될 때까지 실행을 중단하고 결과를 반환한다.

---

### 표현식
```javascript
async function fetchData() {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    console.log("Fetched Data:", data);
}

fetchData();
```
- async: 함수 앞에 붙여 비동기 함수를 정의하며, 항상 Promise를 반환한다.
- await: Promise가 해결되기를 기다리며, 결과를 반환한다. await은 async 함수 내에서만 사용 가능하다.


### 에러 처리
비동기 함수에서 에러를 처리하기 위해 `try-catch`와 `finally`를 사용한다. 
- **`try-catch`**: 비동기 코드 실행 중 발생하는 에러를 포착하고 처리한다.
- **`finally`**: 에러 발생 여부와 관계없이 항상 실행되는 코드를 작성할 수 있다.


```javascript
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched Data:", data);
    } catch (error) {
        console.error("Error occurred:", error.message);
    } finally {
        console.log("Fetch operation completed.");
    }
}

fetchData("https://api.example.com/data");
```
- try 블록: 코드 실행을 시도하며, 오류 발생 시 즉시 중단하고 catch 블록으로 이동.
- catch 블록: 에러를 포착하여 적절히 처리. 에러 객체를 통해 상세 정보 확인 가능.
- finally 블록: 에러 발생 여부와 관계없이 실행. 공통 후속 작업에 적합.


