import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { Paths } from '@/App/Routes/types/Paths';
import { usePasswordVision } from '@/Utils/Hooks/usePasswordVision';
import { useAuth } from '@/Stores/userStore';

import './AuthForm.scss';
import { Loader } from '..';

type AuthFormProps = {
  isSignup: boolean;
};

export type FormValues = {
  username?: string;
  email: string;
  password: string;
};

const AuthForm: FC<AuthFormProps> = ({ isSignup }) => {
  const { handleVision, vision } = usePasswordVision();

  const setRegister = useAuth((state) => state.setRegister);
  const setLogin = useAuth((state) => state.setLogin);
  const isLoading = useAuth((state) => state.isLoading);
  const error = useAuth((state) => state.error);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onSubmit' });

  const onSubmit = async ({ email, password, username }: FormValues) => {
    if (isSignup) {
      const ok = await setRegister({ email, password, username });
      if (ok && !error) {
        navigate(Paths.Login);
      }
    } else {
      const ok = await setLogin({ email, password });
      if (ok && !error) {
        navigate(Paths.Home);
      }
    }
  };

  return (
    <div className='AuthForm'>
      <form className='AuthForm__form' onSubmit={handleSubmit(onSubmit)}>
        <h1 className='AuthForm__title'>{isSignup ? 'Signup' : 'Login'}</h1>
        {/* Username */}

        {isSignup && (
          <div className='AuthForm__wrapper'>
            <label className='AuthForm__label'>Username:</label>
            <input
              type='text'
              className='AuthForm__input'
              {...register('username', {
                minLength: 3,
              })}
            />
            <div className='Form-error'>
              {errors?.username && (
                <p>{errors?.username?.message || 'Ошибка!'}</p>
              )}
            </div>
          </div>
        )}

        {/* Email */}

        <div className='AuthForm__wrapper'>
          <label className='AuthForm__label'>Email:</label>
          <input
            type='text'
            className='AuthForm__input'
            {...register('email', {
              pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            })}
          />
          <div className='Form-error'>
            {errors?.email && <p>{errors?.email?.message || 'Ошибка!'}</p>}
          </div>
        </div>

        {/* Password */}

        <div className='AuthForm__wrapper'>
          <label className='AuthForm__label'>Password:</label>
          <input
            type={vision ? 'text' : 'password'}
            className='AuthForm__input'
            {...register('password', {
              minLength: 3,
            })}
          />
          <div className='AuthForm__vision' onClick={handleVision}>
            {vision ? (
              <AiFillEyeInvisible size={30} color='white' />
            ) : (
              <AiFillEye size={30} color='white' />
            )}
          </div>
          <div className='Form-error'>
            {errors?.password && (
              <p>{errors?.password?.message || 'Ошибка!'}</p>
            )}
          </div>
        </div>

        {isSignup ? (
          <div className='AuthForm__quastion'>
            У вас есть аккаунт? {<Link to={Paths.Login}>Войти</Link>}
          </div>
        ) : (
          <div className='AuthForm__quastion'>
            Создать новый аккаунт?{' '}
            {<Link to={Paths.Signup}>Зарегестрироваться</Link>}
          </div>
        )}

        <div>
          <button
            disabled={isLoading}
            className='AuthForm__submitbtn'
            type='submit'
          >
            {isLoading ? (
              <Loader />
            ) : (
              <span>{isSignup ? 'Register' : 'Login'}</span>
            )}
          </button>

          {error && <div className='AuthForm__respError'>{error}</div>}
        </div>
      </form>
    </div>
  );
};

export { AuthForm };
