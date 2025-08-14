import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const hash = parseInt(process.env.SALT_ROUNDS || '12')

export async function hashContraseña(texto_plano: string): Promise<string>{
  try {
    const hashed_contraseña = await bcrypt.hash(texto_plano, hash)
    return hashed_contraseña
  } catch (error) {
    throw new Error("Error al hashear la contraseña.");
  }
}

