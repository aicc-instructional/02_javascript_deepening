const user = { name: "Alice" };
const info = { age: 25 };

// 객체 병합
const merged = { ...user, ...info };
console.log(merged); // { name: "Alice", age: 25 }
