<template>
	<div class="loft" @click="loft.back">
		<div class="dialog" @click.stop="''">
			<section>
				<p v-html="loft.loftMsg.svg" @click="getSvg"></p>
				<input type="text" v-model="loft.loftMsg.code" />
			</section>
			<section>
				<button @click="loft.toConfirm">确定</button>
				<button @click="loft.back">取消</button>
			</section>
		</div>
	</div>
</template>

<script>
import usePersonalLoft from "@/hooks/PersonalHooks/usePersonalLoft";
import req from "@/utils/requset";
export default {
	setup() {
		let loft = usePersonalLoft();

		function getSvg() {
			req.get("api/user/getCode").then((res) => {
				loft.loftMsg.svg = res.data;
			});
		}
		return {
			loft,
			getSvg,
		};
	},
};
</script>

<style lang="less" scoped>
.loft {
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.5);
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	.dialog {
		background-color: #fff;
		width: 30vw;
		height: 35vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		input {
			width: 18vw;
			outline: none;
			text-align: center;
		}
		button {
			width: 10vw;
			margin-top: 2vh;
			margin-right: 2vw;
		}
	}
}
</style>
