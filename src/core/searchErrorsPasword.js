const searchErrorsPasword = (value) => {
	const errors = []
	let control = null
	if (!/^[\w+]*$/.test(value)) {
		errors.push('Пароль должен содержать буквы, цифры, плюс')
		control = 1
	}
	if (value.length > 20) {
		errors.push('Длинна пароля должна быть меньше 20')
		control = 1
	}
	if (control === null) {
		return null
	}
	return errors.join('\n')
}

export {
	searchErrorsPasword,
}