/*
스토리: 사용자 데이터 보호와 로그 관리
사용자 데이터를 관리하는 객체를 Proxy로 보호하고, Reflect를 사용해 모든 작업을 기록한다.
*/

// 1. Proxy를 사용한 데이터 보호
const sensitiveDataHandler = {
    // 속성 접근을 가로채는 메서드
    get(target, property) {
        // 보호된 속성(이름이 "_"로 시작하는)에 접근하려고 할 경우
        if (property.startsWith("_")) {
            return "접근 권한이 없습니다."; // 접근 제한 메시지 반환
        }
        // 그렇지 않으면 기본 동작을 수행
        return Reflect.get(target, property);
    },
    // 속성 설정을 가로채는 메서드
    set(target, property, value) {
        // 보호된 속성에 수정하려고 할 경우
        if (property.startsWith("_")) {
            console.log("보호된 데이터는 수정할 수 없습니다."); // 로그 메시지 출력
            return false; // 수정 실패
        }
        // 그렇지 않으면 기본 동작을 수행
        return Reflect.set(target, property, value);
    }
};

// 사용자 데이터 객체 생성 및 Proxy 적용
const userData = new Proxy(
    { _password: "1234", name: "홍길동" }, // 초기 데이터
    sensitiveDataHandler // 핸들러 적용
);

// 사용자 데이터 접근 및 수정 시도
console.log(userData.name); // "홍길동" 출력
console.log(userData._password); // "접근 권한이 없습니다." 출력
userData._password = "5678"; // "보호된 데이터는 수정할 수 없습니다." 로그 출력

/*
결과 설명:
보호된 속성은 접근 및 수정이 제한된다.
*/



// 2. Reflect로 로그 기록
const logHandler = {
    // 속성 접근을 가로채는 메서드
    get(target, property) {
        console.log(`${property} 속성을 읽었습니다.`); // 로그 메시지 출력
        return Reflect.get(target, property); // 기본 동작 수행
    },
    // 속성 설정을 가로채는 메서드
    set(target, property, value) {
        console.log(`${property} 속성을 ${value}로 설정했습니다.`); // 로그 메시지 출력
        return Reflect.set(target, property, value); // 기본 동작 수행
    }
};

// 제품 데이터 객체 생성 및 Proxy 적용
const product = new Proxy({ name: "Laptop", price: 1000 }, logHandler);
product.name = "Smartphone"; // 속성 설정 시 로그 기록
console.log(product.name); // 속성 접근 시 로그 기록

/*
결과 설명:
Reflect를 통해 기본 동작을 유지하며 로그를 남긴다.
*/



/*
3. Proxy로 유효성 검사와 Reflect 활용
*/
const validatorHandler = {
    // 속성 설정을 가로채는 메서드
    set(target, property, value) {
        // 'age' 속성에 대해 숫자인지 검사
        if (property === "age" && typeof value !== "number") {
            throw new TypeError("나이는 숫자여야 합니다."); // 오류 발생
        }
        // 'age' 속성이 0 미만인지 검사
        if (property === "age" && value < 0) {
            throw new RangeError("나이는 0 이상이어야 합니다."); // 오류 발생
        }
        return Reflect.set(target, property, value); // 기본 동작 수행
    }
};

// 개인 데이터 객체 생성 및 Proxy 적용
const person = new Proxy({}, validatorHandler);
person.name = "홍길동"; // 정상적으로 'name' 속성 설정
person.age = 25; // 정상적으로 'age' 속성 설정
// person.age = "스물다섯"; // 오류: TypeError 발생
// person.age = -5; // 오류: RangeError 발생
console.log(person); // 최종 객체 출력

/*
결과 설명:
Reflect를 활용해 유효성 검사를 추가하고 객체의 기본 동작을 유지한다.
*/
