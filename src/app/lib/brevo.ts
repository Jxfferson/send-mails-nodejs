import brevo from "@getbrevo/brevo" //Importamos la libreria brevo

if (!process.env.BREVO_API_KEY) { //Verificamos si la API Key esta configurada correctamente
  throw new Error("BREVO_API_KEY no está configurada en las variables de entorno") //Si no esta configurada la API Key lanzara un error
}

const apiInstance = new brevo.TransactionalEmailsApi() //Creamos una instancia de la clase TransactionalEmailsApi

apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY) //Forma correcta de configurar la API Key

interface Params { //Creamos un tipo de interfaz para los parametros
  subject: string //Asignamos el asunto del correo
  to: { email: string; name: string }[] //Se asigna el destinatario con email y nombre
  htmlcontent: string //Asignamos el contenido del correo
}

export async function sendEmail({ subject, to, htmlcontent }: Params) {  //Función exportada para asi enviar el correo
  //Función exportada para enviar el correo
  try { //señala un bloque de instrucciones a intentar y especifica una respuesta si se produce una excepción
    console.log("✉️ Preparando el correo...") //Mensaje de preparación del correo

    const smtpEmail = new brevo.SendSmtpEmail() //Creamos la instancia de la clase SendSmtpEmail
    smtpEmail.subject = subject //Asignamos el asunto del correo, basicamente lo ingresado en la web va a ser tomado como subject y este es lo que se enviara
    smtpEmail.to = to //Para que se vea a la persona que ingresemos el correo
    smtpEmail.htmlContent = `<html><body>${htmlcontent}</body></html>` 
    smtpEmail.sender = { name: "JeffersonDev", email: "tucorreo@example.com" } //Agregas tu nombre y el correo donde se enviara todo

    console.log("📨 Enviando correo a Brevo API...") //Mensaje de envio 

    const response = await apiInstance.sendTransacEmail(smtpEmail) //Enviamos el correo a la API de Brevo
    console.log("✅ Respuesta de Brevo:", response) //Mensaje de respuesta
    return response //Retornamos la respuesta
  } catch (error) { //si hay un error entonces
    console.error("❌ Error al enviar el correo:", error) //se imprimira el error
    throw error
  }
}

