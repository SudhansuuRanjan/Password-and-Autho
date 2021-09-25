const menu = document.querySelector(".menubtn");
const menuTray = document.querySelector(".pop-up");
const menugen = document.querySelector(".tab1");
const passgen = document.querySelector(".container");
const menucheck = document.querySelector(".tab2");
const passcheck = document.querySelector(".container1");
const menuvalid = document.querySelector(".tab3");
const passvalid = document.querySelector(".container2");

const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboard = document.getElementById('clipboard');

const randomFunc = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol
}

clipboard.addEventListener('click', () => {
	const textarea = document.createElement('textarea');
	const password = resultEl.innerText;
	
	if(!password) { return; }
	
	textarea.value = password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand('copy');
	textarea.remove();
	alert('Password copied to clipboard');
});

 generate.addEventListener('click', () => {
    const length = +lengthEl.value;
	const hasLower = lowercaseEl.checked;
	const hasUpper = uppercaseEl.checked;
	const hasNumber = numbersEl.checked;
	const hasSymbol = symbolsEl.checked;
	
	resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
    generateEl.innerText = "Generate Another Password";
});
 
function generatePassword(lower, upper, number, symbol, length) {
	let generatedPassword = '';
	const typesCount = lower + upper + number + symbol;
	const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);
	
	// Doesn't have a selected type
	if(typesCount === 0) {
		return '';
	}
	
	// create a loop
	for(let i=0; i<length; i+=typesCount) {
		typesArr.forEach(type => {
			const funcName = Object.keys(type)[0];
			generatedPassword += randomFunc[funcName]();
		});
	}
	
	const finalPassword = generatedPassword.slice(0, length);
	
	return finalPassword;
}

function getRandomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
	return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
	const symbols = '!@#$%^&*(){}[]=<>/,.'
	return symbols[Math.floor(Math.random() * symbols.length)];
}


menu.addEventListener('click', ()=>{
    menuTray.classList.toggle('visible');
})
menugen.addEventListener('click', ()=>{
    passgen.classList.remove('visible1');
    passcheck.classList.add('visible1');
    passvalid.classList.add('visible1');
})
menucheck.addEventListener('click', ()=>{
    passgen.classList.add('visible1');
    passcheck.classList.remove('visible1');
    passvalid.classList.add('visible1');
})
menuvalid.addEventListener('click', ()=>{
    passgen.classList.add('visible1');
    passcheck.classList.add('visible1');
    passvalid.classList.remove('visible1');
})