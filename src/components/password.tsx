import { Component } from '@/decorators/createComponent'
import { computed, defineComponent } from 'vue-demi'

const Password = defineComponent({
	props: {
		modelValue: {
			type: String
		}
	},
	setup(props, { emit }) {
		const innerValue = computed({
			get() {
				return props.modelValue
			},
			set(val) {
				emit('update:modelValue', val)
			}
		})
		return {
			innerValue
		}
	},
	render() {
		return (
			<div>
				<input type='password' v-model={this.innerValue} />
			</div>
		)
	}
})

export default Password

export function PasswordComponent(config?: any) {
	return Component(Password, config)
}
