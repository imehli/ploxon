import React, { useState } from 'react'

interface Message {
  message: string
  isUser: boolean
}

const ChatGPT: React.FC = () => {
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState<Message[]>([])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setMessages([...messages, { message: inputValue, isUser: true }])

    // make a call to the OpenAI API to get a response
    const response = await fetch(
      'https://api.openai.com/v1/engines/davinci/jobs',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer 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'
        },
        body: JSON.stringify({
          prompt: inputValue
        })
      }
    )
    const data = await response.json()
    const responseMessage = data.choices[0].text

    setMessages([...messages, { message: responseMessage, isUser: false }])
    setInputValue('')
  }

  return (
    <div>
      <h1>ChatGPT</h1>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <p>
              {message.isUser ? 'User: ' : 'ChatGPT: '}
              {message.message}
            </p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default ChatGPT
