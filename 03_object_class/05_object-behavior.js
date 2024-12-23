/*
# 문법 설명
프로퍼티 플래그는 객체의 동작을 세부적으로 제어한다. 
이를 사용해 읽기 전용 프로퍼티를 만들거나, 반복문에 나타나지 않도록 설정할 수 있다.
*/

/*
스토리: 회원 관리 시스템
온라인 쇼핑몰의 회원 관리 시스템에서 회원 정보를 다룬다. 
회원 객체를 생성하고, 동작을 프로퍼티 플래그와 getter/setter로 제어하며, 특정 조건에서 원시형으로 변환한다.
*/


// 1. 기본 객체 프로퍼티와 설명자
let user = { name: "Alice", age: 25 };
// Object.defineProperty 메서드를 사용하여 user 객체에 "role"이라는 새로운 속성을 정의한다.
Object.defineProperty(user, "role", {
    value: "admin",        // role 속성의 값은 "admin"으로 설정
    writable: false,       // writable이 false이므로, 이 속성의 값을 변경할 수 없음
    enumerable: false,     // enumerable이 false이므로, 이 속성은 for...in 루프와 Object.keys()에서 열거되지 않음
    configurable: true     // configurable이 true이므로, 이 속성의 특성을 변경하거나 삭제할 수 있음
});

console.log(user.role); // "admin"
user.role = "user"; // 변경되지 않음
console.log(Object.keys(user)); // ["name", "age"]

/*
결과 설명

role 프로퍼티는 쓰기 불가능하고, 열거되지 않는다.
Object.keys 결과에 role은 포함되지 않는다.
*/





// 2. getter와 setter로 사용자 정의 프로퍼티
let member = {
    firstName: "Alice",
    lastName: "Smith",
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    },
    set fullName(value) {
        [this.firstName, this.lastName] = value.split(" ");
    }
};

console.log(member.fullName); // "Alice Smith"
member.fullName = "Bob Johnson";
console.log(member.firstName); // "Bob"
console.log(member.lastName); // "Johnson"


/*
결과 설명

fullName은 getter와 setter로 동작하여, 읽기와 쓰기를 커스터마이징한다.
*/





// 3. 객체의 원시형 변환
let product = {
    name: "Laptop",
    price: 1200,
    toString() {
        return `${this.name} - $${this.price}`;
    },
    valueOf() {
        return this.price;
    }
};

console.log(String(product)); // "Laptop - $1200"
console.log(Number(product)); // 1200






//  고급 활용: 프로퍼티 설명자와 캡슐화
let admin = { name: "Admin" };
Object.defineProperty(admin, "permissions", {
    value: ["read", "write"],
    writable: true,
    enumerable: false,
    configurable: false
});
// permissions는 admin 객체에 정의된 속성으로, 이 속성은 사용자의 권한을 나타내는 배열
console.log(admin.permissions); // ["read", "write"]
admin.permissions.push("delete");
console.log(admin.permissions); // ["read", "write", "delete"]
console.log(Object.keys(admin)); // ["name"]
