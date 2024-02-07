// script.js
document.getElementById('sendButton').addEventListener('click', function() {
    const userInput = document.getElementById('userInput').value.trim();
    if (userInput) {
        fetchGPTResponse(userInput);
    } else {
        alert('메시지를 입력해주세요.');
    }
});

document.getElementById('userInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault(); // 엔터 키 기본 이벤트 방지
        document.getElementById('sendButton').click();
    }
});

function fetchGPTResponse(message) {
    document.getElementById('responseArea').innerText = '로딩 중...';
    // GPT API 호출 로직
    // 예시 코드입니다. 실제 API 엔드포인트와 키를 사용해야 합니다.
    const apiURL = 'https://chat.openai.com/g/g-eLvv6JJZK-picture-ai-scanner'; //'YOUR_GPT_API_ENDPOINT'
    const apiKey = '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';
    const data = {
        prompt: message,
        maxTokens: 50
    };

    fetch(apiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('네트워크 응답이 올바르지 않습니다.');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('responseArea').innerText = data.choices[0].text;
    })
    .catch(error => {
        console.error('Error:', error);
        alert('오류가 발생했습니다. 콘솔을 확인해주세요.');
    });
}