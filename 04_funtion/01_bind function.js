/*
스토리: 음식점 주문 관리
고객과 직원 데이터를 활용해 다양한 상황에서 함수 바인딩을 실습.
고객과 직원 역할을 동적으로 전환하며 함수 호출의 유연성을 학습.
*/

// 1. bind를 사용한 함수 재사용
const restaurant = {
    name: "Fine Dine",
    getOrderDetails: function (orderId) {
        console.log(`주문 #${orderId}가 ${this.name}에서 준비 중입니다.`);
    },
};

const fastFood = { name: "Quick Burger" };

// bind
const fastFoodOrder = restaurant.getOrderDetails.bind(fastFood, 101);
fastFoodOrder(); // "주문 #101가 Quick Burger에서 준비 중입니다."

/*
결과 설명

bind는 this를 fastFood로 고정하고 새로운 함수를 반환.
그 결과, restaurant 객체의 메서드를 fastFood 컨텍스트에서 재사용할 수 있다.
이러한 방식으로 코드의 재사용성을 높이고, 다양한 객체에서 동일한 메서드를 활용할 수 있다.
*/

// 2. call을 사용한 컨텍스트 변경
const customer = {
    name: "Jane",
    orderFood: function (foodItem) {
        console.log(`${this.name}이(가) ${foodItem}을(를) 주문했습니다.`);
    },
};

const anotherCustomer = { name: "John" };

// call
customer.orderFood.call(anotherCustomer, "Pasta"); // "John이(가) Pasta을(를) 주문했습니다."

/*
결과 설명

call은 this를 즉시 anotherCustomer로 설정하고 메서드를 호출한다.
이 방법은 동적으로 함수의 실행 컨텍스트를 변경할 수 있어 유연한 코드 작성이 가능하다.
*/

// 3. apply를 사용한 배열 형태의 인수 전달

const staff = {
    name: "Chef Mark",
    prepareDishes: function (dish1, dish2, dish3) {
        console.log(`${this.name}이(가) ${dish1}, ${dish2}, ${dish3}을(를) 준비하고 있습니다.`);
    },
};

const assistant = { name: "Assistant Chef John" };

// apply
staff.prepareDishes.apply(assistant, ["Salad", "Soup", "Steak"]);
// "Assistant Chef John이(가) Salad, Soup, Steak을(를) 준비하고 있습니다."

/*
결과 설명

apply는 함수 호출 시 인수를 배열로 전달할 수 있다.
이 방식은 인수가 여러 개인 경우 유용하며, 특히 동적으로 인수를 전달할 때 편리하다.
*/

// 4. bind로 이벤트 핸들러 고정
function handleClick() {
    console.log(`버튼이 ${this.user}에 의해 클릭되었습니다.`);
}

const userContext = { user: "Admin" };

const boundHandleClick = handleClick.bind(userContext);
boundHandleClick(); // "버튼이 Admin에 의해 클릭되었습니다."

/*
결과 설명

bind는 this를 고정시켜 이벤트 핸들러에 전달할 때 유용하다.
이벤트가 발생할 때마다 context가 일관되게 유지되도록 보장한다.
*/

// 5. call과 apply로 동일한 함수에 다른 컨텍스트 전달

const product = {
    name: "Laptop",
    getDetails: function (price, stock) {
        console.log(`${this.name}의 가격은 $${price}이며, ${stock}개가 재고로 있습니다.`);
    },
};

const gadget = { name: "Smartphone" };

// call
product.getDetails.call(gadget, 999, 50); // "Smartphone의 가격은 $999이며, 50개가 재고로 있습니다."

// apply
product.getDetails.apply(gadget, [499, 200]); // "Smartphone의 가격은 $499이며, 200개가 재고로 있습니다."

/*
결과 설명

call과 apply를 사용해 동일한 함수를 다른 컨텍스트에서 실행할 수 있다.
call은 인수를 개별적으로 전달하고, apply는 인수를 배열 형태로 전달한다.
이러한 방식으로 다양한 객체에서 메서드를 재사용할 수 있다.
*/
