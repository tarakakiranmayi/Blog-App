import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import RootLayout from './Components/RootLayout';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import Author from './Components/Author';
import AuthorAddArticle from './Components/AuthorAddArticle';
import AuthorArticle from './Components/AuthorArticle';
import Articleinfo from './Components/Articleinfo';
import User from './Components/User';
import UserArticle from './Components/UserArticle';
function App() {
  let router=createBrowserRouter(
    [
      {
        path:"",
        element:<RootLayout/>,
        children:[
          {
               path:"",
               element:<Home/>
          },
          {
            path:"Login",
            element:<Login/>
          },
          {
            path:"Register",
            element:<Register/>
          }
         ,{
          path:"Author/:username",
          element:<Author/>,
          children:[
            {
              path:"AuthorAddarticle",
              element:<AuthorAddArticle/>
            },
            {
              path:"",
              element:<AuthorArticle/>
            },
            {
              path:"Author/:articleId",
              element:<Articleinfo/>
            }
          ]
         },
         {
          path:"User/:username",
          element:<User/>,
          children:[
            {
              path:"",
              element:<UserArticle/>
            },
            {
              path:"Articles/:articleId",
              element:<Articleinfo/>
            }
          ]
         }
        ]
      },
      
       
    ]
  )
  return (
    <div >
    <RouterProvider router={router}/>
    </div>
  );
}

export default App;
