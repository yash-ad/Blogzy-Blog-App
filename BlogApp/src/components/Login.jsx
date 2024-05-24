import  { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input,  Logo } from './index.js'
import { useDispatch,useSelector } from 'react-redux'
import authService from '../appwrite/auth.js'
import { useForm } from 'react-hook-form'


function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState('')


  const login = async (data) => {
    setError('')
    try {
      const session = await authService.login(data)
      if (session) {
        const userData = await authService.getCurrentUser()
        console.log("userdata", userData);
        if (userData) dispatch(authLogin(userData))
        navigate('/')
      }
    } catch (error) {
      setError(error.message)
    }
  }



  return (
    <div className=" items-center justify-center md:min-h-[80vh] text-sm">
      <div
        className={`mx-auto w-full md:max-w-sm rounded-xl p-5 md:p-8 border-slate-800 border `}
      >
        <div className="mb-4 flex justify-center">
          <span className="inline-block w-full max-w-[80px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-lg font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-white/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-white/80 hover:text-white transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-6 text-center">{error}</p>}

        <form onSubmit={handleSubmit(login)} className="mt-6">
          <div className="space-y-4">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              className="focus:border-solid focus:border-x-2 focus:border-customPink"
              {...register('email', {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    'Email address must be a valid address',
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              className="focus:border-solid focus:border-x-2 focus:border-customPink"
              {...register('password', {
                required: true,
              })}
            />
              <Button
                type="submit"
                className="my-3 py-2 px-4 w-full text-white bg-customPink button-custom rounded-lg shadow-lg hover:bg-[#EFFF3A] hover:text-black duration-400 hover:cursor-pointer"
              >
                Sign in
              </Button>
            {console.log(Button,"Button clicked")}
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login