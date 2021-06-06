/*
 * You must have a function called `run` in your solution.
 * The `run` function must return a value in order for it to be displayed on the page.
 * The `run` function must keep the `async` keyword or return a Promise.
 */
async function run() {
    return 'sample';
}

async function getExchangeRate(from, to) {
    const resp = await fetch(`https://a083f7a22-2021-new-hire.vercel.app/api/exchange/${from}/${to}`);
    return await resp.json();
}