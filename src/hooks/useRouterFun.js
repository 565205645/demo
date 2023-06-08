import { useRoute, useRouter } from "vue-router"

export default function useRouterFun(){
    let router = useRouter()
    let route = useRoute()
    
    return {
        router,
        route
    }
}