import { useController } from 'react-hook-form'

import classes from './forms.module.scss'

function Input({ label, placeholder, fieldProps, error, warrning }) {
  return (
    <>
      <label>{label}</label>
      <input placeholder={placeholder} {...fieldProps} className={error ? classes.invalid : undefined} />
      <section>{warrning}</section>
    </>
  )
}

function Username({ control, serverError, onChange, required = true }) {
  const { field, fieldState } = useController({
    control,
    defaultValue: '',
    name: 'username',
    rules: {
      onChange,
      required,
      minLength: 3,
      maxLength: 20,
    },
  })

  const warrning =
    (fieldState.invalid && 'Your name needs to be at least 3 and not longer then 20 characters.') ||
    (serverError && 'This name is already taken.')

  return (
    <Input
      label="Username"
      placeholder="Username"
      fieldProps={field}
      error={fieldState.invalid || serverError}
      warrning={warrning}
    />
  )
}

function Email({ control, serverError, onChange, required = true }) {
  const { field, fieldState } = useController({
    control,
    defaultValue: '',
    name: 'email',
    rules: { onChange, required, pattern: /\S+@\S+\.\S+/ },
  })

  const warrning =
    (fieldState.invalid && 'Entered value does not match email format.') ||
    (serverError && 'This email is already taken.')

  return (
    <Input
      label="Email address"
      placeholder="Email address"
      fieldProps={field}
      error={fieldState.invalid || serverError}
      warrning={warrning}
    />
  )
}

function Password({
  control,
  warrning,
  required = true,
  label = 'Password',
  rules = {
    required,
    minLength: 6,
    maxLength: 40,
  },
}) {
  const { field, fieldState } = useController({
    control,
    defaultValue: '',
    rules,
    name: 'password',
  })

  return (
    <Input
      label={label}
      placeholder={label}
      fieldProps={{ ...field, type: 'password' }}
      error={fieldState.invalid}
      warrning={fieldState.invalid && warrning}
    />
  )
}

function ImgUrl({ control, required = true }) {
  const { field, fieldState } = useController({
    control,
    defaultValue: '',
    name: 'image',
    rules: {
      required,
      pattern: /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, //eslint-disable-line
    },
  })
  return (
    <Input
      label="Avatar image"
      placeholder="Avatar image"
      fieldProps={{ ...field }}
      error={fieldState.invalid}
      warrning={fieldState.invalid && 'Entered value does not match url format.'}
    />
  )
}

function Checkbox({ control, required = true }) {
  const { field } = useController({
    control,
    defaultValue: '',
    name: 'checkbox',
    rules: { required },
  })

  return (
    <label className={classes.checkbox}>
      <input type="checkbox" {...field} />I agree to the processing of my personal information
    </label>
  )
}

function Submit({ control, value, error }) {
  const { formState } = useController({
    control,
    defaultValue: '',
    name: 'submit',
  })
  return (
    <>
      <input type="submit" value={value} disabled={!formState.isValid} />
      {error && <section>Email or password is invalid.</section>}
    </>
  )
}
function Form({ title, children, footer, onSubmit }) {
  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <h2>{title}</h2>
      {children}
      <footer>{footer}</footer>
    </form>
  )
}

export default Form

export { Checkbox, Email, Input, ImgUrl, Password, Submit, Username }
