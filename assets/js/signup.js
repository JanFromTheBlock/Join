function newUser() {
    console.log('function activated');
    return false
}

const inputEl = document.querySelector('#signup-pass');

const dummyEl = document.querySelector('#dummy');

const resultEl = document.querySelector('#result');

inputEl.addEventListener('keyup', () => {
  const dummyText = Array(inputEl.value.length).fill('*').join('');
  dummyEl.innerHTML = dummyText;
  resultEl.innerHTML = inputEl.value;
})