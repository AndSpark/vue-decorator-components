import { prefix } from '@/decorators/createComponent'
import { defineComponent } from 'vue'

export function ButtonComponet(config?: any) {
	return function (target: any, key: string) {
		const component = prefix + key
		target[component] = function (instance: any) {
			return defineComponent({
				name: key,
				render() {
					return <button onClick={() => instance[key]()}>{key}</button>
				}
			})
		}
	}
}
