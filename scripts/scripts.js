const inputEl = document.querySelector("#password")
const upperCaseCheckEl = document.querySelector('#uppercase-check')
const numberCheckEl = document.querySelector('#number-check')
const symbolCheckEl = document.querySelector('#symbol-check')
const securityIndicatorBarEl = document.querySelector('#security-indicator-bar')

let passwordLength = 12

function generatePassword() {
  let chars = "abcçdefghijklmnopqrstuvwxyzàáâãäåèéêëìíîïòóôõöùúûüñ"

  const upperCaseChars = "ABCÇDEFGHIJKLMNOPQRSTUVWXYZÀÁÂÃÄÅÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÑ"
  const numberChars = "0123456789"
  const symbolChars = "!#$%&()*+,-./:;<=>?@[]^_{|}~`'"

  let password = ''

  // Garante pelo menos um de cada categoria selecionada
  if (upperCaseCheckEl.checked) {
    const randomUpperCase = upperCaseChars[Math.floor(Math.random() * upperCaseChars.length)]
    password += randomUpperCase
    chars += upperCaseChars
  }

  if (numberCheckEl.checked) {
    const randomNumber = numberChars[Math.floor(Math.random() * numberChars.length)]
    password += randomNumber
    chars += numberChars
  }

  if (symbolCheckEl.checked) {
    const randomSymbol = symbolChars[Math.floor(Math.random() * symbolChars.length)]
    password += randomSymbol
    chars += symbolChars
  }

  // Preenche o restante da senha com caracteres aleatórios
  for (let i = password.length; i < passwordLength; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length)
    password += chars[randomNumber]
  }

  // Embaralha os caracteres da senha para não deixar os primeiros fixos
  password = password.split('').sort(() => Math.random() - 0.5).join('')

  inputEl.value = password
  calculateQuality()
  calculeteFontSize()
}
function calculateQuality(){
  const percent = Math.round(
    (passwordLength / 64) * 25 +
    (upperCaseCheckEl.checked ? 15:0) +
    (numberCheckEl.checked ? 25:0) +
    (symbolCheckEl.checked ? 35:0)
  )

  securityIndicatorBarEl.style.width=`${percent}%`
    if (percent > 69) {
      securityIndicatorBarEl.classList.remove("critical")
      securityIndicatorBarEl.classList.remove("warning")
      securityIndicatorBarEl.classList.add("safe")
    } else if (percent > 50) {
        securityIndicatorBarEl.classList.remove("critical")
        securityIndicatorBarEl.classList.add("warning")
        securityIndicatorBarEl.classList.remove("safe")
      } else {
          securityIndicatorBarEl.classList.add("critical")
          securityIndicatorBarEl.classList.remove("warning")
          securityIndicatorBarEl.classList.remove("safe")
        }

    if (percent >= 100) {
      securityIndicatorBarEl.classList.add("completed")
    } else {
        securityIndicatorBarEl.classList.remove("completed")
      }
}
function calculeteFontSize(){
  if (passwordLength > 45) {
    inputEl.classList.remove('font-sm')
    inputEl.classList.remove('font-xs')
    inputEl.classList.add('font-xxs')
  } else if (passwordLength > 32) {
      inputEl.classList.remove('font-sm')
      inputEl.classList.add('font-xs')
      inputEl.classList.remove('font-xxs')
    } else if (passwordLength > 22) {
        inputEl.classList.add('font-sm')
        inputEl.classList.remove('font-xs')
        inputEl.classList.remove('font-xxs')
      } else {
          inputEl.classList.remove('font-sm')
          inputEl.classList.remove('font-xs')
          inputEl.classList.remove('font-xxs')
        }
}

function copy() {
  navigator.clipboard.writeText(inputEl.value)
}

const passwordLengthEl = document.querySelector('#password-length')
passwordLengthEl.addEventListener("input", function () {
  passwordLength = passwordLengthEl.value
  document.querySelector('#password-length-text').innerText = passwordLength
  generatePassword()
})

const slider = document.getElementById('password-length');
const passwordLengthText = document.getElementById('password-length-text');

function updateSliderBackground() {
  const value = slider.value;
  const min = slider.min;
  const max = slider.max;
  
  // Atualiza o valor do texto
  passwordLengthText.textContent = value;

  // Calcula a porcentagem do valor do slider
  const percentage = ((value - min) / (max - min)) * 100;

  // Define a cor de fundo com base na porcentagem
  slider.style.background = `linear-gradient(to right, #00c6bc ${percentage}%, #676777 ${percentage}%)`;
}

// Chama a função ao carregar a página e ao mover o slider
slider.addEventListener('input', updateSliderBackground);
updateSliderBackground(); // Para definir a cor inicial

upperCaseCheckEl.addEventListener('click', generatePassword)
numberCheckEl.addEventListener('click', generatePassword)
symbolCheckEl.addEventListener('click', generatePassword)
document.querySelector("#copy-1").addEventListener('click', copy)
document.querySelector("#copy-2").addEventListener('click', copy)
document.querySelector('#renew').addEventListener('click',generatePassword)
document.querySelector('#renew-2').addEventListener('click',generatePassword)

generatePassword()