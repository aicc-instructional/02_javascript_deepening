// 1. Map으로 주문 관리
const orderMap = new Map();
orderMap.set("order1", { product: "Laptop", price: 1000 });
orderMap.set("order2", { product: "Phone", price: 700 });


// 특정 주문 검색
console.log("변경 전 order1:", orderMap.get("order1")); // 변경 전 값 출력

// order1의 값을 변경
orderMap.set("order1", null);

// 변경된 값 확인
console.log("변경 후 order1:", orderMap.get("order1")); // 변경 후 값 출력


// 모든 주문 순회
orderMap.forEach((value, key) => {
    if(value){
        console.log(`${key}: ${value.product}, ${value.price} USD`);
    }
});

/*
결과 설명:
Map으로 주문 데이터를 관리하며 효율적으로 순회.
*/




// 2. Set으로 고유한 상품 카테고리 관리
const categories = new Set();
categories.add("Electronics");
categories.add("Clothing");
categories.add("Electronics"); // 중복 제거

console.log(categories);

// Set 순회
categories.forEach((category) => {
    console.log(`카테고리: ${category}`);
});

/*
결과 설명:
Set으로 중복 없는 카테고리 데이터를 관리.
*/




// 3. WeakMap으로 사용자 세션 관리
const weakSessionMap = new WeakMap();
let user1 = { id: 1 };
let user2 = { id: 2 };

weakSessionMap.set(user1, "Active");
weakSessionMap.set(user2, "Inactive");

console.log(weakSessionMap.get(user1)); // "Active"

// 객체 참조 해제 후 가비지 컬렉션 처리
user1 = null;
console.log(weakSessionMap.has(user1)); // false
console.log(weakSessionMap.get(user1)); // "Active"
/*
user1 변수를 null로 설정하면, weakSessionMap에서 user1에 대한 참조가 사라진다. 
WeakMap은 객체에 대한 강한 참조를 유지하지 않기 때문에, 
user1이 더 이상 참조되지 않으면 해당 항목도 자동으로 가비지 컬렉션에 의해 제거된다.
*/




// 4. WeakSet으로 캐싱 데이터 관리
const cache = new WeakSet();
let product = { id: 101, name: "TV" };

cache.add(product);

console.log(cache.has(product)); // true

product = null; // 참조 해제
console.log(cache.has(product)); // false

/*
product 변수를 null로 설정하면, WeakSet에서 product에 대한 참조도 사라진다.
WeakSet은 객체에 대한 강한 참조를 유지하지 않기 때문에, product가 더 이상 유효하지 않으면 해당 항목도 자동으로 제거된된다.
*/