
export const one = {
    namespaced:true,
    state(){
        return{
            num:1
        }
    },
    mutations:{
        add(state){
            state.num++
        }
    }
}