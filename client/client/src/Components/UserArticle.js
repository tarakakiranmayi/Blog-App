
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { axiosWithToken } from './AxioswithToken';
function UserArticle() {
 
  let navigate=useNavigate()
  let [user,setUser]=useState([])
  async function getArticlesforUser()
  {
    console.log(axiosWithToken)
  let articles= await axiosWithToken.get('http://localhost:4000/user-api/articles')
   console.log(articles.data)
   setUser(articles.data.payload)
}
useEffect(()=>{
  getArticlesforUser()
},[])
function change(obj){
 navigate(`Articles/${obj.articleId}`,{state:obj})
}

  

  return (
    
    <div className='container m-3'>
      
       <div className='row g-3'>
       {user.map((article) => (
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
      ))}
       </div>
    </div>
   
   
  )
}

export default UserArticle

/* */