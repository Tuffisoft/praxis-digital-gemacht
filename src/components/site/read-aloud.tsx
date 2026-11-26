"use client"

import { SquareIcon, Volume2Icon } from "lucide-react"
import { useEffect, useRef, useState, useSyncExternalStore } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const subscribe = () => () => {}
const getSupported = () => typeof window !== "undefined" && "speechSynthesis" in window
const getServerSupported = () => false

/** Splits text into sentence-sized chunks: some browsers stop long utterances early. */
function toChunks(text: string, max = 220) {
  const sentences = text.replace(/\s+/g, " ").match(/[^.!?:]+[.!?:]*\s*/g) ?? [text]
  const chunks: string[] = []
  let current = ""
  for (const sentence of sentences) {
    if ((current + sentence).length > max && current) {
      chunks.push(current.trim())
      current = ""
    }
    current += sentence
  }
  if (current.trim()) chunks.push(current.trim())
  return chunks
}

/**
 * Reads the main content aloud with the browser's built-in speech synthesis.
 * No external service, nothing is sent anywhere.
 */
export function ReadAloud({ targetId = "inhalt", className }: { targetId?: string; className?: string }) {
  const supported = useSyncExternalStore(subscribe, getSupported, getServerSupported)
  const [speaking, setSpeaking] = useState(false)
  const cancelled = useRef(false)

  useEffect(() => {
    if (!supported) return
    const stop = () => window.speechSynthesis.cancel()
    window.addEventListener("pagehide", stop)
    return () => {
      window.removeEventListener("pagehide", stop)
      stop()
    }
  }, [supported])

  if (!supported) return null

  function stop() {
    cancelled.current = true
    window.speechSynthesis.cancel()
    setSpeaking(false)
  }

  function start() {
    const target = document.getElementById(targetId)
    if (!target) return
    const clone = target.cloneNode(true) as HTMLElement
    clone.querySelectorAll("[data-no-read], script, style, svg, form").forEach((el) => el.remove())
    const text = clone.innerText || clone.textContent || ""
    const chunks = toChunks(text)
    if (!chunks.length) return

    const voices = window.speechSynthesis.getVoices()
    const voice = voices.find((v) => v.lang === "de-DE") ?? voices.find((v) => v.lang.startsWith("de"))

    cancelled.current = false
    window.speechSynthesis.cancel()
    setSpeaking(true)

    chunks.forEach((chunk, index) => {
      const utterance = new SpeechSynthesisUtterance(chunk)
      utterance.lang = "de-DE"
      if (voice) utterance.voice = voice
      utterance.rate = 0.95
      if (index === chunks.length - 1) {
        utterance.onend = () => {
          if (!cancelled.current) setSpeaking(false)
        }
      }
      utterance.onerror = () => setSpeaking(false)
      window.speechSynthesis.speak(utterance)
    })
  }

  return (
    <Button
      variant="outline"
      className={cn("h-11 gap-2 px-4 text-base", className)}
      onClick={speaking ? stop : start}
      aria-pressed={speaking}
    >
      {speaking ? <SquareIcon className="size-4" aria-hidden /> : <Volume2Icon className="size-5" aria-hidden />}
      {speaking ? "Vorlesen stoppen" : "Vorlesen"}
    </Button>
  )
}
