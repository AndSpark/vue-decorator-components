import { createComponentFactory } from '@/decorators/createComponent'
import { computed, defineComponent } from 'vue'

const Input = defineComponent({
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
				<input type='text' v-model={this.innerValue} />
			</div>
		)
	}
})

export default Input

export function InputComponent(config?: any) {
	return createComponentFactory(Input, config)
}
