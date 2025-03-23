import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '../components/input'
import { Button } from '../components/button'
import { Label } from '../components/label'
import { Field } from '../components/field'
import HeaderUser from './HeaderUser'
import { LoadingSpinner } from '../components/loading'
import { Toast } from '../components/errors'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

interface ForgotPasswordFormData {
  email: string
}

interface BackendErrors {
  [key: string]: string[]
}

export default function ForgotPassword() {
  const navigate = useNavigate()
  const {
    handleSubmit,
    control,
    setError,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ForgotPasswordFormData>({
    mode: 'onChange'
  })

  const [backendError, setBackendError] = useState<string>('')

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setBackendError('')
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/forgot-password/', data, {
        headers: { 'Content-Type': 'application/json' }
      })

      if (response.data.status === 'success') {
        // Show success message and reset form
        setBackendError('Password reset instructions have been sent to your email.')
        reset()

        // Navigate to login page after 2 seconds
        setTimeout(() => {
          navigate('/sign-in')
        }, 2000)
      }
    } catch (error: any) {
      console.error('Error during password reset:', error)
      if (error.response && error.response.data) {
        const errorData: BackendErrors = error.response.data
        if (errorData) {
          Object.keys(errorData).forEach((field) => {
            if (field !== 'non_field_errors') {
              setError(field as keyof ForgotPasswordFormData, {
                type: 'server',
                message: errorData[field][0]
              })
            }
          })
          // Handle non-field errors
          if (errorData.non_field_errors) {
            setBackendError(errorData.non_field_errors.join(', '))
          }
        }
      } else {
        setBackendError('An unexpected error occurred. Please try again.')
      }
    }
  }

  return (
    <HeaderUser>
      <form className='form' onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
        {backendError && <Toast message={backendError} />}

        <Field>
          <Label htmlFor='email'>Email address</Label>
          <Input
            control={control}
            name='email'
            type='email'
            placeholder='Enter your email address'
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            }}
          />
          {errors.email && <div style={{ color: 'red', fontSize: '14px' }}>{errors.email.message}</div>}
        </Field>

        <Button type='submit' height='50px' disabled={isSubmitting}>
          {isSubmitting ? (
            <div className='flex items-center gap-2'>
              <LoadingSpinner />
            </div>
          ) : (
            'Send to email'
          )}
        </Button>
      </form>
    </HeaderUser>
  )
}
