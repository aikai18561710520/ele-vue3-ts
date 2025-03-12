import requestInstance from './index'

const test = () => {
	return requestInstance.get('/test')
}
export { test }
