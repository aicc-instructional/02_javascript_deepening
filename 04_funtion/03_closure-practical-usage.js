/*
클로저와 일반 변수의 차이:
- 클로저는 함수와 그 함수가 선언된 렉시컬 환경의 조합이다.
- 클로저를 사용하면, 내부 변수를 외부에서 직접 접근할 수 없게 보호할 수 있다.
- 일반 변수는 함수 외부에서 접근 가능하며, 데이터 무결성을 보장할 수 없다.

메모리 절약:
- 클로저는 함수가 종료된 후에도 내부 상태를 유지할 수 있다.
- 이는 메모리에서 해당 변수가 계속 존재하게 만든다.
- 필요한 경우에만 해당 변수를 사용하고, 불필요한 데이터 접근을 방지하여 메모리 사용을 최적화할 수 있다.
- 예를 들어, 여러 개의 계좌를 생성할 경우, 각 계좌의 balance는 독립적으로 유지되며, 메모리에서 각각의 상태를 효율적으로 관리할 수 있다.
*/




function bankAccount(initialBalance) {
    // 클로저: balance 변수는 bankAccount 함수의 스코프 안에 정의되어 있다.
    // 이 변수는 외부 스코프에서 직접 접근할 수 없으므로, 
    // 데이터 보호와 함께 내부 상태를 유지할 수 있다.
    let balance = initialBalance; // 은행 잔고 (외부에서 접근 불가)

    return {
        deposit(amount) {
            balance += amount; // 잔고에 입금
            console.log(`입금 완료. 현재 잔고: ${balance}원`);
        },
        withdraw(amount) {
            if (balance >= amount) {
                balance -= amount; // 잔고에서 출금
                console.log(`출금 완료. 현재 잔고: ${balance}원`);
            } else {
                console.log("잔고 부족.");
            }
        },
        checkBalance() {
            console.log(`현재 잔고: ${balance}원`);
        },
        // balance에 대한 직접 접근을 방지
        getBalance() {
            return balance; // 잔고를 반환하는 메서드
        }
    };
}

const account = bankAccount(10000);
console.log(account)


account.deposit(5000); // 15000원
account.withdraw(3000); // 12000원
account.checkBalance(); // 12000원

// 외부에서 balance에 접근할 수 없음
account.balance = 1000;

// account.balance는 외부에서 접근할 수 없기 때문에, 
// 클로저를 통해 balance 변수를 보호하여 데이터 무결성을 유지.
console.log(account.balance); // 1000
console.log(account.getBalance()); // 12000원
console.log(account)









function createCache() {
    const cache = {}; // 캐싱 데이터를 저장할 객체

    // 클로저를 사용하여 cache 변수를 외부에서 접근할 수 없게 보호
    return function (key, computeFn) {
        // 캐시에서 이미 계산된 값이 있는지 확인
        if (key in cache) {
            console.log(`캐시에서 가져옴: ${key}`); // 캐시에서 값을 가져옴
            return cache[key]; // 캐시된 값을 반환
        }
        
        // 캐시에 값이 없으면 새로 계산
        console.log(`새로 계산: ${key}`); 
        const result = computeFn(); // computeFn을 호출하여 결과를 계산
        cache[key] = result; // 계산된 결과를 캐시에 저장
        return result; // 결과를 반환
    };
}

const cacheFn = createCache(); // createCache를 호출하여 캐시 함수 생성
console.log(cacheFn("a", () => 10 * 10)); // 새로 계산: a -> 100
console.log(cacheFn("a", () => 10 * 10)); // 캐시에서 가져옴: a -> 100

/*
동작 흐름:
1. `createCache` 함수가 호출되면 내부에 `cache` 객체가 생성된다.
2. 반환된 함수는 `key`와 `computeFn`을 인자로 받는다.
3. 호출 시, `key`가 `cache` 객체에 존재하는지 확인한다.
   - 존재하면, 캐시에서 계산된 값을 가져오고 해당 값을 반환한다.
   - 존재하지 않으면, `computeFn`을 호출하여 새로 계산하고 그 결과를 `cache`에 저장한 후 반환한다.

메모리 효율성:
- 클로저를 사용함으로써 `cache` 객체는 `createCache` 함수의 스코프 안에 유지되며, 외부에서 접근할 수 없다.
- 이로 인해 메모리에서 계산된 결과를 재사용할 수 있어, 동일한 입력에 대해 반복적인 계산을 피할 수 있다.
- 캐시된 데이터는 메모리에 저장되어 있으며, 동일한 키에 대한 반복 호출 시 계산 비용을 줄여준다.
- 메모리 효율성을 극대화하려면, 캐시의 크기를 제한하거나 주기적으로 캐시를 정리하는 방법을 고려할 수 있다.
*/



console.log("----")

/* 
3. 메모이제이션 패턴
메모이제이션(Memoization)은 함수의 결과를 저장하여 같은 입력에 대해 반복적으로 계산하는 것을 피하는 최적화 기법이다. 
주로 재귀 호출이 있는 함수에서 성능을 개선하는 데 유용하다. 
메모이제이션을 통해 함수가 동일한 인자에 대해 이미 계산된 결과를 재사용할 수 있게 하여, 
불필요한 계산을 줄이고 성능을 향상시킨다.
*/
function memoize(fn) {
    const cache = {}; // 캐시 저장소

    return function (...args) { // 인수를 동적으로 받을 수 있도록 함.
        const key = JSON.stringify(args); // 인수를 문자열로 변환해 키 생성
        if (key in cache) {
            console.log(`캐시에서 가져옴: ${key}`);
            return cache[key];
        }
        console.log(`새로 계산: ${key}`);
        const result = fn(...args);
        cache[key] = result;
        return result;
    };
}

function fibonacci(n) {
    if (n <= 1) return n;
    
    return fibonacci(n - 1) + fibonacci(n - 2);

}

const memoizedFibonacci = memoize(fibonacci);
console.log(memoizedFibonacci(10)); // 새로 계산 -> 결과: 55
console.log(memoizedFibonacci(10)); // 캐시에서 가져옴 -> 결과: 55

/*
메모이제이션은 동일한 입력에 대해 계산을 반복하지 않고 결과를 캐싱해 성능 최적화.
재귀 함수 fibonacci를 메모이제이션으로 감싸 호출 횟수 감소.
*/