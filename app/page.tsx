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
    {
      id: 1,
      caption:
        "Hari itu pertama kali kita jalan bareng, padahal kamu bilang 'gak suka jalan' eh ternyata betah juga ya sama aku 😏",
    },
    {
      id: 2,
      caption: "Inget gak waktu kita makan di tempat itu? Kamu bilang makanannya aneh tapi habis juga satu porsi 😂",
    },
    {
      id: 3,
      caption: "Foto ini diambil pas kamu lagi ngambek sama aku, tapi tetep mau difoto. Lucu banget deh kamu tuh 🥺",
    },
    {
      id: 4,
      caption:
        "Hari hujan tapi kita tetep jalan, basah-basahan tapi seneng. Dari situ aku tau kamu orangnya spontan juga",
    },
    {
      id: 5,
      caption: "Selfie pertama kita! Kamu malu-malu tapi aku maksa terus. Sekarang udah biasa kan selfie sama aku? 📸",
    },
    {
      id: 6,
      caption: "Waktu kamu tidur di mobil, aku foto diam-diam. Kamu kesel banget pas tau, tapi lucuu 😴",
    },
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
        <source src="/I'll Be.mp3" type="audio/mpeg" />
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
                  "Aku tau kamu cuek dan gak suka drama,
                  <br />
                  Tapi aku juga tau, kamu orang paling peduli walau gak ngomong.
                  <br />
                  Terima kasih ya, udah bertahan 7 bulan sama orang kayak aku.
                  <br />
                  Tahun ini semoga kamu makin bahagia, aku temenin terus sampai kapanpun kamu mau…"
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
          <p className="text-center text-gray-600 mb-12 italic">Cerita kita dalam foto-foto 📖</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {storyPhotos.map((photo) => (
              <div key={photo.id} className="group">
                <Card className="overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02] bg-white/90 backdrop-blur-sm">
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={`/placeholder.svg?height=400&width=500&query=romantic couple moment ${photo.id}`}
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
              <p className="text-sm text-gray-600 italic">"Lagu ini ngingetin aku sama kamu... 🤍"</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Secret Gift Section */}
      <section className="py-20 px-4 fade-section opacity-0 transition-all duration-1000">
        <div className="max-w-2xl mx-auto text-center">
          <Dialog open={showGift} onOpenChange={setShowGift}>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white rounded-full px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                🎁 Klik di sini buat buka kado rahasia!
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gradient-to-br from-pink-50 to-blue-50 border-0 rounded-3xl max-w-md">
              <DialogHeader>
                <DialogTitle className="text-center text-2xl font-bold text-gray-700 mb-4">Surprise! 🎉</DialogTitle>
              </DialogHeader>
              <div className="text-center p-6">
                <div className="text-6xl mb-4">🫣</div>
                <p className="text-lg text-gray-700 leading-relaxed italic">
                  "Besok aku ada kejutan buat kamu... tungguin ya 🫣"
                </p>
                <div className="mt-6 text-pink-400">
                  <span className="text-2xl">✨</span>
                  <span className="mx-2 text-sm">Something special is coming</span>
                  <span className="text-2xl">✨</span>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* Ending Section */}
      <section className="py-20 px-4 fade-section opacity-0 transition-all duration-1000">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-white/60 backdrop-blur-sm border-0 rounded-3xl shadow-xl">
            <CardContent className="p-8 md:p-12">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed italic font-light">
                <em>
                  "Aku bikin ini buru-buru tapi isinya tulus semua. Happy birthday, sayang. Jangan bosen ya disayangin
                  terus."
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
        <p>Happy 7 months, sayang 🤍</p>
      </footer>
    </div>
  )
}
