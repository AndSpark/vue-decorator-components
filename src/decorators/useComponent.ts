import { createRenderer, defineComponent, h, reactive, withModifiers } from 'vue'
import 'reflect-metadata'

import input from '../components/input'

function Component(component: any, props: Record<string, any> = {}) {
	return function (target: any, key: string) {
		return Reflect.defineMetadata('component', { component, props }, target, key)
	}
}

export function useComponent(instance: any) {
	const list: any = {}
	for (const key in instance) {
		if (Object.prototype.hasOwnProperty.call(instance, key)) {
			const info = Reflect.getMetadata('component', instance, key)
			if (info) {
				list[key] = info
			}
		}
	}
	return defineComponent({
		setup() {
			const form = reactive(instance)
			return { form }
		},
		render() {
			const { form } = this
			return h('div', null, [
				Object.entries(list).map(([key, v]: [string, any]) => {
					return h(v.component, {
						modelValue: form[key],
						'onUpdate:modelValue': (value: any) => {
							form[key] = value
						},
						...v.props
					})
				})
			])
		}
	})
}

export class Form2 {
	@Component(input, { title: 'username' })
	username: string = '123'

	@Component(input)
	password: string = '32'

	login() {}
}
