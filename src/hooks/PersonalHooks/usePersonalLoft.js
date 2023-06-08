import { onBeforeMount, reactive } from "vue"
import { useRoute, useRouter } from "vue-router"
import { getCodeImg } from "../req"
import req from "@/utils/requset"
import { useStore } from "vuex"

export default function usePersonalLoft(){
    let route = useRoute()
    let router = useRouter()
    let store = useStore()
    let loftMsg = reactive({
        svg:'',
        code:''
    })
    
    onBeforeMount(() => {
        console.log('query',route.query);
        loftMsg.svg = route.query.svg
    })

    function back(){
        router.go(-1)
    }


    function toConfirm(){
        req.post("api/user/telCode", {
            mathCode: loftMsg.code,
                telephone: route.query.tel,
            })
            .then((res) => {
                console.log('toConfirm',res.data);
                store.state.fn(res.data.status)
                router.push({path:"/"})
            });
    }
    function getSvg(){
        let svg = getCodeImg()
        console.log(svg.imgs);
        loftMsg.svg = svg.imgs
        console.log('loft',loftMsg.svg);
    }

    return {
        back,
        getSvg,
        toConfirm,

        loftMsg
    }
}