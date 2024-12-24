
/*
스토리: 계단 오르기 문제
계단의 총 개수를 입력받아, 한 번에 1칸 또는 2칸씩 오를 수 있는 경우의 수를 계산한다.
재귀 함수의 동작을 시각적으로 이해하기 위해 스택을 활용.
*/

// 1. 기본 재귀 함수
function countDown(n) {
    if (n === 0) {
        console.log("Done!");
        return;
    }
    console.log(n);
    countDown(n - 1); // 자기 자신 호출
}

countDown(5);
/*
출력:
5
4
3
2
1
Done!
*/
/*
결과 설명

종료 조건(n === 0)에 도달하면 "Done!"을 출력하고 재귀 호출 종료.
호출 스택은 countDown(5) → countDown(4) → ... → countDown(0) 순서로 쌓였다가 제거된다.
*/


// 2. 계단 오르기 문제: 재귀적 접근
function climbStairs(n) {
    if (n === 0) return 1; // 계단을 다 오른 경우
    if (n < 0) return 0; // 불가능한 경우
    return climbStairs(n - 1) + climbStairs(n - 2); // 1칸 또는 2칸씩 오르는 경우
}

console.log(climbStairs(5)); // 총 8가지 방법

/*
결과 설명

climbStairs(5)는 climbStairs(4)와 climbStairs(3)의 결과를 합산.
종료 조건을 명시해 호출 스택이 무한히 증가하지 않도록 설계.
5계단을 오르는 총 경우의 수는 8가지.
*/



// 3. 재귀 호출과 스택 시각화
function factorial(n) {
    if (n === 1) return 1; // 종료 조건
    console.log(`Entering factorial(${n})`);
    const result = n * factorial(n - 1); // 자기 자신 호출
    console.log(`Exiting factorial(${n})`);
    return result;
}

console.log(factorial(4));
/*
출력:
Entering factorial(4)
Entering factorial(3)
Entering factorial(2)
Entering factorial(1)
Exiting factorial(1)
Exiting factorial(2)
Exiting factorial(3)
Exiting factorial(4)
24
*/

/*
결과 설명

함수 호출 시 스택에 factorial(n)이 쌓이고, 종료 조건에 도달하면 스택에서 하나씩 제거.
"Entering"과 "Exiting" 메시지를 통해 스택 동작 시각화.
*/



// 4. 재귀를 반복문으로 변환
function factorialIterative(n) {
    let result = 1;
    for (let i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}

console.log(factorialIterative(4)); // 24

/*
결과 설명

반복문을 사용해 재귀를 대체.
반복문은 스택을 사용하지 않으므로, 스택 오버플로우 위험이 없다.
*/




// 재귀 알고리즘
// 5. 하노이의 탑: 재귀적 접근
function hanoi(n, from, to, aux) {
    if (n === 1) {
        console.log(`Move disk 1 from ${from} to ${to}`);
        return;
    }
    hanoi(n - 1, from, aux, to);
    console.log(`Move disk ${n} from ${from} to ${to}`);
    hanoi(n - 1, aux, to, from);
}

hanoi(3, "A", "C", "B");
/*
출력:
Move disk 1 from A to C
Move disk 2 from A to B
Move disk 1 from C to B
Move disk 3 from A to C
Move disk 1 from B to A
Move disk 2 from B to C
Move disk 1 from A to C
*/


/*
결과 설명

재귀적으로 문제를 분할해 해결.
호출 스택은 디스크 수에 따라 기하급수적으로 증가.
*/