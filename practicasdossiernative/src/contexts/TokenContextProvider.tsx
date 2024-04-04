import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";
import { Usuario } from "../types/Usuario";


export interface TokenContextType {
    token: string;
    settoken: Dispatch<SetStateAction<string>>;
    email: string;
    setemail: Dispatch<SetStateAction<string>>;
    usuario: Usuario;
    setusuario: Dispatch<SetStateAction<Usuario>>;
}

//Contexto
const TokenContext = createContext<TokenContextType>({
    token: '',
    settoken: () => {},
    email: '',
    setemail: () => {},
    usuario: null,
    setusuario: () => {}
});

const TokenContextProvider = (props: any) => {
    const [token, setToken] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [usuario, setUsuario] = useState<Usuario>(null);

    const contextValues: TokenContextType = {
        token: token,
        settoken: setToken,
        email: email,
        setemail: setEmail,
        usuario: usuario,
        setusuario: setUsuario
    }

    return (
        <TokenContext.Provider value={contextValues}>
            {props.children}
        </TokenContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(TokenContext);
}

export default TokenContextProvider;