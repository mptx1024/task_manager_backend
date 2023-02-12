function func1() {
    console.log('func1...');
    throw new Error('something bad happened!');
}

function func2() {
    console.log('func2...');
    try {
        func1();
    } catch (err) {
        console.log('Caught error:', err.message);
    }
}

console.log('func2()');
func2();

console.log('func1()');
func1();
