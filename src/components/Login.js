import React,{useState, useCallback} from 'react';
import {auth,db} from '../firebase';
import {withRouter} from 'react-router-dom';


const Login = (props) => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState(null);
    const [success,setSuccess] = useState(null)
    const [registro,setRegistro] = useState(false);

    const processaDados = (e) => {
        e.preventDefault();

        //Validação
        if(!email.trim()){
            setError('Informe um e-mail')
            return;
        }
        if(!password.trim()){
            setError('Informe uma senha')
            return;
        }
        if(password.trim().length < 6){
            setError("Insira uma senha com 6 caracteres ou mais");
            return;
        }
        //Mensagem de erro
        setError(null)

        //Existe registro, chama a função
        if(registro){
            registrar()
        }else{
            login()
        }
    }

    const login = useCallback(async () => {
        try {
            const res = await auth.signInWithEmailAndPassword(email,password);
            console.log(res)
            setSuccess('');
            setEmail('');
            setPassword('');
            setError(null);    
            props.history.push('/admin')
        } catch (error) {
            console.log(error)
            if(error.code === 'auth/invalid-email'){
                setError('E-mail inválido...')
            }
            if(error.code === 'auth/user-not-found'){
                setError('E-mail não registrado...')
            } 
            if(error.code === 'auth/wrong-password'){
                setError('Senha incorreta')
            }
        }


    },[email,password, props.history])
    
    const registrar = useCallback(async () => {
        try {
            const res =  await auth.createUserWithEmailAndPassword(email,password)
            console.log(res.user);
                await db.collection('usuarios').doc(res.user.email).set({
                    email:res.user.email,
                    uid:res.user.uid
                })
                
            setSuccess('Usuario cadastrado!');
            setEmail('');
            setPassword('');
            setError(null);            
            props.history.push('/admin')

        } catch (error) {
            console.log(error)
            if(error.code === 'auth/invalid-email'){
                setError('E-mail Invalido')
            }
            if(error.code === 'auth/email-already-in-use'){
                setError('Usuario ja existente')

            }
            
        }
    },[email,password, props.history])

    return(        
        <div className="mt-5">
           <h3 className="text-center">
                {
                    registro ? 'Registro de Usuario' : 'Login de Usuario'
                } 
           </h3>
            <hr/>
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">

                    {
                        error ? (
                            <div className="alert alert-danger">
                                {error}
                            </div>    
                        ) : null
                    }

                    {
                        success && registro === true ? (
                            <div className="alert alert-success">
                                {success}
                            </div>
                        ) : null
                    }
                    
                    <form
                        onSubmit={processaDados}
                    >
                        <input
                            type="email"
                            className="form-control mb-2"
                            placeholder="Informe um e-mail" 
                            onChange={e => setEmail(e.target.value)}   
                            value={email}                    
                        />

                        <input
                            type="password"
                            className="form-control mb-2"
                            placeholder="Informe uma Senha"  
                            onChange={e => setPassword(e.target.value)} 
                            value={password}    
                        />  

                        <button className="btn btn-dark btn-lg btn-block" type="submit">
                           {
                               registro ? ' Registrar-se' : 'Acessar'
                           }
                        </button>


                        <button 
                            className="btn btn-info btn-sm btn-block"
                            type="button"
                            onClick={() => setRegistro(!registro)}
                            >
                                {
                                    registro ? 'Já possui uma conta?' : 'Não esta cadastrado?'
                                }
                        </button>   
                    </form>
                </div>

            </div>

        </div>

    )


}

export default withRouter(Login);