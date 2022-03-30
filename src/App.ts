import { Length, validate } from 'class-validator'
import { InputComponent, PasswordComponent, ButtonComponet } from './components'
import { DivComponet } from './components/div'
import { BaseComponent, Component } from './decorators/createComponent'
import { Form2, useComponent } from './decorators/useComponent'

class Form extends BaseComponent {
	@InputComponent({ label: 'username' })
	@Length(4, 20)
	username: string = ''

	@PasswordComponent({ label: 'password', type: 'password' })
	@Length(4, 20)
	password: string = ''

	string: string = '123'

	@ButtonComponet('add 1')
	add = () => {
		this.username = this.username + '1'
	}
	@ButtonComponet('login')
	login = () => {
		validate(this).then(errors => {
			if (errors.length > 0) {
				console.log('validation failed. errors: ', errors)
			} else {
				console.log('validation succeed')
			}
		})
	}
}

class Test extends BaseComponent {
	@DivComponet('1')
	form = Form
}

const f = new Form2()

export default useComponent(f)

// const loginForm = new Test().createInstanceComponent()

// export default loginForm
