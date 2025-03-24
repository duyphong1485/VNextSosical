import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Field } from '../components/field'
import { Label } from '../components/label'
import { Input } from '../components/input'
import { Button } from '../components/button'
import { Toast } from '../components/errors'
import HeaderUser from './HeaderUser'
import { IconEyeOpen, IconEyeClose } from '../components/icon'
import { useParams } from 'react-router-dom'

interface ResetPasswordFormData {
  password: string
  password_again: string
}

interface BackendErrors {
  [key: string]: string[]
}

export default function ResetPassword() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<ResetPasswordFormData>({
    mode: 'onChange'
  })

  const navigate = useNavigate()
  const [successMessage, setSuccessMessage] = useState('')
  const [backendError, setBackendError] = useState('')

  const [togglePassword, setTogglePassword] = useState(false)
  const [togglePasswordAgain, setTogglePasswordAgain] = useState(false)

  const { uid, token } = useParams()

const onSubmit = async (data: ResetPasswordFormData) => {
  setBackendError('')
  setSuccessMessage('')

  if (data.password !== data.password_again) {
    setError('password_again', {
      type: 'validate',
      message: 'Passwords do not match'
    })
    return
  }

  try {
    const response = await axios.post('http://127.0.0.1:8000/api/reset-password/', {
      uid: uid,
      token: token,
      new_password: data.password,
    })

    if (response.data?.message) {
      setSuccessMessage(response.data.message)
      setTimeout(() => {
        navigate('/sign-in')
      }, 3000)

      }
    } catch (error: any) {
      if (error.response?.data) {
        const errorData: BackendErrors = error.response.data

Object.keys(errorData).forEach((field) => {
  const targetField =
    field === 'new_password' ? 'password' : (field as keyof ResetPasswordFormData)

  setError(targetField, {
    type: 'server',
    message: errorData[field][0]
  })
})



        if (errorData.non_field_errors) {
          setBackendError(errorData.non_field_errors.join(', '))
        }
      } else {
        setBackendError('Something went wrong. Please try again.')
      }
    }
  }

  return (
    <HeaderUser>
      <form className='form' onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
        {backendError && <Toast message={backendError} type='error' />}
        {successMessage && <Toast message={successMessage} type='success' />}

        <Field>
          <Label htmlFor='password'>Password</Label>
          <Input
            type={togglePassword ? 'text' : 'password'}
            name='password'
            placeholder='Enter your password'
            control={control}
            rules={{ required: 'Password is required' }}
          >
            {!togglePassword ? (
              <IconEyeClose onClick={() => setTogglePassword(true)} />
            ) : (
              <IconEyeOpen onClick={() => setTogglePassword(false)} />
            )}
          </Input>
          {errors.password && (
            <div style={{ color: 'red', fontSize: '14px' }}>{errors.password.message}</div>
          )}
        </Field>

        <Field>
          <Label htmlFor='password_again'>Password again</Label>
          <Input
            type={togglePasswordAgain ? 'text' : 'password'}
            name='password_again'
            placeholder='Enter your password again'
            control={control}
            rules={{ required: 'Please confirm your password' }}
          >
            {!togglePasswordAgain ? (
              <IconEyeClose onClick={() => setTogglePasswordAgain(true)} />
            ) : (
              <IconEyeOpen onClick={() => setTogglePasswordAgain(false)} />
            )}
          </Input>
          {errors.password_again && (
            <div style={{ color: 'red', fontSize: '14px' }}>{errors.password_again.message}</div>
          )}
        </Field>

        <Button type='submit' height='50px' isLoading={isSubmitting}>
          Password reset
        </Button>
      </form>
    </HeaderUser>
  )
}
