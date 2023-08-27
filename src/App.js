import './App.css';
import { useForm, } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import fieldsSchema from './core/fieldSchema';

function App() {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			passwordConfirm: '',
		},
		resolver: yupResolver(fieldsSchema)
	})

	const passwordError = errors.password?.message
	const passwordConfirmError = errors.passwordConfirm?.message
	const emailError = errors.email?.message

	const onSubmit = (data, e) => {
		if (isValid) {
			console.log(data, e)
		}
		reset()
	}

	return (
		<div className="App">
			<form className='form' onSubmit={handleSubmit(onSubmit)}>
				<input placeholder='email' name='email' type="email" {...register('email')} />
				{emailError && <div className='error'>{emailError}</div>}

				<input ref={register} placeholder='password' name='password' type="password" {...register('password')} />
				{passwordError && <div className='error'>{passwordError}</div>}

				<input ref={register} placeholder='passwordConfirm' name='passwordConfirm' type="password" {...register('passwordConfirm')} />
				{passwordConfirmError && <div className='error'>{passwordConfirmError}</div>}

				<button disabled={passwordError || passwordConfirmError || emailError} >Зарегестрироваться</button>
			</form>
		</div >
	);
}

export default App;
