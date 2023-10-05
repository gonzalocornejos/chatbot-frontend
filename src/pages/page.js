import React, { useState } from "react";
import axios from "axios"; // Asegúrate de importar axios
import './page.css'

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    const newMessage = {
      id: messages.length + 1, // Asigna un ID único a cada mensaje
      input: input, // Define el rol del mensaje como "user"
      output: "",
    };

    // Usar setMessages con una función para actualizar el estado
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    console.log("entre");
    setIsLoading(true)
    var payload = messages.concat(newMessage)
    // Realizar una solicitud POST con axios (requiere una URL)
    axios
      .post(`https://localhost:7261/api/v1/Chatbot/generar-respuesta`, payload)
      .then((response) => {
        setIsLoading(false);
        setInput(""); // Limpiar el input después de enviar
        console.log(response);
        setMessages(response.data);
      })
      .catch((error) => {
        console.error("Error al enviar el mensaje:", error);
        setIsLoading(false);
      });
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <section className={"pagina"}>
      <div className="max-w-xl w-full">
        <div className="areaMensaje">
          {messages.map((m) => (
            <div>
                <div
                key={m.id}
                className={"user"}
                >
                    <span
                    className={`text-xs text-left`}
                    >
                    {"User"}
                    </span>{" "}
                    {m.input}
                </div>
                <div
                key={m.id}
                className={"assistant"}
                >
                    <span
                    className={`text-xs text-right`}
                    >
                    {"Assistant"}
                    </span>{" "}
                    {m.output}
                </div>
            </div>
          ))}
        </div>

        <div className="cajaAbajo">
          <label className="texto">
            Say something...
          </label>
          <button
            type="submit" // Agrega el tipo "submit" al botón para que funcione en el formulario
            className="boton"
            disabled={isLoading || !input}
            onClick={() => handleSubmit()}
          >
            Send
          </button>
        
            <textarea
            rows={4}
            value={input}
            onChange={(event) => handleInputChange(event)}
            className="input"
            placeholder="Type something..."
            autoFocus
            />
        </div>
      </div>
    </section>
  );
}
