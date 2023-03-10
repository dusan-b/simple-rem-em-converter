// Variables

const pxToRemTab = document.querySelector('#px-to-rem-tab');
const pxToEmTab = document.querySelector('#px-to-em-tab');

const form = document.querySelector('#calc-form');
const basePx = document.querySelector('#base-px');
const baseRemContainer = document.querySelector('#base-rem-container');
const baseRem = document.querySelector('#base-rem');
const removePrefix = document.querySelector('#rm-prefix');
const px = document.querySelector('#px');

const result = document.querySelector('#calc-result');

const copyButton = document.querySelector('#copy');
const copyMessage = document.querySelector('.copy-msg');

// Convert

form.addEventListener('submit', event => {
  event.preventDefault();

  if (!px.value || px.value === '0') {
    return;
  }

  if (baseRemContainer.classList.contains('show')) {
    const resultEm = `${+parseFloat(px.value / (baseRem.value * basePx.value)).toFixed(4)}em`;
    calcResult(resultEm);
  } else {
    const resultRem = `${+parseFloat(px.value / basePx.value).toFixed(4)}rem`;
    calcResult(resultRem);
  }

  copyButton.classList.add('show');
});

// Tabs

pxToEmTab.addEventListener('click', () => {
  if (!pxToEmTab.classList.contains('active')) {
    clear();
  }
  pxToRemTab.classList.remove('active');
  pxToEmTab.classList.add('active');
  baseRemContainer.classList.add('show');
});

pxToRemTab.addEventListener('click', () => {
  if (!pxToRemTab.classList.contains('active')) {
    clear();
  }
  pxToEmTab.classList.remove('active');
  pxToRemTab.classList.add('active');
  baseRemContainer.classList.remove('show');
});

// Copy to clipboard

copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(result.textContent);
    copyMessage.classList.add('show');
    setTimeout(() => {
      copyMessage.classList.remove('show');
    }, 3000);
  } catch (err) {
    console.error(err.name, err.message);
  }
});

// Function: Check if 'remove prefix' is checked

const calcResult = (option) => {
  const regex = /^0/;

  if (removePrefix.checked) {
    if (regex.test(option)) {
      result.textContent = option.substring(1);
    } else {
      result.textContent = option;
    }
  } else {
    result.textContent = option;
  }
};

// Function: Clear all fields

const clear = () => {
  basePx.value = 16;
  baseRem.value = 1;
  removePrefix.checked = false;
  px.value = '';
  result.textContent = '';
  copyButton.classList.remove('show');
};

// Show current year in page footer

document.querySelector('#year').textContent = new Date().getFullYear();