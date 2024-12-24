/*
map: 배열의 각 요소를 변형하여 새로운 배열을 생성한다
filter: 조건에 맞는 요소들만 필터링하여 새로운 배열을 생성한다.
reduce: 배열의 모든 요소를 하나의 값으로 축약합니다. 주로 합계, 평균, 객체 생성 등에 사용된다.
find: 조건을 만족하는 첫 번째 요소를 찾아 반환합니다. 해당 요소가 없으면 undefined를 반환한다.
*/



/*
스토리: 쇼핑몰 데이터 처리
쇼핑몰의 데이터 배열을 활용해 다양한 분석 작업을 수행한다. 고차 함수로 데이터를 변형하고 요약해 효율적인 결과를 도출한다.
*/


// 1. map을 사용한 데이터 변환
const products = [
    { name: "Laptop", price: 1000 },
    { name: "Phone", price: 500 },
    { name: "Tablet", price: 700 },
];

// 모든 상품에 10% 할인을 적용
const discountedProducts = products.map((product) => ({
    ...product,
    price: product.price * 0.9,
}));

console.log(discountedProducts);
/*
결과 설명:
- 모든 상품의 가격에 10% 할인을 적용한 새 배열을 생성.
- 원본 배열은 변경되지 않는다.
*/



// 2. filter로 데이터 필터링
const expensiveProducts = products.filter((product) => product.price > 600);

console.log(expensiveProducts);
/*
결과 설명:
- 가격이 600 이상인 상품만 필터링해 새 배열 생성.
*/



// 3. reduce로 데이터 요약
const totalRevenue = products.reduce((acc, product) => acc + product.price, 0);

console.log(`총 매출: $${totalRevenue}`);
/*
결과 설명:
- 상품 가격을 모두 합산해 총 매출 계산.
*/


// 4. find로 특정 데이터 탐색
const specificProduct = products.find((product) => product.name === "Phone");

console.log(specificProduct);
/*
결과 설명:
- 이름이 "Phone"인 첫 번째 상품을 반환.
*/


