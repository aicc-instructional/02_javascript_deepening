# 자료구조와 데이터 관리
## 배열 메서드 심화 (find, some, every, reduce)
배열은 데이터를 저장하고 관리하는 중요한 자료구조다. 배열 메서드 `find`, `some`, `every`, `reduce`는 데이터를 검색, 확인, 축약하는 데 활용된다.

---

## 배열 메서드 설명
- **find**: 조건에 맞는 첫 번째 요소를 반환한다.
- **some**: 배열 내 조건에 맞는 요소가 하나라도 있으면 `true`를 반환한다.
- **every**: 배열 내 모든 요소가 조건에 맞으면 `true`를 반환한다.
- **reduce**: 배열을 순회하며 값을 축약한다.

---

## 표현식
```javascript
const numbers = [10, 20, 30, 40, 50];

console.log(numbers.find((num) => num > 25)); // 30
console.log(numbers.some((num) => num > 45)); // true
console.log(numbers.every((num) => num > 5)); // true
console.log(numbers.reduce((acc, num) => acc + num, 0)); // 150
```

------

## 맵과 셋
### Map과 객체의 차이점
Map은 키-값 쌍을 저장하는 자료구조다. 객체와 비슷하지만, 다음과 같은 차이가 있다:
- **Map**: 키에 모든 데이터 타입을 사용할 수 있다 (예: 객체, 함수 등).
- **Object**: 키는 문자열 또는 심볼(Symbol)만 가능하다.
- **Map**: 삽입된 순서를 유지한다.
- **Object**: 순서가 보장되지 않는다.

<img src="../00_img/03-8_map.png"/>

---

## 표현식 (Map과 Object의 차이)
```javascript
const map = new Map();
map.set("key1", "value1");
map.set({ id: 1 }, "value2");

console.log(map.get("key1")); // "value1"
console.log(map.size); // 2

const obj = {};
obj["key1"] = "value1";
obj[{ id: 1 }] = "value2";

console.log(obj["key1"]); // "value1"
console.log(obj); // { key1: 'value1', '[object Object]': 'value2' }
```


### Set과 배열의 차이점
Set은 고유한 값만 저장할 수 있는 자료구조다.
- Set: 중복 값을 자동으로 제거한다.
- Array: 중복 값이 허용된다.

<img src="../00_img/set.jpg"/>

#### 표현식 (Set과 배열의 차이)
```javascript
const set = new Set([1, 2, 2, 3]);
console.log(set); // Set { 1, 2, 3 }

const arr = [1, 2, 2, 3];
console.log(arr); // [1, 2, 2, 3]
```


### WeakMap과 WeakSet의 특징
WeakMap과 WeakSet은 객체 전용이며, 참조가 없으면 가비지 컬렉션(GC)으로 자동 제거된다.
- WeakMap: 키는 반드시 객체여야 하며, 메모리 관리를 효율적으로 할 수 있다.
- WeakSet: 객체를 중복 없이 저장하지만, 배열이나 원시값은 저장할 수 없다.

#### Map, Set과 WeakMap과 WeakSet의 차이
1. 메모리 관리
    - WeakMap 및 WeakSet:
        - 키나 값이 객체인 경우, 해당 객체에 대한 참조가 없으면 가비지 컬렉션(GC)에서 자동으로 제거된다.
        - 이는 메모리 누수를 방지하는 데 도움이 된다. 예를 들어, WeakMap의 키가 더 이상 사용되지 않으면, 그와 연결된 값도 자동으로 제거된다.
    - 일반 Map 및 Set:
        - 객체를 키로 사용하더라도, 해당 객체에 대한 참조가 남아 있는 한 메모리에서 자동으로 제거되지 않는다.
        - 사용하지 않는 객체에 대한 참조가 여전히 존재하면 메모리 누수가 발생할 수 있다.
2. 성능
    - WeakMap 및 WeakSet:
        - 가비지 컬렉션이 더 효과적으로 이루어지므로, 메모리를 더 효율적으로 사용할 수 있다.
        - 대규모 애플리케이션에서 많은 객체를 다룰 때 성능 향상이 있을 수 있다.

    - 일반 Map 및 Set:
        - 객체가 더 이상 필요하지 않더라도, 명시적으로 삭제하지 않으면 메모리를 차지하게 된다.

----

# Proxy와 Reflect
## Proxy의 개념과 기본 사용법
**Proxy**는 다른 객체에 대한 기본 동작(예: 속성 조회, 함수 호출 등)을 가로채고 정의할 수 있는 기능을 제공한다. Proxy를 사용하면 객체의 동작을 커스터마이즈하고, 감시하며, 수정할 수 있다. ES6(ECMAScript 2015)에서 도입되었다.

### 주요 특징
- 가로채기: Proxy는 특정 객체에 대한 모든 작업을 가로채고, 이를 정의된 핸들러에 따라 제어할 수 있다. 예를 들어, 속성을 읽거나 쓸 때, 메서드를 호출할 때, 객체의 프로퍼티를 삭제할 때 등의 동작을 가로챌 수 있다.

- 핸들러: Proxy는 두 개의 인자를 받는다. 첫 번째는 타겟(target) 객체이고, 두 번째는 핸들러(handler) 객체이다. 핸들러 객체는 다양한 동작을 정의하는 메서드를 포함한다.

- 유연성: Proxy를 통해 객체의 기본 동작을 변경하거나 추가적인 기능을 구현할 수 있다. 예를 들어, 데이터 유효성 검사, 로그 기록, 접근 제한 등을 손쉽게 구현할 수 있다.


### 주요 메서드 (핸들러)
- get(target, property): 속성 조회 시 호출됩니다.
- set(target, property, value): 속성 설정 시 호출됩니다.
- has(target, property): in 연산자 사용 시 호출됩니다.
- deleteProperty(target, property): 속성 삭제 시 호출됩니다.
- apply(target, thisArg, arguments): 함수 호출 시 호출됩니다.
- construct(target, args): 생성자 호출 시 호출됩니다.

## 표현식 (Proxy 기본 구조)
```javascript
const handler = {
    get(target, property) {
        return property in target ? target[property] : "해당 속성이 존재하지 않습니다.";
    },
    set(target, property, value) {
        if (property === "age" && value < 0) {
            console.log("나이는 0 이상이어야 합니다.");
            return false;
        }
        target[property] = value;
        return true;
    }
};

const person = new Proxy({}, handler);
person.name = "홍길동"; // 속성 추가
person.age = -5; // 나이 검증 실패
console.log(person.name); // "홍길동"
console.log(person.age); // undefined
```


## Reflect를 활용한 객체 속성 관리
Reflect는 JavaScript에서 제공하는 내장 객체로, 메타프로그래밍과 관련된 작업을 수행할 수 있는 정적 메서드 모음이다.<br> Reflect는 ES6(ECMAScript 2015)에서 도입되었으며, 주로 객체의 속성에 대한 작업을 더 쉽게 하고, 프로퍼티 접근 및 수정, 함수 호출 등을 다루는 데 사용된다.

### 주요 메서드
- Reflect.get(target, propertyKey): 객체의 속성을 가져온다.
- Reflect.set(target, propertyKey, value): 객체의 속성을 설정한다.
- Reflect.has(target, propertyKey): 객체에 특정 속성이 존재하는지를 확인한다.
- Reflect.deleteProperty(target, propertyKey): 객체의 속성을 삭제한다.
- Reflect.apply(target, thisArgument, argumentsList): 함수를 호출한다.
- Reflect.construct(target, argumentsList): 생성자를 호출하여 새 객체를 만든다.

```js
const obj = { a: 1, b: 2 };

// Reflect.get 사용
console.log(Reflect.get(obj, 'a')); // 1

// Reflect.set 사용
Reflect.set(obj, 'c', 3);
console.log(obj.c); // 3

// Reflect.has 사용
console.log(Reflect.has(obj, 'b')); // true

// Reflect.deleteProperty 사용
Reflect.deleteProperty(obj, 'a');
console.log(obj.a); // undefined

// Reflect.apply 사용
function sum(x, y) {
    return x + y;
}
console.log(Reflect.apply(sum, null, [1, 2])); // 3

// Reflect.construct 사용
function Person(name) {
    this.name = name;
}
const person = Reflect.construct(Person, ['Alice']);
console.log(person.name); // Alice
```