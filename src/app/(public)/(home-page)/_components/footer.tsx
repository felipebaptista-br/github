"use client"

import React from "react"
import {
  Github,
  Linkedin,
  Mail,
  BookText,
  TerminalSquare,
  Heart,
} from "lucide-react"
import { version } from "@/version"
import { Badge } from "@/components/ui/badge"

export default function Footer() {
  return (
    <footer className="w-full bg-neutral-900 px-32 py-12 text-neutral-200">
      <div className="w-full flex flex-col justify-between gap-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div>
            <h3 className="text-xl font-semibold mb-2">GitHub Profile Viewer</h3>
            <p className="text-sm text-neutral-400">
              Uma aplicação open-source para visualizar e explorar informações do seu perfil GitHub com facilidade, segurança e uma interface intuitiva.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <BookText className="w-4 h-4" /> Links úteis
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com/felipebaptista-br/github"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline hover:text-white flex items-center gap-2"
                >
                  <Github className="w-4 h-4" /> Repositório no GitHub
                </a>
              </li>
              <li className="flex items-center gap-2 text-neutral-500">
                <TerminalSquare className="w-4 h-4" />
                <span>Documentação (em breve)</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4" /> Contato
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://www.linkedin.com/in/felpsbaptista/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline hover:text-white flex items-center gap-2"
                >
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/felipebaptista-br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline hover:text-white flex items-center gap-2"
                >
                  <Github className="w-4 h-4" /> GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-full h-px bg-neutral-700" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-neutral-500 gap-4">
          <p className="flex items-center gap-1">
            <span>
              Feito com
            </span>
            <Heart size={15} className="text-red-800 border-none" />
            <span>
              por Felipe Baptista — © {new Date().getFullYear()}
            </span>
          </p>
          <div className="flex items-center gap-2">
            <Badge className="bg-neutral-700">
              {version}
            </Badge>
            <p>Open-source e em constante evolução.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
