/*
# 문법 설명
1. `콜 스택`은 함수 호출을 저장하고 실행 순서를 관리한다.
2. `이벤트 루프`는 콜 스택과 태스크 큐를 연결해 비동기 작업을 처리한다.
3. `process.nextTick`은 마이크로태스크 중에서도 가장 높은 우선순위를 가진다.
*/

/*
# 스토리
Node.js 서버는 클라이언트 요청을 효율적으로 처리하기 위해 작업 우선순위를 관리한다.
예를 들어, 파일 읽기 작업은 대기열에 들어가고, 빠른 응답이 필요한 작업은 즉시 처리된다.
*/

/*
# 1. Node.js 이벤트 루프의 기본 동작
*/
console.log('Start'); // 동기 작업

setTimeout(() => { // 매크로 태스크
  console.log('setTimeout');
}, 0);

setImmediate(() => { // 매크로 태스크
  console.log('setImmediate');
});

Promise.resolve().then(() => { // 마이크로 태스크
  console.log('Promise');
});

process.nextTick(() => { // 마이크로 태스크
  console.log('nextTick');
});

console.log('End'); // 동기 작업

/*
결과 설명
1. 동기 작업 `Start`, `End`가 먼저 실행된다.
2. `process.nextTick`은 마이크로태스크 중에서도 가장 먼저 처리된다.
3. `Promise`는 마이크로태스크로 처리된다.
4. `setTimeout`과 `setImmediate`는 매크로태스크 큐에서 처리되지만, 실행 순서는 Node.js 이벤트 루프의 상태에 따라 다를 수 있다.
*/

/*
# 2. 마이크로태스크와 매크로태스크의 비교
*/
console.log('Task Start'); // 동기 작업

setTimeout(() => { // 매크로 태스크
  console.log('setTimeout');
}, 0);

Promise.resolve().then(() => { // 마이크로 태스크
  console.log('Promise');
});

process.nextTick(() => { // 마이크로 태스크
  console.log('nextTick');
});

console.log('Task End'); // 동기 작업

/*
결과 설명
1. 동기 작업 `Task Start`, `Task End`가 먼저 실행된다.
2. `process.nextTick`이 가장 먼저 처리된다.
3. `Promise`가 그다음 처리된다.
4. `setTimeout`은 마지막으로 처리된다.
*/

/*
결론
1. Node.js의 이벤트 루프는 비동기 작업을 효율적으로 처리한다.
2. `process.nextTick`은 모든 작업 중 가장 높은 우선순위를 가진다.
3. Node.js는 파일 처리 및 네트워크 작업을 위한 강력한 비동기 환경을 제공한다.
*/
