import { server } from "./server"
const input = document.getElementById("url")
const form = document.getElementById("form")
const content = document.getElementById("content")

form.addEventListener("submit", async (event) => {
  event.preventDefault()
  content.classList.add("placeholder")
  const videoURL = input.value

  if (!videoURL.includes("shorts")) {
    alert("O vídeo não é um shorts!")
    form.reset()
    return
  }
  const [_, shortIDFull] = videoURL.split("/shorts/")
  const [shortID] = shortIDFull.split("?si")

  content.textContent = "Obtendo o texto do áudio..."

  const transcription = await server.get("/summary/" + shortID)

  content.textContent = "Resumindo o vídeo..."

  const summary = await server.post("/summary", {
    text: transcription.data.result,
  })
  content.classList.remove("placeholder")
  content.textContent = summary.data.result
    form.reset()
})
