
import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:4000";

class AuthService {

  login(email, password) {
    return axios
      .post(process.env.REACT_APP_BACKEND_DOMAIN + "/login", {
        email,
        password
      })
      .then(response => {

        if (response.data.token)
         {
          if(response.data.student)
            localStorage.setItem("role", JSON.stringify(response.data.student.role))
          else if (response.data.teacher)
            localStorage.setItem("role", JSON.stringify(response.data.teacher.role))

          localStorage.setItem("user", JSON.stringify(response.data));    //stringify as data is stored as JSON in local storage by nature 
         }
        console.log(response.data)
        return response;
      }).catch((e)=>console.log(e + 'error was catched')
      );
  }

  register(fullname, email, password, mobilenumber) {
    return axios.post(process.env.REACT_APP_BACKEND_DOMAIN + "/signup", {
            fullname,
            email,
            mobilenumber,
            password,
            role: 'student'
            }).then((response)=>{

                if(response.data.token)
                    {
                      localStorage.setItem("user", JSON.stringify(response.data));   
                      if(response.data.student)
                        localStorage.setItem("role", JSON.stringify(response.data.student.role));  
                      else if(response.data.teacher)
                        localStorage.setItem("role", JSON.stringify(response.data.teacher.role));  
                  }
                return response

            }).catch((e)=>console.log(e + 'error was catched'))

    }

  logout() {//lesa kamelha (lazem te remove eltoken from server)
    
    //console.log(authHeader())
    return axios.post(process.env.REACT_APP_BACKEND_DOMAIN + "/logout",undefined,
      {
        headers:authHeader()
      })
      .then(res=>{
        localStorage.removeItem("user");
        localStorage.removeItem("role");
        console.log(res.data)
        return res
      }).catch(e=>{throw new Error(e)})
   
  }
 

  getCurrentUser() { //this is not good because localstorage doesnt have expiration date so it can stay there for ever
   
    return {
      user:JSON.parse(localStorage.getItem('user')),
      role:JSON.parse(localStorage.getItem('role'))
    };
  }

  
}

export default  new AuthService();