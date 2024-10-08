import { createContext, ReactNode, useState, useEffect } from 'react';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import Router from 'next/router';
import {toast} from 'react-toastify';
import {api} from '../services/apiClient'

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: ()=> void;
  signUp: (credentials: SignUpProps)=> Promise<void>;
}

type UserProps = {
  id: string;
  name: string;
  email: string;
}

type SignInProps = {
  email: string;
  password: string;
}

type SignUpProps = {
  name: string;
  email: string;
  password: string;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut(){
  try{
    destroyCookie(undefined, '@atendimento.token')
    Router.push('/login')
  }catch{
    console.log("Erro ao deslogar do sistema.")
  }
}



export function AuthProvider({ children }: AuthProviderProps){
  const [user, setUser] = useState<UserProps>()
  const isAuthenticated = !!user;

  useEffect(()=>{
    const {'@atendimento.token': token} = parseCookies();

    
    if(token){
      api.get('/me')
      //Caso de sucesso
      .then(response =>{
        const {id, name, email} = response.data;
      
        setUser({
          id,
          name,
          email
        })
      })
      //Caso de erro, deslogar o usuário
      .catch(()=>{
        signOut();
      })
    }
  },[])

  async function signIn({email, password} : SignInProps){
    try{

      const response = await api.post('/login', {
        email,
        password
      })

      const { id, name, token } = response.data;
      setCookie(undefined, '@atendimento.token', token, {
        maxAge: 60*60*24*30, //Irá expirar em um mês
        path: '/' //Quais caminhos terao acesso ao cookie (todos)
      })

      setUser({
        id, 
        name,
        email
      })

      //Passar para as proximas requisicoes o nosso token
      api.defaults.headers['Authorization'] = `Bearer ${token}`

      toast.success("Logado com sucesso.")

      //Redirecionar o usuario para o dashboard 
      Router.push('/login')

    }catch(err){
      toast.error("Erro ao fazer login.")
      console.log("Erro ao acessar.", err)
    }
  }

  async function signUp({name, email, password}: SignUpProps){
    try{
      const response = api.post('/signup',{
        name,
        email, 
        password
      })
      
      toast.success("Cadastro realizado.")
      Router.push('/login')

    }catch(err){
      toast.error("Erro ao cadastrar")
      console.log("Erro ao cadastrar", err)
    }
  }

  return(
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  )
}