import React, { useState } from 'react'
import UserDashed from './Author'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { axiosWithToken } from './AxioswithToken'
function AuthorAddArticle() {
    let{register,handleSubmit,formState:{errors}}=useForm()
    let navigate=useNavigate()
    let [err,setErr]=useState('')
    let {CurrentUser,errorOccured,errorMessage}=useSelector(state=>state.userAuthorLoginReducer)
  async function postNewArticle(article)
  {
    article.dateOfCreation = new Date();
    article.dateOfModification = new Date();
    article.articleId = Date.now();
    article.author = CurrentUser.username;
    article.comments = [];
    article.status = true;
   //make HTTP post req
   let res=await axiosWithToken.post('http://localhost:4000/author-api/new-article',article)
   console.log(res)
   if(res.data.message==='new article created'){
    navigate(`/Author/${CurrentUser.username}`)
   }else{
    setErr(res.data.message)
   }
  }
  return (
    <div className="container ">
      <div className="row justify-content-center mt-5">
        <div className="col-lg-8 col-md-8 col-sm-10">
          <div className="card shadow">
            <div className="card-title text-center border-bottom">
              <h2 className="p-3">Write an Article</h2>
            </div>
            <div className="card-body bg-light">
              {/* {err.length!==0&&<p className='text-danger fs-5'>{err}</p>} */}
              <form onSubmit={handleSubmit(postNewArticle)}>
                <div className="mb-4">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    {...register("title")}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="category" className="form-label">
                    Select a category
                  </label>
                  <select
                    {...register("category")}
                    id="category"
                    className="form-select"
                  >
                    <option value="programming">Programming</option>
                    <option value="AI&ML">AI&ML</option>
                    <option value="database">Database</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="content" className="form-label">
                    Content
                  </label>
                  <textarea
                    {...register("content")}
                    className="form-control"
                    id="content"
                    rows="10"
                  ></textarea>
                </div>
             {
              err.length!=0 && <p>{err}</p>
             }
                <div className="text-end">
                  <button type="submit" className="text-light">
                    Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
      
  )
}

export default AuthorAddArticle