import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '20s', target: 10 },    // Ramping up from 01 to 10 VUs for 20 seconds
        { duration: '15s', target: 20 },    // Ramping up from 10 to 20 VUs for 15 seconds 
        { duration: '10s', target: 20 },    // Staying flat at 20 VUs for 10 seconds
        { duration: '10s', target: 0 }      // Ramping down to 00 VUs for 10 seconds
    ],
    thresholds: {
        http_req_failed: ['rate < 0.01'],   // HTTP errors should be less than 1%
        http_req_duration: ['p(95) < 200'], // 95% of requests should be below 200ms
    }
};

export default function () {
    const response = http.get('https://jsonplaceholder.typicode.com/todos/1');
    check(response, { 
        'Status code is 200': (r) => r.status == 200,
        'Title is not empty': (r) => JSON.parse(r.body).title != ''
    });
    sleep(1);
};
