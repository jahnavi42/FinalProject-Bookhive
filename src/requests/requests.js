import axios from "axios";
// import demoData from './data/demoData.json'
import demoData from './data/demoDataWDesc.json'

// import demoData from './data/demoDataLatest.json'

import demoDataOrders from './data/demoOrderData.json'

const baseUrl="http://ServerUrlhere"

const isProd=false

let demoBooks=demoData

// book=>


// order => id, status 

// create an orders array here!
let demoOrders=demoDataOrders

const promiseCreator=(data)=>{
    return new Promise((resolve,reject)=>{
        resolve(data)
    })
}

const makeGetReq=(url)=>{
    return axios.get(baseUrl+url)
}

const makePostReq=(url,data)=>{
    return axios.post(baseUrl+url,{data:data})
}

export const httpGetBooks=()=>{
    if(!isProd){
        console.log("waas here")
        return promiseCreator(demoBooks)
    }else{
        // add route here
        return makeGetReq('/getBooks')
    }
}

export const httpAddBook=(newBook)=>{
    if(!isProd){
        demoBooks.push(newBook)
        return promiseCreator({status:"success"})
    }else{
        // check if same title exists on backend!
        //  and return appropriately
        return makePostReq('/addbook',newBook)
    }
}

export const httpUpdateBook=(bkTitle,modBook)=>{
    // modifying a book means
    // the title will be fixed anything else can be changed
    // so use modBook.title to access it and set the new values there

    if(!isProd){
        demoBooks.map(book=>{
            if(book.title==bkTitle)
            return modBook
            return book
        })
        return promiseCreator({status:"success"})
    }else{
        return makePostReq('/updatebook',modBook)
    }
}

export const httpGetOrders=()=>{
    if(!isProd){
        return promiseCreator(demoOrders)
    }else{
        return makeGetReq('/getorders')
    }
}

export const httpGetOrdersOfUser=(username)=>{
    if(!isProd){
        console.log("err")
        console.log(username)
        return promiseCreator(demoOrders.filter(order=>order.placedBy==username))
    }else{
        return makeGetReq('/getorder/'+username)
    }
}

export const httpUpdateOrderStatus=(orderId,status)=>{
    // status is default set to "pending" when order is made
    // admin can do "success" or "failure" on the admin portal
    // here it is true:succes and false:failure

    if(!isProd){
        demoOrders.map(order=>{
            if(order.id==orderId){
                order.status=status?"success":"failure"
                return order
            }
            return order
        })
        return promiseCreator({status:"success"})
    }else{
        return makePostReq('/updateorder',{orderId:orderId,status:status})
    }
}

export const httpPlaceOrder=(cartBooks,total,placedBy)=>{
    // a
    if(!isProd){
        let newOrder={
            id:Date.now(),
            books:cartBooks,
            total:total,
            status:"pending",
            placedBy:placedBy
        }
        console.log(JSON.stringify(newOrder))
        demoOrders.push(newOrder)
        return promiseCreator({status:"success",id:newOrder.id})
    }else{
        let newOrder={
            books:cartBooks,
            total:total,
            status:"pending",
            placedBy:placedBy
        }
        // backend must generate id for the object and return it in response
        return makePostReq('/placeorder',{order:newOrder})
    }
}

export const httpValidateLogin=(username,password)=>{
    if(!isProd){
        return promiseCreator({status:"success"})
    }else{
        return makePostReq("/validate",{username:username,password:password})
    }
}

export const httpRegisterUser=(username,password)=>{
    if(!isProd){
        // push user to the user demo array maybe????
        return promiseCreator({status:"success"})
    }else{
        return makePostReq("/registeruser",{username:username,password:password})
    }
}

