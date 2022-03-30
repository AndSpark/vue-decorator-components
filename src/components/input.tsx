import { Component } from '@/decorators/createComponent'
import { computed, defineComponent } from 'vue-demi'

const Input = defineComponent({
	props: {
		modelValue: {
			type: String
		},
		title: {
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
				<span>{this.title}</span>
				<input type='text' v-model={this.innerValue} />
			</div>
		)
	}
})

export default Input

export function InputComponent(config?: any) {
	return Component(Input, config)
}
