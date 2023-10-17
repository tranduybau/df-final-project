import Image from "next/image"
import BlurDeco from "@/assets/images/blur.svg"
import CaroDeco from "@/assets/images/caro.svg"
import StartDeco from "@/assets/images/star.svg"

export default function IndexPage() {
  return (
    <section className="container relative flex h-[60vh] flex-col items-center justify-center">
      <div className="absolute opacity-30">
        <Image src={CaroDeco} alt="" />
      </div>
      <div className="absolute opacity-50">
        <Image src={BlurDeco} alt="" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          C&apos;mon, make your code stop stinking!
        </h1>
        <p className="mt-4 max-w-[700px] text-lg uppercase text-muted-foreground">
          Automated code review for git
        </p>
      </div>
      <div className="mt-16 w-full">
        <div className="relative mx-auto flex w-full max-w-2xl justify-between rounded-full border-[3px] border-slate-900 ">
          <input
            placeholder="https://github.com/project/project.git"
            className="w-full rounded-full px-8 py-4 focus:outline-none"
          />
          <button className="h-full shrink-0 rounded-full bg-slate-900 px-8 py-4 text-white hover:bg-slate-800">
            Code Review Now
          </button>

          <div className="absolute -left-20 h-20 w-20 rotate-180">
            <Image src={StartDeco} alt="" />
          </div>
          <div className="absolute right-20 top-12 h-20 w-20">
            <Image src={StartDeco} alt="" />
          </div>
          <div className="absolute -top-20 left-16 h-20 w-20 rotate-90">
            <Image src={StartDeco} alt="" />
          </div>
          <div className="absolute -top-20 left-16 h-20 w-20 rotate-180">
            <Image src={StartDeco} alt="" />
          </div>
          <div className="absolute -top-20 right-48 h-20 w-20">
            <Image src={StartDeco} alt="" />
          </div>
          <div className="absolute left-36 top-16 h-20 w-20 rotate-180">
            <Image src={StartDeco} alt="" />
          </div>
          <div className="absolute -right-20 h-20 w-20">
            <Image src={StartDeco} alt="" />
          </div>
        </div>
      </div>
    </section>
  )
}
