import { customRef } from "vue";

function antiShaking(value, delay){
    return customRef((track, trigger)=>{
        let timer;
        return {
            get(){
                track()
                return value
            },
            set(newValue){
                clearTimeout(timer)
                timer = setTimeout(()=>{
                    value = newValue
                    trigger()
                },delay)
            }
        }
    })
}

export default antiShaking