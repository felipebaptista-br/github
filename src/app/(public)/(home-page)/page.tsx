import React from "react"
import DotLottieAnimation from "@/components/dot-lottie-animation"
import Footer from "./_components/footer"
import NavBar from "./_components/navbar"
import Image from "next/image"
import Wave from "@/assets/wave-1.svg"
import Link from "next/link"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col z-10">
      <NavBar />
      <div className="px-32 pt-16">
        <div className="w-full flex flex-col py-10">
          <div className="w-full h-[750px] relative flex items-center justify-between">
            <div className="w-2/5 flex flex-col items-start justify-center gap-5">
              <h1 className="text-4xl font-medium text-blue-950 dark:text-white">
                GitHub Profile Viewer
              </h1>
              <p className="text-lg text-neutral-700 dark:text-neutral-200">
                O GitHub Profile Viewer é uma aplicação que permite que você se conecte com sua conta GitHub e explore seus dados de maneira prática, visual e inteligente. Ideal para desenvolvedores que desejam entender melhor seu perfil, repositórios e contribuições em um só lugar.
              </p>
              <Link className="z-10" href='/auth'>
                <Button>
                  Começar
                </Button>
              </Link>
            </div>
            <div className="w-3/5 h-auto">
              <DotLottieAnimation url="https://lottie.host/fa8120e6-1a95-4a94-9838-78823b941a7a/OHdfDgAyz9.lottie" />
            </div>
            <div className="absolute bottom-0 left-0 w-full z-0">
              <Image
                src={Wave}
                alt="Wave"
                className="absolute bottom-0 left-0 w-full z-0 pointer-events-none object-cover"
                priority
              />
            </div>
          </div>

          <div className="w-full h-[745px] flex items-center justify-between gap-2.5">
            <div className="w-1/2 h-auto">
              <DotLottieAnimation url="https://lottie.host/8c696272-0879-4e94-b52b-8ccb2067d5f2/puczDftJgp.lottie" />
            </div>
            <div className="w-1/2 flex flex-col items-end gap-5">
              <h1 className="text-4xl font-medium text-blue-950 dark:text-white">
                Principais funcionalidades
              </h1>
              <p>
                O que você pode fazer com o GitHub Profile Viewer
              </p>
              <div className="w-full">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="auth">
                    <AccordionTrigger>Autenticação segura via token ou GitHub OAuth</AccordionTrigger>
                    <AccordionContent>
                      Conecte-se à sua conta GitHub de forma rápida e confiável. Você pode colar seu Personal Access Token (PAT) manualmente ou entrar com sua conta GitHub usando o fluxo OAuth seguro, com total controle sobre sua privacidade.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="profile">
                    <AccordionTrigger>Visualize seu perfil completo</AccordionTrigger>
                    <AccordionContent>
                      Acesse suas informações públicas e privadas (se autorizado), incluindo nome, avatar, bio, número de seguidores, seguindo, data de criação da conta, entre outros dados do seu perfil GitHub.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="repos">
                    <AccordionTrigger>Explore seus repositórios com detalhes</AccordionTrigger>
                    <AccordionContent>
                      Veja todos os seus repositórios organizados com informações como nome, descrição, linguagens utilizadas, visibilidade, última atualização, e muito mais.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="stats">
                    <AccordionTrigger>Acompanhe suas estatísticas de forma visual</AccordionTrigger>
                    <AccordionContent>
                      Descubra insights sobre sua atividade no GitHub: linguagens mais usadas, total de repositórios, estatísticas de contribuições, número de estrelas, forks e muito mais.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="interface">
                    <AccordionTrigger>Interface moderna, intuitiva e responsiva</AccordionTrigger>
                    <AccordionContent>
                      Desenvolvido com foco em usabilidade, o sistema possui suporte a dark mode, responsividade em todas as telas e uma experiência fluida com navegação clara e rápida.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="detection">
                    <AccordionTrigger>Detecção automática do tipo de token</AccordionTrigger>
                    <AccordionContent>
                      Ao colar seu token no campo de acesso, o sistema identifica automaticamente se é um token pessoal, fine-grained ou OAuth, ajustando a interface conforme o tipo escolhido.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="open-source">
                    <AccordionTrigger>Projeto open-source com espírito colaborativo</AccordionTrigger>
                    <AccordionContent>
                      O GitHub Profile Viewer é totalmente open-source. Você pode contribuir com melhorias, sugerir novas funcionalidades ou estudar o código como referência para seus próprios projetos.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
