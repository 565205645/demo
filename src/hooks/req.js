import { reactive, onBeforeMount } from "vue";
import req from "@/utils/requset";
import local from "@/store/local";

export class Requset {
	static async getData(url) {
		return await req.get(url);
	}
	static async postData(url, data) {
		return await req.post(url, data);
	}
	static async specialPostData(url, data, option) {
		return await req.post(url, data, option);
	}
}

export function centerImgs() {
	let dataList = reactive({
		imgs: [],
	});

	onBeforeMount(() => {
		Requset.getData("api/personalCenter").then((res) => {
			dataList.imgs = { ...res.data.personal };
			console.log(dataList.imgs);
		});
	});
	return dataList;
}

export function getCodeImg() {
	let svg = reactive({
		imgs: {},
	});

	Requset.getData("api/user/getCode").then((res) => {
		svg.imgs = {...res};
		console.log(res);
	});

	return svg;
}

export function reqLogin(isCode,data){
	if(!isCode){
		Requset.postData("api/user/login",data).then(res=>{
			console.log('密码请求',res);
			if(res.data.status == '0'){
				local.set('username',res.data.telephone)
				local.set('password',data.password)
				local.set('token',res.data.token)
			}else{
				local.delete('username')
				local.delete('password')
				local.delete('token')
			}
		})
	}else{
		Requset.postData("api/user/codeLogin",data).then(res=>{
			console.log('验证码请求',res);
			if(res.data.status == '0'){
				local.set('username',res.data.telephone)
				local.set('token',res.data.token)
			}else{
				local.delete('username')
				local.delete('password')
				local.delete('token')
			}
		})
	}
}

export function reqRegister(data){
	Requset.postData("api/user/register",data).then(res=>{
		console.log('注册请求',res);
	})
}
