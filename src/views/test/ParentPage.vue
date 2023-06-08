<template>
	<div>
		默认页面
		<button @click="tonext">跳转页面</button>
		<button>跳转下一页</button>
        <router-view ></router-view>
        <router-view name="headPart"></router-view>
        <router-view name="navPart"></router-view>
	</div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
	setup() {
        const router = useRouter()
        function tonext(){
            console.log(router.getRoutes());
            router.push({path:'/parent/child'})
            
        }
		return {
            tonext
        };
	},
};
</script>

<style lang="less" scoped></style>
