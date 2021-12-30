
import React,{createContext,useState} from 'react'
import AuthService from '../services/auth.service'


const AuthenticatedContext =createContext({
    AuthenticatedUser:undefined,
    AuthenticatedUserRole:undefined

})

export function AuthenticatedContextProvider(props){
    const [authenticateduser,setauthenticateduser]=useState(undefined)
    const [authenticateduserRole,setauthenticateduserRole]=useState(undefined)
    

    function SetAuthenticatedUser(){
        if(AuthService.getCurrentUser())
            {
                setauthenticateduserRole(AuthService.getCurrentUser().role)
                setauthenticateduser(AuthService.getCurrentUser().user)     
            }

        else
           { 
               setauthenticateduserRole(undefined)
               setauthenticateduser(undefined)
            }
        
    }

    const context ={
        AuthenticatedUser:authenticateduser,
        AuthenticatedUserRole:authenticateduserRole,
        SetAuthenticatedUser:SetAuthenticatedUser
    }


    return <AuthenticatedContext.Provider value={context}>
        {props.children}
    </AuthenticatedContext.Provider>
}

export default AuthenticatedContext;