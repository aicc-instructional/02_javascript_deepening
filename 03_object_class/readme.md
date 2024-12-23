# 객체 심화
## 객체 리터럴과 속성 접근
객체는 JavaScript에서 가장 기본적인 데이터 구조 중 하나로, 키-값 쌍으로 구성된다. 이를 통해 다양한 데이터를 구조화하고 관리할 수 있다. 객체는 중괄호 {}를 사용하여 생성할 수 있으며, 각 속성은 이름(키)과 값으로 이루어져 있다.

### 표현식
```javascript
const person = {
    name: "John",
    age: 30,
    greet: function() {
        console.log(`Hello, my name is ${this.name}`);
    },
};

console.log(person.name); // "John"
console.log(person["age"]); // 30
person.greet(); // "Hello, my name is John"
```
- 속성 접근: 객체의 속성에 접근할 때는 점 표기법(`person.name`)이나 대괄호 표기법(`person["age"]`)을 사용할 수 있다.
- 메서드: 객체 내부에 정의된 함수는 메서드라고 하며, `this` 키워드를 사용하여 객체의 속성에 접근할 수 있다.


### 객체 생성 방법
1. 객체 리터럴 <br>
객체 리터럴은 {}로 생성하며, 가장 간단한 방식이다.

2. 생성자 함수 <br>
function 키워드를 사용하여 객체를 생성할 수 있다.

3. 클래스 <br>
ES6에서 도입된 문법으로 객체를 생성하고 관리한다.

4. Object.create <br>
주어진 프로토타입 객체를 기반으로 새로운 객체를 생성한다.

### 표현식

```js
// 생성자 함수
function Person(name, age) {
    this.name = name;
    this.age = age;
}

const person1 = new Person("Alice", 25);
console.log(person1.name); // "Alice"

// 클래스
class Car {
    constructor(make, model) {
        this.make = make;
        this.model = model;
    }
    displayInfo() {
        console.log(`Car: ${this.make} ${this.model}`);
    }
}

const car = new Car("Toyota", "Camry");
car.displayInfo(); // "Car: Toyota Camry"

// Object.create
const prototype = { type: "vehicle" };
const bike = Object.create(prototype);
bike.make = "Yamaha";
console.log(bike.type); // "vehicle"
```

- 생성자 함수: Person 생성자 함수는 name과 age 속성을 가지는 객체를 생성한다. new 키워드를 사용하여 person1 객체를 생성한다.
- 클래스: Car 클래스는 make와 model 속성을 가지며, displayInfo 메서드를 통해 정보를 출력한다. new 키워드를 사용하여 car 인스턴스를 생성한다.
- Object.create: 기존 객체를 프로토타입으로 하여 새로운 객체를 생성한다. bike 객체는 prototype의 속성을 상속받는다.

----

## 프로토타입과 프로토타입 체인
### 프로토타입
JavaScript의 모든 객체는 다른 객체(프로토타입)와 연결되어 있습니다. 이 연결은 `__proto__` 속성을 통해 이루어진다. 객체는 프로토타입을 통해 속성과 메서드를 상속받을 수 있다.

### 프로토타입 체인
객체에서 속성을 찾을 때, JavaScript는 먼저 객체 자신에서 해당 속성을 검색하고, 없으면 프로토타입 체인을 따라 올라가며 검색한다. 이 과정에서 최상위 객체인 Object.prototype에 도달할 때까지 계속된다.

```js
function Animal(name) {
    this.name = name;
}

Animal.prototype.speak = function() {
    console.log(`${this.name} makes a noise`);
};

const dog = new Animal("Dog");
dog.speak(); // "Dog makes a noise"
```

----

## 심볼(Symbol)과 객체 속성

### 심볼
Symbol은 ES6에서 도입된 고유하고 변경 불가능한 값을 생성하는 데이터 타입이다. 주로 객체 속성의 키로 사용되며, 다른 속성과 충돌할 위험이 없다.


### 표현식
```js
const sym = Symbol("uniqueKey");
const obj = {
    [sym]: "hiddenValue",
};

console.log(obj[sym]); // "hiddenValue"
```
- 고유한 키: Symbol을 사용하여 생성된 sym은 항상 고유한 값을 가지므로, 다른 속성과 겹치지 않습니다.
- 대괄호 표기법: 객체 속성을 추가할 때 대괄호 표기법을 사용하여 sym을 키로 사용합니다.

----

## 객체 병합과 복사
1. Object.assign  <br>
Object.assign 메서드는 하나 이상의 출처 객체의 모든 속성을 대상 객체에 복사한다. 이를 통해 객체를 병합하거나 복사할 수 있다.

2. 스프레드 연산자 <br>
스프레드 연산자(...)를 사용하면 객체를 간편하게 병합하거나 복사할 수 있다. 이는 가독성을 높이고, 코드의 간결함을 더한다.

### 표현식
```js
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };

// Object.assign
const merged1 = Object.assign({}, obj1, obj2);
console.log(merged1); // { a: 1, b: 3, c: 4 }

// 스프레드 연산자
const merged2 = { ...obj1, ...obj2 };
console.log(merged2); // { a: 1, b: 3, c: 4 }
```


-----


# 클래스와 상속
## ES6 클래스와 메서드
ES6 클래스는 객체 지향 프로그래밍을 지원하는 문법으로, 객체 생성과 상속을 간결하게 작성할 수 있다. 클래스는 `constructor`를 통해 초기화되며, 메서드를 정의할 수 있다.


### 주요 특징
1. **`constructor` 메서드**: 객체를 초기화하는 생성자 함수로, 클래스 내에서 한 번만 정의할 수 있다.
2. **프로토타입 메서드**: 클래스 내부에서 정의된 메서드는 자동으로 해당 클래스의 프로토타입에 추가된다.



### 표현식
```javascript
class Animal {
    constructor(name) {
        this.name = name;
    }
    speak() {
        console.log(`${this.name} makes a noise.`);
    }
}

const dog = new Animal("Dog");
dog.speak(); // "Dog makes a noise."
```


## 클래스 상속과 메서드 오버라이딩
**상속(Inheritance)**은 객체 지향 프로그래밍의 핵심 개념으로, 기존 클래스를 확장해 새로운 클래스를 생성하는 기능을 제공한다. 자바스크립트에서는 extends 키워드를 사용해 상속을 구현할 수 있다.

### 메서드 오버라이딩
하위 클래스는 상위 클래스의 메서드를 재정의(override)해 특정 동작을 변경하거나 확장할 수 있다.


```js
class Animal {
    constructor(name) {
        this.name = name;
    }
    speak() {
        console.log(`${this.name} makes a noise.`);
    }
}

class Dog extends Animal {
    speak() {
        console.log(`${this.name} barks.`);
    }
}

const dog = new Dog("Buddy");
dog.speak(); // "Buddy barks."

```

### super 키워드와 부모 클래스 호출
super는 부모 클래스의 생성자(constructor)나 메서드에 접근하기 위해 사용된다.

1. 생성자 호출: 하위 클래스의 생성자는 super()를 호출해 부모 클래스의 생성자를 실행해야 한다.
2. 메서드 호출: 부모 클래스의 메서드를 호출할 수 있다.

```js
class Animal {
    constructor(name) {
        this.name = name;
    }
    speak() {
        console.log(`${this.name} makes a noise.`);
    }
}

class Cat extends Animal {
    constructor(name, color) {
        super(name); // 부모 클래스의 생성자 호출
        this.color = color;
    }
    speak() {
        super.speak(); // 부모 클래스의 메서드 호출
        console.log(`${this.name} meows.`);
    }
}

const cat = new Cat("Kitty", "white");
cat.speak();
// "Kitty makes a noise."
// "Kitty meows."


```

### 정적 메서드와 정적 속성
정적 메서드와 속성은 클래스의 인스턴스가 아닌 클래스 자체에서 호출된다. 유틸리티 함수나 공통 동작을 정의할 때 유용하다.

1. 정적 메서드 정의: static 키워드를 사용한다.
2. 정적 메서드 호출: 인스턴스가 아닌 클래스 이름을 통해 호출한다.

```js
class MathUtil {
    static add(a, b) {
        return a + b;
    }
    static subtract(a, b) {
        return a - b;
    }
}

console.log(MathUtil.add(5, 3)); // 8
console.log(MathUtil.subtract(5, 3)); // 2

```

#### 정리
1. 클래스와 메서드: 클래스를 사용해 객체를 정의하고, 생성자와 메서드를 통해 초기화와 동작을 설정한다.
2. 상속과 오버라이딩: 클래스를 확장하고, 필요한 경우 메서드를 재정의해 동작을 변경한다.
3. super 키워드: 부모 클래스의 생성자와 메서드를 호출해 기능을 확장한다.
4. 정적 메서드: 공통 동작을 클래스 자체에서 정의하고 호출한다.


-----


# 객체의 동작 원리
## 객체 프로퍼티 플래그와 설명자
자바스크립트의 객체 프로퍼티는 기본적인 값 외에 추가적인 속성을 가진다. 이를 프로퍼티 플래그(Property Flag)라고 하며, `Object.getOwnPropertyDescriptor`를 통해 확인할 수 있다.

### 프로퍼티 플래그
- **writable**: 값을 변경할 수 있는지 여부.
- **enumerable**: 반복문에서 열거 가능한지 여부.
- **configurable**: 프로퍼티 삭제나 플래그 변경이 가능한지 여부.

### 표현식
```javascript
let user = { name: "John" };
let descriptor = Object.getOwnPropertyDescriptor(user, "name");
console.log(descriptor);
// { value: 'John', writable: true, enumerable: true, configurable: true }
```

- 프로퍼티 플래그는 객체의 동작을 세부적으로 제어한다. 
- 이를 사용해 읽기 전용 프로퍼티를 만들거나, 반복문에 나타나지 않도록 설정할 수 있다.


### 프로퍼티의 getter와 setter
getter와 setter는 객체의 프로퍼티를 읽고 설정하는 메서드를 정의하는 데 사용된다. 계산된 값을 반환하거나, 설정 값을 가공하는 데 유용하다.

```js
let user = {
    firstName: "John",
    lastName: "Doe",
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    },
    set fullName(value) {
        [this.firstName, this.lastName] = value.split(" ");
    }
};

console.log(user.fullName); // "John Doe"
user.fullName = "Jane Smith";
console.log(user.firstName); // "Jane"
console.log(user.lastName); // "Smith"
```
- getter와 setter는 객체의 프로퍼티에 대한 논리적 접근을 캡슐화한다. 
- getter는 읽기 작업을, setter는 쓰기 작업을 제어한다.


### 객체를 원시형으로 변환
객체를 원시 값(문자열 또는 숫자)으로 변환할 때, toString과 valueOf 메서드가 사용된다. 이 과정을 사용자 정의하여 원하는 동작을 구현할 수 있다.

```js
let user = {
    name: "John",
    age: 30,
    toString() {
        return `{name: "${this.name}", age: ${this.age}}`;
    },
    valueOf() {
        return this.age;
    }
};

console.log(String(user)); // "{name: "John", age: 30}"
console.log(Number(user)); // 30
```

- `toString`은 객체를 문자열로 변환하며, `valueOf`는 숫자 변환에 사용된다. 
- 객체를 원시형으로 변환하는 과정을 직접 정의할 수 있다.
