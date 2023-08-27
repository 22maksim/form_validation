import { useRef, useState } from 'react';
import './App.css';
import { useStore } from './hook/useStore';
import { searchErrorsPasword } from './core/searchErrorsPasword';
import { dataServer } from './core/dataServer';

function App() {
	const { getState, updateState } = useStore()
	const [errorsInput, setErrorsInput] = useState(null)
	const { email, password, passwordConfirm } = getState()
	const refButton = useRef(null)

	const onSubmit = (event) => {
		event.preventDefault()
		if (password === passwordConfirm && !!email && password !== '') {
			dataServer(getState())
			setErrorsInput(null)
		} else if (email === '') {
			setErrorsInput('Не указан email.')
		} else if (password !== passwordConfirm) {
			setErrorsInput('Пароли не равны')
		}
	}

	const onChange = ({ target }) => {
		setErrorsInput(null)
		const name = target.name
		const value = target.value
		updateState(name, value)
		if (name === 'password' || name === 'passwordConfirm') {
			setErrorsInput(searchErrorsPasword(value))
		}
		if (password === value && password.length > 4 && !!email) {
			refButton.current.focus()
		}
	}

	const onPasswordBlur = () => {
		if (password.length < 5) {
			setErrorsInput('длинна пароля должна быть больше 4')
		}
	}

	const onBlurPasswordConfirm = () => {
		if (passwordConfirm < 5) {
			setErrorsInput('длинна пароля должна быть больше 4')
		}
	}

	return (
		<div className="App">
			<form className='form' onSubmit={onSubmit}>
				<input
					type="email"
					name='email'
					value={email}
					onChange={onChange}
					placeholder='email'
					onBlur={onPasswordBlur}

				/>
				<input
					type="password"
					name='password'
					value={password}
					onChange={onChange}
					placeholder='password'
					onBlur={onPasswordBlur}
				/>
				<input
					type="password"
					name='passwordConfirm'
					value={passwordConfirm}
					onChange={onChange}
					placeholder='return password'
					onBlur={onBlurPasswordConfirm}
				/>
				<button ref={refButton} disabled={!!errorsInput}>Зарегистрироваться</button>
			</form>
			<div className="errors">
				{errorsInput}
			</div>
		</div>
	);
}

export default App;

