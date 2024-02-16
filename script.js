const strengthMeter = document.getElementById('strength-meter')
const passwordInput = document.getElementById('password-input')
const reasonsContainer = document.getElementById('reasons')

const characterTypeWeakness = (password, regex, type) =>{
    const matches = password.match(regex) || []

    if (matches.length === 0) {
        return{
            message: `Your password has no ${type}`,
            deduction: 28
        }
    }

    if (matches.length <= 2) {
        return{
            message: `Your password could use more ${type}`,
            deduction: 5
        }
    }
}

const repeatCharacterWeakness = (password) => {
    const matches = password.match(/(.)\1/g) || []
    if (matches.length > 0) {
        return {
            message: 'Your password has repeat character',
            deduction: matches.length * 10
        }
    }
}

const lengthWeakness = (password) => {
    const length = password.length

    if (length <= 5) {
        return{
            message: 'Your password is too short',
            deduction: 40
        }
    }

    if (length <= 10) {
        return{
            message:'Your password could be longer',
            deduction: 15
        }
    }
}

const upperCaseWeakness = (password) => {
    return characterTypeWeakness(password, /[A-Z]/g, 'uppercase character')
}
const lowerCaseWeakness = (password) => {
    return characterTypeWeakness(password, /[a-z]/g, 'lowercase character')
}
const numberWeakness = (password) => {
    return characterTypeWeakness(password, /[0-9]/g, 'numbers')
}
const specialCharacterWeakness = (password) => {
    return characterTypeWeakness(password, /[^0-9a-zA-Z\s]/g, 'special character')
}

const calculatePasswordStrength = (password) => {
    const weaknesses = []
    weaknesses.push(lengthWeakness(password))
    weaknesses.push(lowerCaseWeakness(password))
    weaknesses.push(upperCaseWeakness(password))
    weaknesses.push(numberWeakness(password))
    weaknesses.push(specialCharacterWeakness(password))
    weaknesses.push(repeatCharacterWeakness(password))
    return weaknesses
}

const updateStrengthMeter = () => {
    const weaknesses = calculatePasswordStrength(passwordInput.value)

    let strength = 100
    reasonsContainer.innerHTML = ''
    weaknesses.forEach(weakness =>{
        if (weakness == null) return
        strength -= weakness.deduction
        const messageElement = document.createElement('div')
        messageElement.innerHTML = weakness.message
        reasonsContainer.appendChild(messageElement)
    })

    strengthMeter.style.setProperty('--strength', strength)
}

passwordInput.addEventListener('input', updateStrengthMeter)
updateStrengthMeter()






