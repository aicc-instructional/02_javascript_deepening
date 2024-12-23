/*
JavaScript에서 모든 객체는 __proto__ 속성을 통해 프로토타입에 접근할 수 있다.
프로토타입 체인을 통해 메서드나 속성을 검색할 수 있으며,
이는 코드의 재사용성을 높이고, 객체 간의 관계를 정의하는 데 중요한 역할을 한한다.
*/ 

// Shape 생성자 함수 정의
// 이 함수는 type 매개변수를 받아서 해당 속성을 가진 객체를 생성한다.
function Shape(type) {
    this.type = type; // type 속성을 설정
}

// Shape의 프로토타입에 describe 메서드를 추가
// 프로토타입은 객체의 속성과 메서드를 공유하는데 사용된다.
// 모든 Shape 인스턴스는 동일한 describe 메서드를 공유하여 메모리를 절약한다.
Shape.prototype.describe = function() {
    console.log(`This is a ${this.type}`);
};

// Shape 생성자를 사용하여 circle 객체를 생성
// "circle"이라는 type 속성을 가진 Shape 객체이다.
const circle = new Shape("circle");

// circle 객체의 describe 메서드를 호출하여 type을 출력한다.
circle.describe(); // "This is a circle"

