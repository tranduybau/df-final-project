import Image from "next/image"
import BlurDeco from "@/assets/images/blur.svg"
import CaroDeco from "@/assets/images/caro.svg"
import SearchForm from "@/app/(default)/_components/search-form";
import faker from "./faker";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import {ArrowRight, Github, Globe, MessageSquare} from "lucide-react";
import {clsx} from "clsx";
import ROUTES from "@/constants/ROUTES";
import {Button} from "@/components/ui/button";

export default function IndexPage() {
  return (
    <main>
      <section className="relative flex h-[60dvh] flex-col items-center justify-center">
        <Image className="absolute left-0 top-0 h-full w-full object-cover opacity-30" src={CaroDeco} alt=""/>
        <Image className="absolute left-0 top-0 h-full w-full object-cover opacity-50" src={BlurDeco} alt=""/>

        <div className="container relative">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
              C&apos;mon, make your code stop stinking!
            </h1>
            <p className="mt-4 max-w-[700px] text-lg uppercase text-muted-foreground">
              Automated code review for git
            </p>
          </div>

          <div className="mt-16 w-full">
            <SearchForm/>
          </div>
        </div>
      </section>

      <section className="container mx-auto">
        <h2
          className="my-6 whitespace-pre text-center text-3xl font-extrabold !leading-loose tracking-tighter md:my-10 md:text-4xl">
          Why Collaborate {'\n'} with us?
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {faker.features.map((feature) => (
            <Card key={feature.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="leading-snug">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p>{feature.description}</p>
              </CardContent>
              <CardFooter>
                <Link href={feature.href} className="flex items-center gap-2">
                  <span className="font-medium">
                    Learn More
                  </span>

                  <ArrowRight size={18}/>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="container mx-auto">
        <h2
          className="my-6 whitespace-pre text-center text-3xl font-extrabold !leading-loose tracking-tighter md:my-10 md:text-4xl">
          About my team
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {faker.about_us.map((about) => (
            <Card key={about.id} className="flex flex-col">
              <CardContent className="flex-1 gap-6 p-6 md:flex">
                <div className="flex flex-1">
                  <Image src={about.avatar} alt={about.name} width={200} height={200}
                         className="object-cover object-center"/>
                </div>

                <div className="flex flex-1 flex-col gap-3 py-2">
                  <h3 className="text-2xl font-semibold">
                    {about.real_name}
                  </h3>

                  <h4>
                    aka{' '}
                    <span className="font-semibold">
                      {about.name}
                    </span>
                  </h4>

                  <div className="mt-auto flex gap-3">
                    <Link href={about.github} target="_blank" rel="noreferrer">
                      <Github/>
                    </Link>

                    <Link href={about.portfolio || '#'}
                          className={clsx(!about.portfolio && 'cursor-not-allowed opacity-50')} target="_blank"
                          rel="noreferrer">
                      <Globe/>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Card className="flex flex-col">
            <CardContent className="flex-1 gap-6 p-6 md:flex">
              <div className="flex flex-1">
                <Image
                  src="https://m.media-amazon.com/images/M/MV5BYmMzOWRkOTQtODU2NS00NGE4LTk4ODYtZDJmMjUxNWY5M2Y4XkEyXkFqcGdeQXVyMjA0NzcwMjI@._V1_.jpg"
                  alt="Could be you" width={200} height={200} className="object-cover object-center"/>
              </div>

              <div className="flex flex-1 flex-col gap-3 py-2">
                <h3 className="text-2xl font-semibold">
                  Maybe you
                </h3>

                <h4>
                  <span className="font-semibold">
                      We don&apos;t know yet
                    </span>
                </h4>

                <div className="mt-auto flex gap-3">
                  <Link href={ROUTES.CONTACT} target="_blank" rel="noreferrer">
                    <Button className="flex items-center gap-3">
                      <MessageSquare/>

                      <span>
                        Contact now
                      </span>
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
