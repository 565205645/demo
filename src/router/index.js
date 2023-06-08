import { createRouter, createWebHistory } from "vue-router";

const routes = [
	{
		path: "/",
		name: "personal",
		component: () => import("@/views/Personal/PersonalCenter"),
		children:[
			{
				path:'loft',
				name:'personalLoft',
				component:()=>import('@/views/Personal/Loft/PersonalLoft')
			}
		]
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
