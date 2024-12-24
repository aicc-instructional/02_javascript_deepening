/*
Compose : 여러 함수를 오른쪽에서 왼쪽으로 실행하는 패턴이다. 
즉, 마지막에 정의된 함수가 먼저 실행되고,그 결과가 이전 함수의 입력으로 전달된다.

Pipe:  Pipe는 여러 함수를 왼쪽에서 오른쪽으로 실행하는 패턴이다. 
즉, 첫 번째에 정의된 함수가 먼저 실행되고, 그 결과가 다음 함수의 입력으로 전달된다.
*/

/*
스토리: 데이터 변환 파이프라인
전자 상거래 데이터에서 각 주문의 가격을 변환하고 총합을 계산한다.
*/


// pie로 데이터 처리
const pipe =
    (...fns) =>
    (value) =>
        fns.reduce((acc, fn) => fn(acc), value);

const orders = [100, 200, 300, 400];

// 가격에 세금을 더하고 총합 계산
const addTax = (price) => price * 1.1;
const roundPrice = (price) => Math.round(price);

const totalOrderValue = pipe(
    (orders) => orders.map(addTax),
    (orders) => orders.map(roundPrice),
    (orders) => orders.reduce((acc, order) => acc + order, 0)
);

console.log(`총 주문 금액: $${totalOrderValue(orders)}`);
/*
결과 설명:
- 각 주문에 10% 세금을 더하고 반올림한 후 총합을 계산.
*/




// compose로 데이터 처리
const compose =
    (...fns) =>
    (value) =>
        fns.reduceRight((acc, fn) => fn(acc), value);

const totalOrderValueWithCompose = compose(
    (orders) => orders.reduce((acc, order) => acc + order, 0), // 총합 계산
    (orders) => orders.map(roundPrice), // 반올림
    (orders) => orders.map(addTax) // 세금 적용
);

console.log(`총 주문 금액 (Compose): $${totalOrderValueWithCompose(orders)}`);

/*
결과 설명:
- compose는 pipe와 동일한 동작을 수행하지만, 오른쪽에서 왼쪽으로 실행된다.
- 데이터 변환 단계는 동일하며, 각 주문에 세금을 더하고 반올림한 후 총합을 계산.
*/