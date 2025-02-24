"use client" // Necesitamos usar client para las notificaciones
import { handleForm } from "@/app/actions/sendEmail" // Importamos la función del servidor
import { useFormStatus } from "react-dom"
import { toast } from "sonner"

function SubmitButton() { 
  // Componente para el botón de envío
  const { pending } = useFormStatus()

  return (
    <button
      disabled={pending}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {/* Estilo botón creado */}
      {pending ? "Enviando..." : "Enviar"} 
    </button>
  )
}

export default function HomePage() {
  // Exportamos la función

  async function clientAction(formData: FormData) {
    try {
      const result = await handleForm(formData)
      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success("Correo enviado correctamente")
        // Limpiar el formulario
        const form = document.querySelector("form") as HTMLFormElement
        form?.reset()
      }
    } catch (error) {
      toast.error("Error al enviar el correo")
    }
  }

  return (
    // Retornamos el contenido
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-900 text-white">
      {" "}
      {/** Contenedor principal **/}
      <form
        action={
          clientAction
        } /* Cuando se ejecte el forma nosotros tendremos que calcularlo y lo que enviara ese action sera un formData */
        className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md"
      >
        {" "}
        {/** Creación de formulario **/}
        <h2 className="text-xl font-bold text-center mb-4">Enviar Correo</h2> {/** Creación de título **/}
        <input
          type="text" // Definimos el tipo
          name="to_name" // Nombre definido
          placeholder="Nombre"
          required
          className="w-full p-3 mb-3 bg-gray-700 border border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        {/* Estilo de la casilla */}
        <input
          type="text" // Definimos el tipo
          name="title" // Nombre definido
          placeholder="Asunto"
          required
          className="w-full p-3 mb-3 bg-gray-700 border border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        {/* Estilo de la casilla */}
        <input
          type="email" // Definimos el tipo
          name="to_email" // Nombre definido
          placeholder="Para"
          required
          className="w-full p-3 mb-3 bg-gray-700 border border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        {/* Estilo de la casilla */}
        <textarea
          name="content"
          placeholder="Escribe tu mensaje aquí..."
          required
          className="w-full p-3 mb-3 h-32 bg-gray-700 border border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
        ></textarea> 
        {/* Estilo de la casilla */}
        <SubmitButton />
      </form>
      {/* Dev Jefferson en la esquina inferior izquierda */}
      <div className="absolute bottom-4 left-4 text-sm font-semibold opacity-80">Dev Jefferson</div>
    </div>
  )
}

