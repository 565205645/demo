import { computed } from "vue";
import { useStore } from "vuex";

export default function useStoreMethods(method, mapArr) {
	const store = useStore();
	let arrFn = method(mapArr);
	const storeState = {};
	Object.keys(arrFn).forEach((item) => {
		const fn = arrFn[item].bind({ $store: store });
		Reflect.set(storeState, item, computed(fn));
	});

	return storeState;
}
