/**
 * Manejador de errores personalizado para TS
 */
const getErrorMessage = (error: unknown): string => {
    let message: string 

    if(error instanceof Error){
        message =  error.message
    }else if(error && typeof error === "object" && "message" in error ){
        message =  String(error.message)
    }else if(typeof error === "string"){
        message = error
    }else{
        message = "Error desconocido" 
    }

    return message
}

//Setea el tipo de las respuestas
export type ErrorResponse = {
    error: string
}

export default getErrorMessage
