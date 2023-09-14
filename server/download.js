import ytdl from "ytdl-core"
import fs from "fs"

export const download = (idVideo) =>
  new Promise((resolve, reject) => {
    const URLVideo = "https://www.youtube.com/shorts/" + idVideo

    console.log("realizando o download do Vídeo: ", idVideo)

    ytdl(URLVideo, { quality: "lowestaudio", filter: "audioonly" })
      .on("info", (info) => {
        const seconds = info.formats[0].approxDurationsMs / 1000

        if (seconds > 60) {
          throw new Error("Vídeo é maior que 60 segundos!")
        }
      })
      .on("end", () => {
        console.log("Download concluído!")
        resolve()
      })
      .on("error", (error) => {
        console.log(
          "Não foi possível realizar o download do vídeo! Motivo: ",
          error
        )
        reject(error)
      })
      .pipe(fs.createWriteStream("./temp/audio.mp4"))
  })
