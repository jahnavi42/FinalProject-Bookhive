import React, { useCallback, useEffect, useState } from 'react'
import {showMsg, validateLogin} from '../reduxStore/main.slice'
import { useDispatch, useSelector } from 'react-redux'
import CategoryBar from './category.component'
import { getAllBooks } from '../reduxStore/main.slice'

function Home() {

  let dispatch=useDispatch()
  const books=useSelector(state=>state.main.books)
  let [queryString,setQueryString]=useState("")

  const searchBarOnChange=(e)=>{
    setQueryString(e.target.value.toLowerCase())
  }

  useEffect(()=>{
    dispatch(getAllBooks())
  },[])


  const bookFilter=({title,author,category,published})=>{
    if(queryString=='')
    return true
    if(
      author.toLowerCase().includes(queryString)||
      category.toLowerCase().includes(queryString)||
      title.toLowerCase().includes(queryString)||
      queryString.toLowerCase().includes(published)
    )
    return true
    else
    return false
  }
  
  return (
    <div className='row ps-4 pt-3 d-flex align-items-center justify-content-center'>
      <div className="row" style={{width:"75%"}}>
      <input 
        type="search" 
        id="form1" 
        class="form-control" 
        placeholder='Type to search...'
        onChange={searchBarOnChange}
        style={{border:"1px solid grey"}}
      />
        </div>
        <div className='row pt-4'>
          
          {books&&books
            .filter(bookFilter)
            .map(book=>book.category)
            .filter((e,i,a)=>a.indexOf(e)===i)
<<<<<<< HEAD
<<<<<<< HEAD
            .map(category=><CategoryBar category={category} key={category}/>)}
            {/* .map(category=><CategoryBar category={category} key={category} bookFilter={bookFilter} />)} */}
=======
            .map(category=><CategoryBar category={category} key={category} bookFilter={bookFilter} />)}
>>>>>>> Divya
=======
            .map(category=><CategoryBar category={category} key={category} bookFilter={bookFilter} />)}
>>>>>>> ebcd366b09d0c1e1ccc9db8566c56027ccb3e029
        </div>
    </div>
  )
}

export default Home