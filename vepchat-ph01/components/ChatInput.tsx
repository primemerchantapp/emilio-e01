import type React from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { SendIcon, ImageIcon, AtomIcon, GlobeIcon, PaperclipIcon } from "lucide-react"

interface ChatInputProps {
  input: string
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  isLoading: boolean
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  imageFile: File | null
}

const ChatInput: React.FC<ChatInputProps> = ({
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  handleImageUpload,
  imageFile,
}) => {
  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div className="flex items-center space-x-2">
          <Textarea
            value={input}
            onChange={handleInputChange}
            placeholder="Message vepchat..."
            className="flex-1 bg-[#1a1a1a] text-white border-gray-800 text-sm rounded-xl"
            rows={1}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="rounded-full bg-[#1a1a1a] border-gray-800 text-gray-400 hover:bg-[#222]"
          >
            <AtomIcon className="h-4 w-4 mr-2" />
            emilio-e01
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="rounded-full bg-[#1a1a1a] border-gray-800 text-gray-400 hover:bg-[#222]"
          >
            <GlobeIcon className="h-4 w-4 mr-2" />
            Search
          </Button>
          <div className="flex-1" />
          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="image-upload" />
          <label htmlFor="image-upload">
            <Button
              type="button"
              size="icon"
              variant="outline"
              className="rounded-full bg-[#1a1a1a] border-gray-800 text-gray-400 hover:bg-[#222]"
            >
              <PaperclipIcon className="h-4 w-4" />
            </Button>
          </label>
        </div>
      </form>
      {imageFile && <span className="text-xs text-lime-400">Image uploaded</span>}
    </div>
  )
}

export default ChatInput

