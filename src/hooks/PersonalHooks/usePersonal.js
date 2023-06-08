import { reactive, ref, watch, onBeforeMount } from "vue";
import {  useStore } from "vuex";
import useWacth from "./useWatch";
import { reqLogin, reqRegister } from "../req";
import local from "@/store/local";
export default function usePersonal() {
	// 导入store
	let store = useStore();

	// 登陆注册切换
	let isChange = ref(false);
	let isLoginCode = ref(false);

	// 输入框和正则
	let loginTel = useWacth("tel", /^1{1}[3-9]{1}\d{9}$/);
	let loginPwd = useWacth("pwd", /^\w{8,16}$/);
	let loginCode = useWacth("code", /^\d{4}$/);
	let registerTel = useWacth("tel", /^1{1}[3-9]{1}\d{9}$/);
	let registerPwd = useWacth("pwd", /^\w{8,16}$/);
	let registerCode = useWacth("code", /^\d{4}$/);

	// 再次输入密码
	let registerAgainPwd = reactive({
		isShow: false,
		againPwd: "",
	});
	// 监听再次输入密码
	watch(registerAgainPwd, (newV) => {
		newV.againPwd == registerPwd.pwd
			? (registerAgainPwd.isShow = false)
			: (registerAgainPwd.isShow = true);
	});

	// 声明倒计时的数
	let timerMsg = reactive({
		loginTime: "",
		registerTime: "",
	});

	// 倒计时函数
	function runTime(value) {
		console.log(value);
		if (value == "0") {
			if (!isChange.value) {
				timerMsg.loginTime = 60;
				let timer = setInterval(() => {
					timerMsg.loginTime--;
					timerMsg.loginTime == 0 && clearInterval(timer);
				}, 1000);
			} else {
				timerMsg.registerTime = 60;
				let timer = setInterval(() => {
					timerMsg.registerTime--;
					timerMsg.registerTime == 0 && clearInterval(timer);
				}, 1000);
			}
		}
	}
	// 倒计时函数写入vueX
	store.commit("DEPOSIT_FN", runTime);
	// 登陆事件
	function onLogin() {
		loginTel.tel !== ''
		let data = isLoginCode.value
			? { telephone: loginTel.tel, code: loginCode.code }
			: { telephone: loginTel.tel, password: loginPwd.pwd };
		reqLogin(isLoginCode.value, data);
	}

	// 注册事件
	function onRegister() {
		console.log('111');
		reqRegister({
			telephone: registerTel.tel,
			password: registerPwd.pwd,
			code: registerCode.code,
		});
	}

	onBeforeMount(() => {
		loginTel.tel = local.get('username') ?  local.get('username'): ''
		loginPwd.pwd = local.get('password') ?  local.get('username'): ''
	})

	// function toLoft(isChange) {
	// 	let svg = getCodeImg();
	// 	console.log("personal", svg);
	// 	router.push({
	// 		path: "/loft",
	// 		query: {
	// 			tel: isChange ? registerMsg.tel : loginMsg.tel,
	// 			svg: svg.imgs,
	// 		},
	// 	});
	// }

	return {
		isChange,
		isLoginCode,
		loginTel,
		loginPwd,
		loginCode,
		registerTel,
		registerPwd,
		registerAgainPwd,
		registerCode,
		timerMsg,
		onLogin,
		onRegister,
		runTime,
	};
}
