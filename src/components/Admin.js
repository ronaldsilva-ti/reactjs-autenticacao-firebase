import React, { useEffect, useState } from 'react';
import {auth} from '../firebase';
import {withRouter} from 'react-router-dom'



const Admin = (props) => {
    
    const [user,setUser] = useState(null)

    useEffect(() => {
        if(auth.currentUser){
            console.log('existe um usuario')
            setUser(auth.currentUser)
        }else{
            console.log('não existe um usuario')
            props.history.push('/login')
        }

    },[ props.history])



    return(
        <div>
             <h1 className="text-center">Rota Protegida</h1>

             {
                 user && (
                    <h3>{user.email}</h3>
                 )


             }
        </div>

    )
}

export default withRouter(Admin)