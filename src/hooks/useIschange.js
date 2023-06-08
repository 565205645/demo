import { ref } from "vue"

export default function useIschange(bool = true){
    let isChange = ref(bool)
    function toFalse(){
        isChange.value = false
        console.log(isChange.value);
    }
    function toTrue(){
        isChange.value = true
        console.log(isChange.value);
    }
    return {
        isChange,
        toTrue,
        toFalse
    }
}