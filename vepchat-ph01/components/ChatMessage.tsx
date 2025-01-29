import type React from "react"
import type { Message } from "ai"
import { cn } from "@/lib/utils"

interface ChatMessageProps {
  message: Message
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div
      className={cn(
        "flex w-full items-start justify-start border-b border-gray-800 py-4",
        message.role === "user" ? "bg-[#1a1a1a]" : "bg-[#121212]",
      )}
    >
      <div className="flex items-start space-x-4 px-4">
        <div
          className={cn(
            "rounded-full h-8 w-8 flex items-center justify-center text-sm",
            message.role === "user" ? "bg-lime-500 text-black" : "bg-lime-500 text-black",
          )}
        >
          {message.role === "user" ? "U" : "A"}
        </div>
        <div className="space-y-2 max-w-3xl">
          <p className="text-base text-gray-100 break-words">{message.content}</p>
        </div>
      </div>
    </div>
  )
}

export default ChatMessage

