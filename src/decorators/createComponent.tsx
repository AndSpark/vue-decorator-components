import { defineComponent, ref, watchEffect } from 'vue'

export const prefix = 'component_decorator_'

export function Component(innerComponent: any, config?: any) {
	return createComponentFactory(innerComponent, config)
}

export function createComponentFactory(innerComponent: any, config?: any) {
	return function (target: any, key: string) {
		const component = prefix + key
		target[component] = function (instance: any) {
			return defineComponent({
				name: innerComponent.name + '-' + key,
				setup(props, { emit }) {
					const value = ref(instance[key])
					watchEffect(() => (instance[key] = value.value))
					return { value }
				},
				render() {
					return (
						<div>
							<span>{config.label}</span>
							<innerComponent v-model={this.value} {...{ props: config.props }}></innerComponent>
						</div>
					)
				}
			})
		}
	}
}

function createInstanceComponent(instance: any) {
	let proto = Object.getPrototypeOf(instance)
	const components: { [key: string]: any } = {}
	while (proto && proto !== Object.prototype) {
		const props = Object.getOwnPropertyNames(proto)
		props.forEach(prop => {
			if (prop !== 'constructor' && prop.includes(prefix)) {
				components[prop] = proto[prop](instance)
			}
		})
		proto = Object.getPrototypeOf(proto)
	}
	return defineComponent({
		render() {
			return (
				<div>
					{Object.entries(components).map(([key, component]) => (
						<component></component>
					))}
				</div>
			)
		}
	})
}

export class BaseComponent {
	createInstanceComponent = () => {
		return createInstanceComponent(this)
	}
}
