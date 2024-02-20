import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";


export interface TokenContextType {
    token: string;
    settoken: Dispatch<SetStateAction<string>>;
}

//Contexto
const TokenContext = createContext<TokenContextType>({
    token: '',
    settoken: () => { }
});

const TokenContextProvider = (props: any) => {
    const [token, setToken] = useState<string>('');

    const contextValues: TokenContextType = {
        token: token,
        settoken: setToken
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