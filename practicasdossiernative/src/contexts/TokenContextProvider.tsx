import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";


export interface TokenContextType {
    token: string;
    settoken: Dispatch<SetStateAction<string>>;
    email: string;
    setemail: Dispatch<SetStateAction<string>>;
}

//Contexto
const TokenContext = createContext<TokenContextType>({
    token: '',
    settoken: () => { },
    email: '',
    setemail: () => {}
});

const TokenContextProvider = (props: any) => {
    const [token, setToken] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const contextValues: TokenContextType = {
        token: token,
        settoken: setToken,
        email: email,
        setemail: setEmail
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