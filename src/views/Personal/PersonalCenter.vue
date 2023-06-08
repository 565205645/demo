<template>
	<div class="personal">
		<header>
			<img alt="" :src="dataList.imgs.titleImg" />
			<section>
				<img alt="" :src="dataList.imgs.toCustomImg" />
				<span>客服中心</span>
			</section>
		</header>
		<main 
		:style="`background-image:url(${dataList.imgs.bgImg})`"
				>
			<div class="box" >
				<div
					class="login"
					:style="
					personal.isChange.value
							? 'transform: rotateY(-180deg)'
							: 'transform: rotateY(0deg)'
					"
				>
					<h2>登录</h2>
					<div>
						<input
							type="text"
							placeholder="请输入手机号"
							v-model="personal.loginTel.tel"
							:style="personal.loginTel.isShow && inputStyle"
						/>
						<p v-if="personal.loginTel.isShow">
							{{ personal.loginTel.tel === "" ? "*手机号不能为空" : "*手机号格式不正确" }}
						</p>
					</div>
					<div v-if="!personal.isLoginCode.value" >
						<input
							type="password"
							placeholder="请输入密码"
							v-model="personal.loginPwd.pwd"
							:style="personal.loginPwd.isShow && inputStyle"
						/>
						<p v-if="personal.loginPwd.isShow">
							{{ personal.loginPwd.pwd === "" ? "*密码不能为空" : "*密码格式不正确" }}
						</p>
					</div>
					<div class="code" v-if="personal.isLoginCode.value">
						<input
							type="text"
							placeholder="输入验证码"
							v-model="personal.loginCode.code"
							:style="personal.loginCode.isShow && inputStyle"
						/>
						<p v-if="personal.loginCode.isShow">
							{{ personal.loginCode.code === "" ? "*验证码不能为空" : "*验证码格式不正确" }}
						</p>
						<button
							@click="toLoft(personal.isChange.value)"
							v-html="
								personal.timerMsg.loginTime > 0 ? `${personal.timerMsg.loginTime}S后重试` : '获取验证码'
							"
							:disabled="(personal.loginTel.tel == '' || personal.timerMsg.loginTime > 0 )"
							:style="(personal.loginTel.tel =='' ||personal.loginTel.isShow|| personal.timerMsg.loginTime > 0 )? 'background-color:#626262' : ''"
						></button>
					</div>
					<div>
						<span
							v-if="!personal.isLoginCode.value"
							@click="personal.isLoginCode.value = true"
							>使用短信验证码登录</span
						>
						<span
							v-if="personal.isLoginCode.value"
							@click="personal.isLoginCode.value = false"
							>使用密码登录</span
						>
					</div>
					<button @click="personal.onLogin">登录</button>
					<a href="">使用Bilibili账号</a>
				</div>
				<div
					class="register"
					:style="
					personal.isChange.value
							? 'transform: rotateY(0deg)'
							: 'transform: rotateY(180deg)'
					"
				>
					<h2>注册</h2>
					<div>
						<input
							type="text"
							placeholder="手机号"
							v-model="personal.registerTel.tel"
							:style="personal.registerTel.isShow && inputStyle"
						/>
						<p v-if="personal.registerTel.isShow">
							{{ personal.registerTel.tel === "" ? "*手机号不能为空" : "*手机号格式不正确" }}
						</p>
					</div>
					<div>
						<input
							type="password"
							placeholder="8-16位数字、字母、常用字符"
							v-model="personal.registerPwd.pwd"
							:style="personal.registerPwd.isShow && inputStyle"
						/>
						<p v-if="personal.registerPwd.isShow">
							{{ personal.registerPwd.pwd === "" ? "*密码不能为空" : "*密码格式不正确" }}
						</p>
					</div>
					<div>
						<input
							type="password"
							placeholder="确认密码"
							v-model="personal.registerAgainPwd.againPwd"
							:style="personal.registerAgainPwd.isShow && inputStyle"
						/>
						<p v-if="personal.registerAgainPwd.isShow">
							{{ personal.registerAgainPwd.againPwd === ""
							? "*请确认密码" : "*两次输入的密码不一致" }}
						</p>
					</div>
					<div class="code">
						<input v-model="personal.registerCode.code" placeholder="输入验证码"
						:style="personal.registerCode.isShow && inputStyle"
					/>
					<p v-if="personal.registerCode.isShow">
						{{ personal.registerCode.code === "" ? "*验证码不能为空" : "*验证码格式不正确" }}
					</p>
						<button
							@click="toLoft(personal.isChange.value)"
							v-html="
								personal.timerMsg.registerTime > 0 ? `${personal.timerMsg.registerTime}S后重试` : '获取验证码'
							"
							:disabled="(personal.registerTel.tel == '' || personal.timerMsg.registerTime > 0 )"
							:style="(personal.registerTel.tel == ''|| personal.registerTel.isShow || personal.timerMsg.registerTime > 0 )? 'background-color:#626262' : ''"
						></button>
					</div >
					<section class="agreement" >
						<input type="checkbox" />
						<span>已阅读并同意</span>
						<a href="">《鹰角网络用户注册协议》</a>
						<span>及</span>
						<a href="">《鹰角网络游戏个人信息保护政策》</a>
					</section>
					<button @click="personal.onRegister">注册</button>
				</div>
			</div>
			<div class="btn">
				<span
					@click="personal.isChange.value = false"
					:class="personal.isChange.value ? '' : 'onBtn'"
					>登录</span
				>
				·
				<span
					@click="personal.isChange.value = true"
					:class="personal.isChange.value ? 'onBtn' : ''"
					>注册</span
				>
			</div>
		</main>
		<footer>
			<ul>
				<li v-for="(item, index) in dataList.imgs.bottom" :key="index">
					<img :src="item.img" alt="" />
					<span>{{ item.words }}</span>
				</li>
			</ul>
		</footer>
		<router-view></router-view>
	</div>
</template>

<script>
import { centerImgs } from "@/hooks/req";
import usePersonal from "@/hooks/PersonalHooks/usePersonal";
import req from "@/utils/requset";
import { useRouter } from "vue-router";
// import useStoreMethods from "@/hooks/Store";

export default {
	setup() {
		const inputStyle = 'background-color:#ffdcdb;border-bottom-color:#fe1610;'
		let router = useRouter();
		let dataList = centerImgs();
		let personal = usePersonal();
		
		function toLoft(isChange) {
			req.get("api/user/getCode").then((res) => {
				router.push({
					path: "/loft",
					query: {
						tel: isChange ? personal.registerTel.tel : personal.loginTel.tel,
						svg: res.data,
					},
				});
			});
		}

		return {
			toLoft,
			inputStyle,
			personal,
			dataList,
		};
	},
};
</script>

<style lang="less" scoped>
.personal {
	height: 100vh;
	display: grid;
	grid-template-rows: 1fr 8fr 1fr;
}
.personal > header {
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
}
.personal > header > section {
	position: absolute;
	right: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	font-size: 0.8rem;
	cursor: pointer;
	font-weight: bold;
	margin-right: 2vw;
}
.personal > header > section > img {
	height: 5vh;
	width: 3vw;
}
.personal > header > img {
	height: 8vh;
}
.personal > main {
	position: relative;
	background-size: cover;
	background-position: bottom;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}
.box {
	display: flex;
	justify-content: center;
	align-items: center;
}
.login,
.register {
	position: absolute;
	top: 10%;
	padding: 4vh 3vw;
	height: 70%;
	width: 18rem;
	border-radius: 1rem;
	background-color: #fff;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	color: #158fc5;
	font-size: 0.8em;
	transform: rotateY(0deg);
	transition: all 0.5s ease-in;
	backface-visibility: hidden;
}
.login button,
.register button,
.login span {
	cursor: pointer;
}
.register {
	height: 85%;
	top: 0;
	transform: rotateY(180deg);
}
.login > div,
.register > div {
	position: relative;
}
.login > div > input,
.register > div > input {
	width: 100%;
	height: 4vh;
	transition: all 0.3s;
	border-bottom: 2px solid rgba(0, 0, 0, 0.1);
	padding: 0.2em;
}
.login > div > input:focus,
.register > div > input:focus {
	border-bottom: 2px solid #158fc5;
	transition: all 1s;
}
.login p,
.register p {
	position: absolute;
	bottom: -3vh;
	color: #fe1610;
	font-size: 0.6em;
	transform: scale(0.8);
	text-align: left;
}
.login > h2,
.register > h2 {
	align-self: center;
}
.login > a {
	text-decoration: none;
	align-self: center;
	color: #158fc5;
}
.agreement {
	color: #000;
}
.agreement > a {
	color: #158fc5;
}
.code {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.login > .code > button,
.login > .code > input,
.register > .code > button,
.register > .code > input {
	width: 47%;
}
main button {
	color: #fff;
	background-color: #158fc5;
	border-radius: 1rem;
	border: none;
	font-weight: 800;
	height: 5vh;
}
.on-button {
	background-color: #626262;
	padding: 1vh 1.5vw;
}
main input {
	border: none;
	outline: none;
}
.btn {
	position: absolute;
	bottom: 2vh;
	border-radius: 1rem;
	padding: 0.8vh 1.2vw;
	background-color: #fff;
	font-size: 1rem;
}
.btn > span {
	cursor: pointer;
	font-weight: bold;
}
.btn > span.onBtn {
	font-size: 1.2rem;
	color: #158fc5;
}
.personal > footer > ul > li > img {
	width: 1em;
	margin-right: 0.5em;
	transform-origin: right center;
}
.personal > footer > ul {
	font-size: 0.6rem;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}
</style>
