'use client'

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import StartDeco from "@/assets/images/star.svg";

function SearchForm() {
  return (
    <div
      className="relative mx-auto flex w-full max-w-2xl justify-between rounded-full border-[3px] border-slate-900">
      <Input
        placeholder="https://github.com/project/project.git"
        className="h-auto rounded-full border-0 !ring-0 !ring-offset-0"
      />
      <Button className="h-full shrink-0 rounded-full bg-slate-900 px-8 py-4 text-white hover:bg-slate-800">
        Code Review Now
      </Button>

      <div className="absolute -left-20 h-20 w-20 rotate-180 animate-spin">
        <Image src={StartDeco} alt=""/>
      </div>
      <div className="absolute right-20 top-12 h-20 w-20 animate-spin">
        <Image src={StartDeco} alt=""/>
      </div>
      <div className="absolute -top-20 left-16 h-20 w-20 rotate-90 animate-spin">
        <Image src={StartDeco} alt=""/>
      </div>
      <div className="absolute -top-20 left-16 h-20 w-20 rotate-180 animate-spin">
        <Image src={StartDeco} alt=""/>
      </div>
      <div className="absolute -top-20 right-48 h-20 w-20 rotate-90 animate-spin">
        <Image src={StartDeco} alt=""/>
      </div>
      <div className="absolute left-36 top-16 h-20 w-20 rotate-180 animate-spin">
        <Image src={StartDeco} alt=""/>
      </div>
      <div className="absolute -right-20 h-20 w-20 rotate-90 animate-spin">
        <Image src={StartDeco} alt=""/>
      </div>
    </div>
  )
}

export default SearchForm
