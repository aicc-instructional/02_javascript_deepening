/*
스토리: 주문 관리 시스템
전자 상거래 사이트의 주문 데이터를 처리하며, 다양한 배열 메서드를 활용한다.
*/



// 1. find 메서드로 특정 주문 검색
// find는 조건에 맞는 첫 번째 주문을 반환.
const orders = [
    { id: 1, item: "노트북", price: 1000 },
    { id: 2, item: "스마트폰", price: 700 },
    { id: 3, item: "키보드", price: 50 },
];

// 가격이 500 이상인 첫 번째 주문 찾기
const expensiveOrder = orders.find((order) => order.price >= 500);
console.log("500 이상 주문:", expensiveOrder);


// 2. some 메서드로 특정 조건 확인
// some은 조건에 맞는 요소가 하나라도 있으면 true를 반환.
const hasLargeOrder = orders.some((order) => order.price > 900);
console.log("900 초과 주문 존재 여부:", hasLargeOrder);


// 3. every 메서드로 전체 조건 확인
// every는 배열의 모든 요소가 조건에 맞는지 확인.
const areAllAffordable = orders.every((order) => order.price < 1500);
console.log("모든 주문이 1500 미만인가?:", areAllAffordable);


//  reduce로 총 주문 금액 계산 
const totalRevenue = orders.reduce((total, order) => total + order.price, 0);
console.log("총 주문 금액:", totalRevenue);