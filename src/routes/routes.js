import { Switch , Route, BrowserRouter as Router, Redirect} from 'react-router-dom'
import Guard from './guard'
import Login from '../pages/login'
import Register from '../pages/register'
import Home from '../pages/home'
import Application from '../pages/application'

const routes = [
    {
        path:"/login", 
        component: Login,
        guard: false
    },
    {
        path:"/register", 
        component: Register,
        guard: false
    },
    {
        path:"/home", 
        component: Home,
        guard: true
    },
    {
        path:"/application", 
        component:Application,
        guard: true
    }
]
const shouldGuard = (route, path) =>{
    console.log(path + route.path)
 if (route.guard) return <Guard route={route} path={path}/>
  
  return <Route exact path={path + route.path} component={route.component} />

}


export default  function (){
  return<>  
    <Router>

        {
            routes.map((route) =>{
                if(route.children){
                    return   <Route
                        exact
                        path={route.path}
                        children={                
                            <Switch>{route.children.map((subRoute) => shouldGuard(subRoute, route.path))}</Switch>      
                        }
                      />
                  
                 }
                return shouldGuard(route , "")
                 
            })
            
        }
        {/* <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} /> */}
        {localStorage.getItem('token')? <Redirect from="/" to="/home" />: <Redirect from="/" to="/login" />}
    </Router>
    </>
}