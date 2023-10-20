"use client"

import * as React from "react"
import Image from "next/image"
import chatGptImage from "@/assets/images/chatgpt.webp"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import Icon from "../common/icon"
import InputWithIcon from "../common/input-with-icon"
import TextAreaWithIcon from "../common/textarea-with-icon"
import { Icons } from "../icons"
import Message from "./_components/Message"

export interface ChatWithGPTDialogProps {}

export default function ChatWithGPTDialog(props: ChatWithGPTDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <div className="mr-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500">
            <Image src={chatGptImage} alt="chat-gpt-image" />
          </div>
          Chat with GPT
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-full sm:max-w-7xl">
        <DialogHeader>
          <DialogTitle>Chat with GPT</DialogTitle>
          <DialogDescription>
            This is a AI bot that will help you to find the best solution for
            your problem.
          </DialogDescription>
        </DialogHeader>

        <div className="h-[500px] overflow-hidden py-4">
          <div className="h-full overflow-y-auto">
            <div className="grid grid-cols-12 gap-y-2">
              <Message message="Hello, how can I help you?" />
              <Message
                me="K"
                message="I want to learn how to have girl friend"
              />
              <Message message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, ipsum. Omnis molestiae, odit vero qui eaque id sapiente ut quam culpa modi maxime placeat voluptatibus quas quibusdam, vel reprehenderit? Alias? Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, ipsum. Omnis molestiae, odit vero qui eaque id sapiente ut quam culpa modi maxime placeat voluptatibus quas quibusdam, vel reprehenderit? Alias?" />
              <Message
                me="K"
                message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, ipsum. Omnis molestiae, odit vero qui eaque id sapiente ut quam culpa modi maxime placeat voluptatibus quas quibusdam, vel reprehenderit? Alias?"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="sm:justify-start">
          <TextAreaWithIcon
            nameIcon="message-square"
            placeholder="Send a message..."
            fullWidth
            className="resize-none"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
