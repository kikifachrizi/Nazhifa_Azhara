"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Play, Pause, Volume2, Music } from "lucide-react"
import Image from "next/image"

export default function BirthdayPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showGift, setShowGift] = useState(false)
  const [showMusicButton, setShowMusicButton] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const tryAutoplay = async () => {
      if (audioRef.current) {
        try {
          await audioRef.current.play()
          setIsPlaying(true)
        } catch (error) {
          console.log("Autoplay failed, showing manual play button")
          setShowMusicButton(true)
        }
      }
    }

    // Small delay to ensure audio element is ready
    setTimeout(tryAutoplay, 1000)
  }, [])

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
      setShowMusicButton(false)
    }
  }

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in")
        }
      })
    }, observerOptions)

    const sections = document.querySelectorAll(".fade-section")
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  const storyPhotos = [
    { id: 1, img: "1.jpeg", caption: "Aku suka aja foto ini, km cantik pas lagi manyunn" },
    { id: 2, img: "4.jpeg", caption: "Rasa terma kasih aku pada tuhan yang telah menciptakan hambanya yang sangat cantik,imut,lucu menggemaskan wkwk , aku seneng bgt sama kamu gatau harus beribu kata atau berjuta kata yg aku harus sampein buat nyatain perasaan aku sm kamu" },
    { id: 3, img: "8.jpeg", caption: "ini momen km iseng, pakein gelang km yg sekecil itu di tangan kuli jawa kwkwkw" },
    { id: 4, img: "5.jpeg", caption: "si kecil ini gabisa berhenti lucu apa yah, ga skrng ga waktu kecil lucuuu bgtttt aku gemesss wkwkwk" },
    { id: 5, img: "10.jpeg", caption: "Momen yg selalu aku inget, malem ini kita ngobrol sambil cium bau tai kucing wkwkw, dan km panic takut ada AL kwk kocag sih, tapi disini aku inget bgt rasanya di gandeng km dan dipeluk km, ldr selama ini bikin aku kangen bangetttt :(" },
    { id: 6, img: "12.jpeg", caption: "HAHAHA momen ini aku kaget km kok mau di foto pirman buat dikirm ke aku, aku jdi kek bertanya tanya tapi lucu juga yah hwehwe" },
    { id: 7, img: "13.jpeg", caption: "Terima kasih sebesar besarnya pada jotham dan devi yang memprovokasi kita untuk fotbar, sumpah ini momen yg aku seneng bgt dan gaakan pernah menyesal, dan aku bersyukur bgt aku bisa foto sm km waktu wisuda, jadi ada kenangannya gtu loh, biar nnti suatu saat kita bisa nunjukin foto ini ke anak kita HAHAHA , kejauhan yah maap maap wkwk" },
    { id: 8, img: "15.jpeg", caption: "waktu itu kyanya kita malem malem lgi ngerjain TIFA, tpi lagi gabut dan kyanya hujan diluar, asik bgt gangguin km selfie selfie random wkwk" },
    { id: 9, img: "29.jpeg", caption: "cieee bajunya samaan tonenya, lucu bgt awal awal kita handle tim TIFA bareng malah berakhir jadian, di nasi padang lagi hehe" },
    { id: 10, img: "31.jpeg", caption: "Inget momen ini tuh kerasa ga nyangka samsek, dulu kita seproffesional itu, sampe pulang aku gamau nganter, tapi skrng bisa selengket ini sm kamu haha" },
    { id: 11, img: "33.jpeg", caption: "Masih inget ga kamu momen ini, disitu yg km bilang iman km mulai lemah, tapi POV aku , aku udah mulai modus dan nyaman sm km haha , momen km nemenin aku riset product pdhl km bukan siapa siapa aku" },
    { id: 32, img: "32.jpeg", caption: "jujur mngkin kamu ngerasa b aja ya, tpi aku bangga bgt, diwaktu km apply2 kerja tpi kamu pakai waktu luang km buat nyoba nyoba hal baru, kamu tau ga sih sebangga apa aku sm kamu hahaha" },
  ]


  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50">
      {/* Music Control Button - Fixed at top */}
      {showMusicButton && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <Button
            onClick={toggleMusic}
            className="bg-pink-400 hover:bg-pink-500 text-white rounded-full px-6 py-3 shadow-lg animate-bounce"
          >
            <Music className="w-4 h-4 mr-2" />▶ Klik untuk nyalain musik
          </Button>
        </div>
      )}

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className="hidden"
      >
        <source src="/illbe.mp3" type="audio/mpeg" />
      </audio>
      

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-100/20 to-blue-100/20 animate-pulse"></div>
        <div className="text-center z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-800 mb-6 leading-tight">
            Happy Birthday, <span className="text-pink-400 inline-block animate-bounce">Sayang</span>{" "}
            <span className="text-2xl md:text-4xl">🥺</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-light italic max-w-2xl mx-auto leading-relaxed">
            Scroll pelan-pelan ya... Aku bikin ini buat kamu 🤍
          </p>
          <div className="mt-12 animate-bounce">
            <div className="w-6 h-10 border-2 border-pink-300 rounded-full mx-auto relative">
              <div className="w-1 h-3 bg-pink-300 rounded-full mx-auto mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Love Letter Section */}
      <section className="py-20 px-4 fade-section opacity-0 transition-all duration-1000">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 rounded-3xl overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4">Untuk Kamu 💌</h2>
              </div>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                <p className="font-handwriting text-lg md:text-xl text-center italic">
                  "Orang yg paling spesial di hidup akuuuu,
                  <br />
                  Orang yang paling gengsian, ngomong "mau" aja mikir 10x.
                  <br />
                  Terima kasih yaaaaa , udah mau sama akuuuu
                  <br />
                  Tahun ini semoga kamu makin bahagia,lancar semua kegiatannya, diberkahi dan diridhai, aku temenin terus sampai kapanpun kamu mau…"
                </p>
              </div>
              <div className="text-center mt-8">
                <div className="inline-flex items-center space-x-2 text-pink-400">
                  <span className="text-2xl">💕</span>
                  <span className="text-sm font-medium">7 months of us</span>
                  <span className="text-2xl">💕</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Our Story Gallery Section */}
      <section className="py-20 px-4 fade-section opacity-0 transition-all duration-1000">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-700 mb-4">Our Story Gallery</h2>
          <p className="text-center text-gray-600 mb-12 italic">Bukan sepenuhnya cerita tentang kita, tapi kenangan - kenangan ini terlalu manis, jadi aku pengen galeriin biar bisa diliar bareng hehe 📖</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {storyPhotos.map((photo) => (
              <div key={photo.id} className="group">
                <Card className="overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02] bg-white/90 backdrop-blur-sm">
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={`/${photo.img}`}
                      alt={`Our story ${photo.id}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                  </div>
                  <CardContent className="p-6">
                    <p className="font-handwriting text-gray-700 text-base md:text-lg leading-relaxed italic">
                      {photo.caption}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Music Player Section */}
      <section className="py-20 px-4 fade-section opacity-0 transition-all duration-1000">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-8">Lagu Buat Kamu 🎵</h2>
          <Card className="bg-gradient-to-r from-pink-100 to-blue-100 border-0 rounded-3xl shadow-xl">
            <CardContent className="p-8">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <Button
                  onClick={toggleMusic}
                  size="lg"
                  className="rounded-full w-16 h-16 bg-pink-400 hover:bg-pink-500 text-white shadow-lg"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                </Button>
                <div className="text-left">
                  <p className="font-semibold text-gray-700">I'll Be</p>
                  <p className="text-sm text-gray-500">Boyce Avenue</p>
                </div>
                <Volume2 className="w-5 h-5 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600 italic">"Seperti kata lagu ini "I'll be the greatest fan of your life" selamanya aku jadi fans kamuu🤍"</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Ending Section */}
      <section className="py-20 px-4 fade-section opacity-0 transition-all duration-1000">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-white/60 backdrop-blur-sm border-0 rounded-3xl shadow-xl">
            <CardContent className="p-8 md:p-12">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed italic font-light">
                <em>
                  "Sayangku , maaf aku belum bisa jadi cowo yang sempurna buat kamu, cowo yang peka, yang rela nulis panjang lebar kali tinggi = volume waktu kamu ulang tahun hehe , tapi aku janji ya sayang, dengan komitmen kita, kita jalan bareng, bareng bareng insyaallah till jannah, semoga kita diberkahi jalan kamu dipermudah dan untuk kita ya, i always love you but i dont know how much i can tell you ❤️❤️❤️"
                </em>
              </p>
              <div className="mt-8 text-4xl">❤️</div>
              <div className="mt-6 text-sm text-gray-500">Made with love • July 31, 2024</div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-400 text-sm">
        <p>Happy Birthday, my lovee 🤍</p>
      </footer>
    </div>
  )
}
