import {createSlice} from'@reduxjs/toolkit';

const cartSlice = createSlice({
    name:'cart',
    initialState:{
        products: JSON.parse(localStorage.getItem("cart"))?.products||[],
        quantity: JSON.parse(localStorage.getItem("cart"))?.quantity ||0,
        total: JSON.parse(localStorage.getItem("cart"))?.total ||0,
    },
    reducers:{
        addProduct: (state,action)=>{
            state.products.push(action.payload);
            state.quantity = handleCartQuantity(JSON.stringify(state));
            state.total += action.payload.price * action.payload.quantity
            const localCart = JSON.stringify(state);
            console.log("localCart", JSON.parse(localCart)
            );
            localStorage.setItem("cart",localCart);
        },
        removeProduct: (state,action)=> {
            const rs = (JSON.parse(JSON.stringify(state))).products.filter(product => product._id !== action.payload);
            state.products = rs;
            state.quantity = rs.length;
            const total = rs.reduce((total, {price}) => total + price, 0);
            state.total = total;
            
            const localCart = JSON.stringify(state);
            localStorage.setItem("cart",localCart);
        },
    },
})

const handleCartQuantity = (value) => {
    const valChange = JSON.parse(value);
    const product = new Set(valChange.products.map(p => p._id));
    return [...product].length; 
}

export const { addProduct, removeProduct }= cartSlice.actions
export default cartSlice.reducer