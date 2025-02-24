"use server" // Esto indica que es código del servidor
import { sendEmail } from "@/app/lib/brevo" //Importamos la función sendEmail asegurandonos de que esten bien las rutas

console.log("📩 sendEmail importado:", sendEmail) // Verifica si está bien importado

export async function handleForm(formData: FormData) { //Función para poder manejar el formulario
  try { //señala un bloque de instrucciones a intentar y especifica una respuesta si se produce una excepción
    const title = formData.get("title") //Le pedimos que al insertar el titulo, la constante tomara ese valor.
    const to_email = formData.get("to_email") //Le pedimos que al insertar el email, la constante tomara ese valor.
    const to_name = formData.get("to_name") //Le pedimos que al insertar el nombre, la constante tomara ese valor.
    const content = formData.get("content") //Le pedimos que al insertar el contenido, la constante tomara ese valor.

    if (!title || !to_email || !to_name || !content) { //En caso de que no se llene todas las casillas
      return { error: "⚠️ Por favor llene todas las casillas" } //Se mostrara un mensaje de error
    }

    await sendEmail({ //Usamos el await para esperar a una promesa. Sólo puede ser usado dentro de una función async function. que esta en la linea 6
      subject: title as string, //Tomara el valor como un string
      to: [{ name: to_name as string, email: to_email as string }], //Tomara el valor como un string
      htmlcontent: content as string, //Tomara el valor como un string
    })

    console.log("✅ Correo enviado correctamente") //Si todo es correcto se mostrara el mensaje
    return { success: true } //Retornara el mensaje de exito
  } catch (error) { //Si hay un error entonces
    console.error("❌ Error al enviar el correo:", error) //Se mostrara el error
    return { error: "Error al enviar el correo" } //Retornara el mensaje de error
  }
}

