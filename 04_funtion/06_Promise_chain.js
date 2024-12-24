/*
스토리: 주문 처리 파이프라인
전자 상거래 플랫폼에서 고객의 주문을 처리하는 시스템을 구현한다. 
각 단계는 Promise 체인으로 관리되며, 주문 생성, 결제, 배송 상태 확인이 포함된다.
*/

/*
1. 기본 사용: 주문 생성과 결제 처리
고객의 주문을 생성하고, 결제를 처리한 후, 결제 성공 여부를 확인한다.
*/

// 주문 생성 함수
function createOrder(orderId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`주문 ${orderId} 생성되었습니다.`); // 주문 생성 메시지
            resolve(orderId);
        }, 1000);
    });
}

// 결제 처리 함수
function processPayment(orderId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.2) { // 80% 확률로 결제 성공
                console.log(`주문 ${orderId} 결제가 처리되었습니다.`); // 결제 처리 메시지
                resolve(orderId);
            } else {
                reject(`주문 ${orderId} 결제가 실패했습니다.`); // 결제 실패 메시지
            }
        }, 1000);
    });
}

// 배송 확인 함수
function confirmDelivery(orderId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`주문 ${orderId} 배송 완료되었습니다.`); // 배송 완료 메시지
            resolve();
        }, 1000);
    });
}

// 기본 사용: 주문 생성과 결제 처리
createOrder(1)
    .then(processPayment)
    .then(confirmDelivery)
    .then(() => console.log("주문이 성공적으로 완료되었습니다!")) // 주문 완료 메시지
    .catch((error) => console.error("오류:", error)) // 오류 메시지
    .finally(() => console.log("주문 처리 완료.")); // 처리 완료 메시지

/*
결과 설명:

주문 생성, 결제 처리, 배송 완료가 순차적으로 실행.
결제가 실패하면 이후 작업이 중단되고 에러 메시지가 출력.
*/

/*
2. Promise.all 활용: 다중 주문 처리
여러 주문을 동시에 처리하고 모든 작업이 완료되었는지 확인한다.
- Promise.all은 배열에 있는 모든 Promise가 성공적으로 완료될 때까지 기다린 후, 모든 결과를 배열로 반환한다.
- 하나라도 실패하면 전체가 실패하며, 첫 번째 발생한 오류가 반환된다.
*/

const orders = [1, 2, 3, 4, 5];

// 모든 주문 생성 및 결제 처리
Promise.all(orders.map((orderId) => createOrder(orderId).then(processPayment)))
    .then(() => console.log("모든 주문이 성공적으로 처리되었습니다!")) // 모든 주문 처리 성공 메시지
    .catch((error) => console.error("주문 처리 중 오류 발생:", error)); // 주문 처리 오류 메시지

/*
결과 설명:

모든 주문이 성공적으로 처리되면 성공 메시지 출력.
하나의 주문이라도 실패하면 에러 메시지 출력.
*/

/*
3. Promise.race 활용: 가장 빠른 작업 확인
가장 빨리 처리된 주문 결과를 확인한다.
- Promise.race는 주어진 Promise 중에서 가장 먼저 완료된 Promise의 결과를 반환한다.
- 가장 빨리 완료된 Promise가 성공하면 그 결과를 반환하고, 실패하면 첫 번째 실패 메시지를 반환한다.
*/

// 가장 빠른 주문 처리 확인
Promise.race(orders.map((orderId) => createOrder(orderId).then(processPayment)))
    .then((result) => console.log("가장 빨리 처리된 주문:", result)) // 가장 빠른 주문 처리 메시지
    .catch((error) => console.error("가장 빨리 처리된 주문 실패:", error)); // 가장 빠른 주문 실패 메시지

/*
결과 설명:

가장 빨리 처리된 주문 결과가 출력.
에러가 발생하면 가장 빠른 실패의 결과가 출력.
*/
