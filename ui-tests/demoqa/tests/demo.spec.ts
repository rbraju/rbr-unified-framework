import test from "@playwright/test";

test.describe('Demo tests 1', () => {
    test('Demo 1.1', async () => { console.log('Demo 1.1'); });
    test('Demo 1.2', async () => { console.log('Demo 1.2'); });
});

test.describe('Demo tests 2', () => {
    test('Demo 2.1', async () => { console.log('Demo 2.1'); });
    test('Demo 2.2', async () => { console.log('Demo 2.2'); });
});
