import crypto from "crypto"

export function generarContraseña(longitud: number = 8): string {
  if (process.env.ENV === "dev") {
    return "contraseña"
  }

  const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"
  const valoresAleatorios = new Uint32Array(longitud)
  crypto.getRandomValues(valoresAleatorios)

  let contraseña = ""
  for (let i = 0; i < longitud; i++) {
    contraseña += caracteres[valoresAleatorios[i] % caracteres.length]
  }
  console.log("+++++++++++++++++++")
  console.log(contraseña)
  console.log("+++++++++++++++++++")
  return contraseña
}
