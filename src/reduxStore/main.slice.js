import {createAsyncThunk, createSlice, TaskAbortError} from "@reduxjs/toolkit"
import {
    httpGetBooks,
    httpGetOrders,
    httpAddBook,
    httpUpdateBook,
    httpUpdateOrderStatus,
    httpPlaceOrder,
    httpValidateLogin,
    httpGetOrdersOfUser,
    httpRegisterUser,
    httpCancelOrder,
    httpDeleteBook
} from '../requests/requests'

import NotificationManager from "react-notifications/lib/NotificationManager"

const initalState={
    isAdmin:false,
    username:null,
    pass:null,
    isLoggedIn:false,
    books:[],
    cart:[],
    order:[],
    viewingBook:null,
    cartTotal:null,
    loading:false,
    displayMode:false,
    userAddress:null

    // cartItem => book props+qty+subtotal
    // order    => info+cartItemsprops+status+

}


// thunk creation using createAsyncThunk
// 1) create a funtion like below for an async task
// 2) add the case to for that functon.[fullfilled,rejected,pending] to the builder addCase()
// 3) handle state updates there
// 4) export the function for use in components ( use same as normal actions)

// https://redux-toolkit.js.org/api/createAsyncThunk#:~:text=thunkAPI%20%3A%20an%20object%20containing%20all,middleware%20on%20setup%2C%20if%20available
// refer this one

// createAsyncThunk's function is called "payloadCreator"
// createAsycThunk accepts first param as arg

export const getAllBooks=createAsyncThunk('/main/getAllBooks',async ()=>{
    // erasing await gives same op?? (how?)
    const res=await httpGetBooks()
    console.log(res)
    return res
})

export const placeOrder=createAsyncThunk('/main/placeOrder',async (arg,{dispatch,getState})=>{
    let {cart,cartTotal,username,userAddress}=getState().main
    console.log("In place order")
    const res=await httpPlaceOrder(cart,cartTotal,username,userAddress)
    console.log(res)
    return res
})

export const cancelOrder=createAsyncThunk('/main/cancelOrder',async({id})=>{
    const res=await httpCancelOrder(id)
    return {...res,id:id}
})

export const getAllOrders=createAsyncThunk('/main/getAllOrders',async (arg,{dispatch,getState})=>{
    let {isAdmin,username} = getState().main
    let res=null
    console.log(username)
    if(isAdmin)
        res=await httpGetOrders()
    else
        res=await httpGetOrdersOfUser(username)
    console.log(res)
    return res
})

export const validateLogin=createAsyncThunk('main/validateLogin',async ({username,password},{dispatch})=>{
    dispatch(setUserInfo({username:username,password:password}))
    const res=await httpValidateLogin(username,password)
    return res
})

export const registerUser=createAsyncThunk('main/registerUser',async ({username,password})=>{
    const res=await httpRegisterUser(username,password)
    return res
})

export const deleteBook=createAsyncThunk('/main/deleteBook',async ({title})=>{
    const res=await httpDeleteBook(title)
    return {...res,title:title}
})

export const saveBook=createAsyncThunk('/main/modifyBook',async ({modTitle,modBook,modified},{dispatch})=>{
    let res=null
    
    if(modified)
        res=await httpUpdateBook(modTitle,modBook)
    else
        res=await httpAddBook(modBook)
    dispatch(showMsg({msg:"Book catalog updated refresh",type:"info"}))
    return res
})


const mainSlice= createSlice({
    name:"main",
    initialState:initalState,
    reducers:{
        // decide on all reducers here
        setLoader:(state,action)=>{
            state.loading=action.payload
        },
        toggleDisplayMode:(state)=>{
            state.displayMode=!state.displayMode
        },
        setViewBook:(state,action)=>{
            state.viewingBook=action.payload
        },
        setUserInfo:(state,action)=>{
            console.log(action.payload)
            state.username=action.payload.username
            state.password=action.payload.password
        },
        setAdmin:(state)=>{
            state.isAdmin=true
        },
        logout:(state)=>{
            state.isLoggedIn=false
            state.isAdmin=false
            state.username=null
            state.password=null
        },
        setCartTotal:(state,action)=>{
            state.cartTotal=action.payload
        },
        setUserAddress:(state,action)=>{
            state.userAddress=action.payload
        },
        setOrders:(state,action)=>{
            state.order=[...action.payload]
        },
        setCartItems:(state,action)=>{
            state.cart=action.payload
        },
        removeCartItem:(state,action)=>{
            state.cart=state.cart.filter(cartBook=>cartBook.title!=action.payload)
        },
        addToCart:(state,action)=>{
            let cartBook={...state.viewingBook}
            console.log(cartBook)
            let adder=action?.payload?.adder||1
            if(state.cart.map(book=>book.title).includes(cartBook.title))
            {
                // handling duplicate cart items by incrementing its qty count
                console.log(state.cart)
                let bkInd=state.cart.findIndex(book=>book.title==cartBook.title)
                state.cart[bkInd].qty+=adder;
                state.cart[bkInd].subTotal+=(state.cart[bkInd].price*adder)
            }else{
                cartBook.qty=1
                cartBook.subTotal=cartBook.price
                state.cart=[...state.cart,cartBook]
            }
            console.log(state.cart)
        },
        showMsg:(state,action)=>{
            switch (action.payload.type) {
                case 'info':
                  NotificationManager.info(action.payload.msg,null,1000);
                  break;
                case 'success':
                  NotificationManager.success(action.payload.msg,null,1000);
                  break;
                case 'warning':
                  NotificationManager.warning(action.payload.msg,null,1000);
                  break;
                case 'error':
                  NotificationManager.error(action.payload.msg,null,1000)
                  break;
                default:
                    break;
            }
        }
    },
    extraReducers(builder){
        builder
            .addCase(getAllBooks.pending,(state,action)=>{
                console.log("made req")
                state.loading=true
            })
            .addCase(getAllBooks.fulfilled,(state,action)=>{
                console.log("fulfilled books")
                console.log(action.payload)
                state.books=action.payload
                state.loading=false
            })
            .addCase(getAllBooks.rejected,(state,action)=>{
                console.log("err books")
                console.log(action.payload)
                state.books=null
            })
            .addCase(validateLogin.fulfilled,(state,action)=>{
                let {status,isAdmin}=action.payload
                state.isLoggedIn=status=="success"?true:false
                state.isAdmin=isAdmin
                console.log("im herhe"+JSON.stringify(action.payload))
            })
            .addCase(validateLogin.rejected,(state,action)=>{
                state.isLoggedIn=false
                state.username=null
                state.password=null
            })
            .addCase(getAllOrders.fulfilled,(state,action)=>{
                state.order=action.payload
            })
            .addCase(placeOrder.fulfilled,(state,action)=>{
                state.cart=[]
                state.cartTotal=null
                console.log("fullfilled places ")
                console.log(action.payload)
            })
            .addCase(registerUser.fulfilled,(state)=>{
                console.log("User register done!")
            })
            .addCase(cancelOrder.fulfilled,(state,action)=>{
                state.order=state.order.filter(order=>order.id!=action.payload.id)
                console.log("Order cancleed!")
            })
            .addCase(deleteBook.fulfilled,(state,action)=>{
                state.books=state.books.filter(book=>book.title!=action.payload.title)
                console.log("Book deleted "+action.payload.title)
            })
            .addCase(saveBook.fulfilled,(state,action)=>{
                console.log("Saved ")
            })
    }
})


export const { setLoader,setViewBook,setAdmin,
    showMsg,setUserInfo,logout,
    addToCart,setCartTotal,setOrders,
    removeCartItem,setCartItems,toggleDisplayMode,
    setUserAddress
    
 }=mainSlice.actions
export default mainSlice.reducer

// export const { addManga, delManga, replicateManga } = mangaSlice.actions;
// export default mangaSlice.reducer;