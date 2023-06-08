import { reactive,watch } from "vue"

export default function useWacth(name,RegExp = /^\s*$/){
    let list = reactive({
        isShow:false,
        [name]: ''
    })
    watch(list,(newV)=>{
        RegExp.test(newV[name]) ? list.isShow = false: list.isShow = true
    })
    return list
}