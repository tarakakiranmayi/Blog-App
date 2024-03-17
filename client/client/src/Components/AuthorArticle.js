import React from 'react'
import  { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { axiosWithToken } from './AxioswithToken';
import { useSelector } from 'react-redux';
function AuthorArticle() {
  let navigate=useNavigate()
  let [user,setUser]=useState([])
  let {CurrentUser}=useSelector(state=>state.userAuthorLoginReducer)
  console.log(CurrentUser)
  async function getArticlesforUser()
  {
    console.log(axiosWithToken)
  let articles= await axiosWithToken.get(`http://localhost:4000/author-api/articles/${CurrentUser.username}`)
   console.log(articles.data)
   setUser(articles.data.payload)
}

useEffect(()=>{
  getArticlesforUser()
},[])
function change(obj){
 navigate(`Author/${obj.articleId}`,{state:obj})
}
  return (
    <div className='container m-3'>
       <div className='row g-3'>
           {
              user.map((article)=>
              <div className="col" key={article.articleId}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{article.title}</h5>
                  <p className="card-text">
                    {article.content.substring(0, 80) + "...."}
                  </p>
                  <button className="custom-btn btn-4" onClick={()=>change(article)}>
                    <span>Read More</span>
                  </button>
                </div>
                <div className="card-footer">
                  <small className="text-body-secondary">
                    Last updated on {article.dateOfModification}
                  </small>
                </div>
              </div>
            </div>
              )
           }
       </div>
      
    </div>
  )
}

export default AuthorArticle

/*import React from 'react'
import { useNavigate } from 'react-router-dom';
function AuthorArticle() {
  <div className='row g-3'>
           {
              user.map((user)=>
                <div className='col-lg-4 '>
                  <div className='card h-100'>
                    <div className='card-tilte text-center'>{user.title}</div>
                    <div className='card-body'>{user.content}</div>
                    <button onClick={()=>change(user)}>Click</button>
                  </div>
                </div>
              )
           }
       </div>
  let navigate=useNavigate()
  user=[]
  function change(user)
  {
    navigate(`/userDashed/${user.title}`,{state:user})
  }

  return (
    
    <div className='container m-3'>
      
       <div className='row g-3'>
           {
              user.map((user)=>
                <div className='col-lg-4 '>
                  <div className='card h-100'>
                    <div className='card-tilte text-center'>{user.title}</div>
                    <div className='card-body'>{user.content}</div>
                    <button onClick={()=>change(user)}>Click</button>
                  </div>
                </div>
              )
           }
       </div>
    </div>
   
   
  )
}

export default AuthorArticle*/