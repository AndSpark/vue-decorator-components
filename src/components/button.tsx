import { Component } from '@/decorators/createComponent'
import { defineComponent } from 'vue-demi'

export function ButtonComponet(label: string) {
	return Component(
		function (instance: any, key: string) {
			return defineComponent({
				props: ['label'],
				render() {
					return <button onClick={() => instance[key]()}>{this.label}</button>
				}
			})
		},
		{ label }
	)
}
