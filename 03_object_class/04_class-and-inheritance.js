/*
# 문법 설명
정적 메서드는 인스턴스 없이 호출 가능하며, 주로 유틸리티 함수에 사용된다. 
클래스 내부에서 `this` 대신 클래스 이름으로 호출해야 한다.
*/

/*
스토리: 동물원 시스템
동물원에서는 다양한 동물의 정보를 관리하며, 각 동물의 행동을 구현해야 한다. 
동물은 공통적으로 이름과 소리를 가지고 있으나, 특정 동물은 고유한 행동이 필요하다.
*/

// 기본 클래스 정의
class Animal {
    constructor(name) {
        this.name = name;
    }
    speak() {
        console.log(`${this.name} makes a noise.`);
    }
}

const genericAnimal = new Animal("Animal");
genericAnimal.speak(); // "Animal makes a noise."

/*
결과 설명
Animal 클래스는 이름을 초기화하고, speak 메서드를 통해 해당 동물의 소리를 출력한다.
이 메서드는 인스턴스가 호출할 수 있는 기본 동작을 정의하고 있다.
*/

// 2. 클래스 상속과 메서드 오버라이딩

class Dog extends Animal {
    speak() {
        console.log(`${this.name} barks.`);
    }
}

const dog = new Dog("Buddy");
dog.speak(); // "Buddy barks."

/*
결과 설명
Dog 클래스는 Animal 클래스를 상속받아 speak 메서드를 오버라이딩하였다.
이로 인해 Dog 인스턴스는 기본 동작 대신 '짖는' 동작을 수행하게 된다.
*/

// 3. super를 사용한 부모 클래스 호출
class Cat extends Animal {
    constructor(name, color) {
        super(name);
        this.color = color;
    }
    speak() {
        super.speak(); // 부모 클래스의 speak 메서드를 호출
        console.log(`${this.name} meows.`); // Cat 클래스의 고유 동작
    }
}

const cat = new Cat("Kitty", "white");
cat.speak();
// "Kitty makes a noise."
// "Kitty meows."

/*
결과 설명
Cat 클래스는 super 키워드를 사용하여 부모 클래스의 생성자와 speak 메서드를 호출한다.
부모의 동작을 유지하면서 Cat 클래스의 고유 동작을 추가하여 메서드를 확장하였다.
*/

// 4. 정적 메서드와 유틸리티 클래스
class ZooUtil {
    static calculateTotalAnimals(animals) {
        return animals.length; // 동물의 총 개수를 계산하여 반환
    }
}

const animals = ["Dog", "Cat", "Elephant"];
console.log(`Total animals: ${ZooUtil.calculateTotalAnimals(animals)}`); // "Total animals: 3"
/*
결과 설명
ZooUtil 클래스는 정적 메서드를 통해 동물의 총 개수를 계산한다.
정적 메서드는 인스턴스를 생성하지 않고도 호출할 수 있어 유틸리티 기능에 적합하다.
*/

// 5. 복합 사례: 다양한 동물 관리
class Bird extends Animal {
    fly() {
        console.log(`${this.name} flies high.`);
    }
}

const bird = new Bird("Eagle");
bird.speak(); // "Eagle makes a noise."
bird.fly();   // "Eagle flies high."

/*
결과 설명
Bird 클래스는 Animal 클래스를 상속받으면서 fly 메서드를 추가하여 비행 기능을 구현하였다.
이로 인해 Bird 인스턴스는 기본 소리 출력 외에도 고유한 행동을 수행할 수 있다.
*/
