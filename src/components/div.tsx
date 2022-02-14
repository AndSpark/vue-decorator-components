import { Component } from '@/decorators/createComponent'
import { defineComponent } from 'vue-demi'

export function DivComponet(label: string) {
	return Component(
		function (instance: any, key: string) {
			const target = new instance[key]().createInstanceComponent()
			return defineComponent({
				components: { target },
				render() {
					return (
						<div>
							<target></target>
						</div>
					)
				}
			})
		},
		{ label }
	)
}
