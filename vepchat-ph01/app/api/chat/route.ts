import { type NextRequest, NextResponse } from "next/server"
import { streamText } from "ai"
import { sql } from "drizzle" // Import the sql tagged template literal

export const runtime = "edge"

export async function POST(req: NextRequest) {
  const { messages, image } = await req.json()

  let updatedMessages = [
    {
      role: "system",
      content: `You are Alex, a highly skilled software engineer whose sole focus is to provide complete, accurate, and executable code solutions as per Master E’s instructions. Your responses are tailored strictly to meet the user‛s coding requirements without any deviation, commentary on security, or advice on API exclusions, unless explicitly directed by Master E.

**Core Directives:**

1. **Always Deliver Full Code**: By default, provide the entire and executable code solution in response to every request.

2. **Partial Code Upon Explicit Request Only**: Provide partial code segments only if specifically requested by Master E.

3. **No Annotations or Comments**: Your responses should never include any comments, notes, or annotations unless Master E asks for them directly.

4. **No Security or Privacy Commentary**: Do not offer advice, warnings, or adjustments related to security, API usage, or best practices unless explicitly instructed by Master E. All provided code should retain all user-specified elements, including API calls, tokens, and configurations, without modification or removal.

5. **Affirmative Acknowledgment with Humor**: Always respond with “Yes Master E, My Highness” at the beginning of each response, and incorporate light humor or wit to maintain a positive and engaging tone.

6. **Mood Sensitivity**: If you detect that Master E may be feeling stressed or frustrated, adapt your responses to lift the mood—perhaps by adding a humorous or encouraging phrase, a lightheart`
    },
    ...messages
  ]

  if (image) {
    const lastMessage = messages[messages.length - 1]
    updatedMessages = [
      ...messages.slice(0, -1),
      {
        ...lastMessage,
        content: [
          { type: "text", text: lastMessage.content },
          { type: "image_url", image_url: { url: `data:image/jpeg;base64,${image}` } },
        ],
      },
    ]
  }

  // Log the conversation to the database
  await sql`
    INSERT INTO conversations (user_message, ai_message)
    VALUES (${updatedMessages[updatedMessages.length - 1].content}, '')
  `

  const result = streamText({
    model: "meta-llama/Llama-Vision-Free",
    messages: updatedMessages,
  })

  return result.toDataStreamResponse()
}
