import { LoadContext } from "@/context/LoaderContext"
import { useContext } from "react"

export const useLoader = () => {
    const constext = useContext(LoadContext)
    if(!constext){
        throw new Error("useLoader must be used within a LoaderProvider")
    }
    return constext
}