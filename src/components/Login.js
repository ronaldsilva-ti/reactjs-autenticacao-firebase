import React,{useState} from 'react';


const Login = () => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState(null);
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

        setError(null)
        console.log('Passou em todas validações')
    }

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

export default Login;