import { defineComponent, reactive } from 'vue-demi'

export const COMPONENT = Symbol('component')
export function Component(component: any, props?: any) {
	return function (target: any, key: string) {
		if (!target[COMPONENT]) {
			target[COMPONENT] = {
				[key]: {
					props,
					component
				}
			}
		} else {
			target[COMPONENT][key] = {
				props,
				component
			}
		}
	}
}

function createInstanceComponent(instance: any) {
	let proto = Object.getPrototypeOf(instance)
	const componentConfig: { [key: string]: any } = {}
	const components: { [key: string]: any } = {}
	while (proto && proto !== Object.prototype) {
		if (proto[COMPONENT]) {
			Object.entries(proto[COMPONENT]).forEach(([key, value]: [string, any]) => {
				const component =
					typeof value.component === 'function' ? value.component(instance, key) : value.component
				componentConfig[key] = {
					props: value.props,
					component,
					value: instance[key]
				}
				if (typeof value.component === 'function') {
					components[key] = component
				} else {
					components[key] = component
				}
			})
		}
		proto = Object.getPrototypeOf(proto)
	}
	return defineComponent({
		components,
		setup() {
			const values = reactive(
				Object.fromEntries(
					Object.entries(componentConfig)
						.filter(([key, content]) => {
							return typeof content.value !== 'function'
						})
						.map(([key, content]) => {
							return [[key], content.value]
						})
				)
			)

			Object.keys(values).forEach(key => {
				Object.defineProperty(instance, key, {
					get() {
						return values[key]
					},
					set(val) {
						values[key] = val
					}
				})
			})
			return { values }
		},
		render() {
			return (
				<div>
					{Object.entries(componentConfig).map(([key, content]) => {
						const { component, value, props } = content
						if (typeof value !== 'function') {
							return <component ref={key} v-model={this.values[key]} {...props}></component>
						}
						return <component ref={key} {...props}></component>
					})}
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
