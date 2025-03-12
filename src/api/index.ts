import { extend } from 'umi-request'
import { Dialog } from 'vant'

const errorHandler = (error: {
	response: { status: any; headers: any }
	data: { status: string }
	request: any
	message: any
}) => {
	const codeMap: any = {
		'021': '发生错误啦',
		'022': '发生大大大大错误啦',
		// ....
	}
	if (error.response) {
		console.log(error)
		// 请求已发送但服务端返回状态码非 2xx 的响应
		// console.log(error.response.status)
		// console.log(error.response.headers)
		// console.log(error.data)
		// console.log(error.request)
		// console.log(codeMap[error.data.status])
	} else {
		// 请求初始化时出错或者没有响应返回的异常
		console.log(error)
	}

	// throw error // 如果throw. 错误将继续抛出.

	// 如果return, 则将值作为返回. 'return;' 相当于return undefined, 在处理结果时判断response是否有值即可.
	// return {some: 'data'};
}
const instance = extend({
	timeout: 1000,
	prefix: '/api',
	headers: {
		'Content-Type': 'appliction/json',
		'Cache-Control': 'no-cache',
	},
	responseType: 'json',
	// parseResponse: true,
	errorHandler,
})

instance.interceptors.response.use(async (response) => {
	console.log(response)
	const _data = await response.clone().json()
	const { data, msg, code } = _data
	if (code !== 0) {
		Dialog.alert({
			message: msg,
		}).then(() => {
			// 关闭弹窗
		})
		return Promise.reject(msg)
	}
	return response
})

export default instance
