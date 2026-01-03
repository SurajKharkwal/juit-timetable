"use client"

import Link from "next/link"
import { GithubIcon } from "./github-icon"

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 h-16 w-full bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4">
        <h1 className="text-lg font-semibold tracking-tight">
          <Link href="https://www.juit.ac.in/"
            className="text-primary-500"
            rel="noopener noreferrer"
            target="_blank"
          > JUIT </Link> Timetable
        </h1>

        <Link
          href="https://github.com/SurajKharkwal/juit-timetable"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 p-1 focus-visible:ring-ring" >
          <GithubIcon size={28} />
        </Link>
      </div>
    </nav>
  )
}
