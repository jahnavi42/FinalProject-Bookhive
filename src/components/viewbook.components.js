import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Rating from './rating.component'
import {FiShoppingCart} from 'react-icons/fi'
import {useNavigate} from 'react-router-dom'
import { addToCart, showMsg } from '../reduxStore/main.slice'

function ViewBook() {
  
  let navig=useNavigate()
  let dispatch=useDispatch()
  let book=useSelector(state=>state.main.viewingBook)
  let isLoggedIn=useSelector(state=>state.main.isLoggedIn)

  const handleAddToCart=()=>{
    dispatch(addToCart())
    dispatch(showMsg({msg:"Book added",type:"success"}))
  }
  return (
    <div class="container h-100" style={{marginTop:"100px"}}>
        <div class="row h-100">
            <div class="col-md-12">
              <div className="card pt-2 pb-2">
                <div className='row'>
                  <div className="col-md-3">
                    <img src={book.image} height="250px" width="150px"/>
                  </div>
                  <div className="col-md-9">
                    <div className="col">
                      <strong className='h2'>{book.title}</strong>
                    </div>
                    <div className='row'>
                      <div className="col-md-6 pt-4">
                        {book.desc}
                      </div>
                      <div className='col' style={{borderRight:"1px solid lightgrey"}}>
                      </div>
                      <div className="col-md-4 pt-3 h4">
                        <div className="col p-1">{book.author}</div>
                        <div className="col p-1">{book.category}</div>
                        <div className="col p-1">{book.published}</div>
                        <div className="col p-1"><Rating rating={book.rating}/></div>
                      </div>
                    </div>
                    <div className="col pt-3">
                      {/* style this button!! */}
                      <button className='btn btn-primary' onClick={handleAddToCart} disabled={!isLoggedIn}><FiShoppingCart/> Add to cart</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default ViewBook

