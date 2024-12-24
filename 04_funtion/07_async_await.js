/*
에러 처리: try-catch로 안전한 비동기 작업
서버 에러 발생 시 적절히 처리한다.
*/
async function fetchOrderWithErrorHandling(orderId) {
    try {
        const response = await fetch(`https://api.sampleapis.com/coffee/hot/${orderId}`);
        if (!response.ok) {
            throw new Error(`주문 ${orderId}를 가져오는 중 오류 발생: ${response.statusText}`);
        }
        const orders = await response.json();
        console.log("주문 목록:", orders);
    } catch (error) {
        if (error.message.includes("Failed to fetch")) {
            console.error("네트워크 오류: 인터넷 연결을 확인하세요.");
        } else {
            console.error("알 수 없는 오류:", error.message);
        }
    } finally {
        console.log("주문 목록 처리 완료.");
    }
}


// fetchOrderWithErrorHandling(5); // 성공 확인
// fetchOrderWithErrorHandling(1000); // 에러 발생

/*
try-catch 사용 이유
- 안정성: 네트워크 요청을 수행할 때는 많은 변수가 작용한다. 
서버가 응답하지 않거나, 잘못된 데이터를 반환하는 경우가 있기 때문에, 이러한 상황을 안전하게 처리할 수 있도록 한다.


- 오류 포착: try 블록 내에서 발생하는 모든 오류를 catch 블록에서 처리할 수 있다. 
이를 통해 프로그램이 중단되지 않고, 오류에 대한 적절한 메시지를 사용자에게 제공한다.

- 결과 처리: finally 블록은 오류 발생 여부와 관계없이 항상 실행된다. 
이는 작업 완료 후 실행해야 할 청소 작업이나 로깅 용도로 매우 유용하다.
*/





// 3. 여러 비동기 작업과 에러 관리
async function processAllOrders(orderIds) {
    try {
        const orders = await Promise.all(
            orderIds.map(async (id) => {
                console.log(`주문 ${id} 처리 중...`);
                const response = await fetch(`https://api.sampleapis.com/coffee/hot/${id}`);
                if (!response.ok) {
                    throw new Error(`주문 ${id} 처리 실패!`);
                }
                return response.json();
            })
        );
        console.log("모든 주문 처리 완료:", orders);
    } catch (error) {
        console.error("하나 이상의 주문 처리 실패:", error.message);
    } finally {
        console.log("주문 처리 작업 종료.");
    }
}

// processAllOrders([1, 2, 3]);
// processAllOrders([1, 2, 3, 1000]); // 실패





//  에러 발생 시 대체 데이터 반환

async function fetchWithFallback(url, fallbackData) {
    try {
        const response = await fetch(url+`/${fallbackData.id}`);
        if (!response.ok) {
            throw new Error("데이터를 가져올 수 없습니다.");
        }
        return await response.json();
    } catch (error) {
        console.error("에러 발생:", error.message);
        console.log("대체 데이터를 반환합니다.");
        return fallbackData;
    }
}

// 실패 테스트시 아래의 id 1000으로 변경
const fallbackOrders = { id: 1, item: "Fallback Item", price: 0 };
fetchWithFallback("https://api.sampleapis.com/coffee/hot/", fallbackOrders).then((data) => {
    console.log("결과 데이터:", data);
});


/*
사용 목적
- 유지 보수성 향상: API가 다운되거나 응답하지 않을 때 시스템의 안정성을 높인다.
- 에러 처리 간소화: 시스템이 중단되지 않고 더 나은 흐름을 유지할 수 있다.
- 디버깅 및 로깅: 에러 발생을 명확히 알 수 있어 문제 진단과 모니터링에 도움이 된다.
- 일관된 응답 구조: API 응답의 형태를 유지하여 클라이언트 측 데이터 처리를 용이하게 된다.
*/