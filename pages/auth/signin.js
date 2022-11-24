import {getProviders, signIn} from "next-auth/react"
import Image from "next/image";

const Signin = ({providers}) => {
  return (
    <div className="flex flex-col min-h-screen max-w-full">
        <div className="flex  min-h-max flex-1 items-center justify-center">
                { Object.values(providers).map((provider) => (
                    <button 
                        key={provider.id}
                        className="bg-red-400 p-4 rounded-lg text-white"
                        onClick={() => signIn(provider.id, {callbackUrl: '/'})}
                    >
                        Sign in with {provider.name}
                    </button>
                )) }                
            
        </div>
        
    </div>
  )
}

export default Signin;

export async function getServerSideProps(){
    const providers = await getProviders();
    return {
        props: {
            providers
        }
    }
}
