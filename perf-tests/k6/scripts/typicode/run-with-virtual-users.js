import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 5,
    duration: '30s'
};

// Test function
export default function() {
    const response = http.get('https://jsonplaceholder.typicode.com/todos/1');

    // Verify status is 200
    check(response, {'Response code is 200': (r) => r.status == 200});
    sleep(1);
};
