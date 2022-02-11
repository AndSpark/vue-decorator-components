# vue-decorator-components

This is a demo , just complete base function

Use decorator component with class-validator like this:

```ts
import { Length, validate } from 'class-validator'
import { InputComponent, PasswordComponent, ButtonComponet } from './components'
import { BaseComponent } from './decorators/createComponent'

class Form extends BaseComponent {
	@InputComponent({ label: 'username' })
	@Length(4, 20)
	username: string = ''

	@PasswordComponent({ label: 'password', type: 'password' })
	@Length(4, 20)
	password: string = ''

	@ButtonComponet()
	login = () => {
		validate(this).then(errors => {
			console.log(this.username, this.password)
			if (errors.length > 0) {
				console.log('validation failed. errors: ', errors)
			} else {
				console.log('validation succeed')
			}
		})
	}
}

const loginForm = new Form().createInstanceComponent()

export default loginForm
```

![Untitled](https://github.com/AndSpark/vue-decorator-components/blob/main/example.png)

will create this
