"use client"

import { useState } from "react"
import { useChat } from "ai/react"
import Logo from "@/components/Logo"
import ChatMessage from "@/components/ChatMessage"
import ChatInput from "@/components/ChatInput"
import { Button } from "@/components/ui/button"
import { MenuIcon, PhoneIcon, MessageSquarePlus } from "lucide-react"

export default function Home() {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
  })

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0])
    }
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (imageFile) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        handleSubmit(e, {
          options: {
            body: JSON.stringify({
              image: base64String.split(",")[1],
            }),
          },
        })
      }
      reader.readAsDataURL(imageFile)
    } else {
      handleSubmit(e)
    }
    setImageFile(null)
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#121212] text-white font-lato text-sm">
      <header className="flex items-center justify-between p-4 border-b border-gray-800">
        <Button variant="ghost" size="icon">
          <MenuIcon className="h-6 w-6" />
        </Button>
        <Button className="bg-lime-500 hover:bg-lime-600 text-black rounded-full px-4 py-2 flex items-center gap-2">
          <PhoneIcon className="h-4 w-4" />
          Get App
        </Button>
      </header>

      <main className="flex-1 overflow-auto p-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </main>

      {messages.length > 0 && (
        <div className="flex justify-center gap-4 p-4">
          <Button variant="outline" size="icon" className="rounded-full">
            <span>3 / 3</span>
          </Button>
        </div>
      )}

      <div className="flex justify-center my-4">
        <Button
          onClick={() => window.location.reload()}
          className="bg-lime-500 hover:bg-lime-600 text-black rounded-full px-6 py-3 flex items-center gap-2"
        >
          <MessageSquarePlus className="h-5 w-5" />
          New chat
        </Button>
      </div>

      <footer className="p-4 border-t border-gray-800">
        <ChatInput
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleFormSubmit}
          isLoading={isLoading}
          handleImageUpload={handleImageUpload}
          imageFile={imageFile}
        />
      </footer>
    </div>
  )
}

