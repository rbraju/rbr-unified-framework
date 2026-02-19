import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    iterations: 1
};

export default function () {
    const response = http.get('https://jsonplaceholder.typicode.com/todos/1');
    console.log(response.body);
    sleep(1);
};
