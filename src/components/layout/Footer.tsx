import Image from "next/image"
import Link from "next/link"
import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/studios" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "About Us", href: "/#about-us" },
]

const categories = [
  "Photo Studios",
  "Sound Stages",
  "Podcast Rooms",
  "Music Suites",
]

const Footer = () => {
  return (
    <footer className="mt-auto bg-dark-green text-white dark:bg-[#0b2419]">
      <div className="container mx-auto grid gap-8 px-8 py-8 sm:px-10 lg:grid-cols-[1.25fr_0.85fr_0.95fr_1.15fr] lg:gap-0 lg:px-10 lg:py-7">
        <div className="lg:border-r lg:border-white/50 lg:pr-12">
          <Link href="/" className="inline-flex rounded-lg focus-visible:ring-2 focus-visible:ring-accent-lime">
            <Image
              src="/images/footerlogo.png"
              alt=""
              width={56}
              height={56}
              className="size-14 rounded-full object-cover"
            />
            <span className="ml-3 flex flex-col justify-center">
              <span className="text-2xl font-extrabold tracking-tight">
                Studio<span className="text-accent-lime">Space</span>
              </span>
              <span className="text-xs font-medium text-white/75">
                Rent. Create. Inspire.
              </span>
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-5 text-white/75">
            A peer-to-peer marketplace for creative minds, filmmakers, and
            artists.
          </p>
          <div className="mt-5 flex items-center gap-5" aria-label="Social links">
            <Link
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              aria-label="StudioSpace on X"
              className="text-2xl font-medium leading-none transition-colors hover:text-accent-lime"
            >
              <FaXTwitter className="size-5" />
            </Link>
            <Link
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              aria-label="StudioSpace on YouTube"
              className="flex size-7 items-center justify-center rounded-md bg-white text-[#064e32] transition-colors hover:bg-accent-lime dark:bg-white dark:text-[#064e32]"
            >
              <FaYoutube className="size-4" />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="StudioSpace on Instagram"
              className="flex size-7 items-center justify-center transition-colors hover:text-accent-lime"
            >
              <FaInstagram className="size-5" />
            </Link>
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="StudioSpace on Facebook"
              className="flex size-7 items-center justify-center text-2xl font-bold leading-none transition-colors hover:text-accent-lime"
            >
              <FaFacebookF className="size-4" />
            </Link>
          </div>
        </div>

        <div className="lg:px-12">
          <h2 className="text-base font-bold text-white">Quick Links</h2>
          <nav className="mt-4 flex flex-col items-start gap-3" aria-label="Footer navigation">
            {quickLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-white/75 transition-colors hover:text-accent-lime"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="lg:px-5">
          <h2 className="text-base font-bold text-white">Popular Categories</h2>
          <nav className="mt-4 flex flex-col items-start gap-3" aria-label="Studio categories">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/studios?category=${encodeURIComponent(category)}`}
                className="text-sm text-white/75 transition-colors hover:text-accent-lime"
              >
                {category}
              </Link>
            ))}
          </nav>
        </div>

        <div className="lg:pl-10">
          <h2 className="text-base font-bold text-white">Subscribe Newsletter</h2>
          <p className="mt-4 max-w-xs text-sm leading-6 text-white/75">
            Get the latest studios and creative updates.
          </p>
          <form className="mt-4 flex flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
            <Input
              type="email"
              required
              placeholder="Your email address"
              aria-label="Email address"
              className="h-10 border-white/20 bg-white text-foreground placeholder:text-muted-foreground"
            />
            <Button type="submit" className="h-10 shrink-0 bg-primary px-5 hover:bg-accent-lime hover:text-accent-foreground">
              Subscribe
            </Button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/20">
        <div className="container mx-auto flex flex-col gap-4 px-8 py-6 text-sm text-white/70 sm:px-10 md:flex-row md:items-center md:justify-between lg:px-10">
          <p>© 2026 StudioSpace. All rights reserved.</p>
          <nav className="flex flex-wrap gap-x-4 gap-y-2" aria-label="Legal navigation">
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms of Service
            </Link>
            <span aria-hidden="true">|</span>
            <Link href="/privacy" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <span aria-hidden="true">|</span>
            <Link href="/contact" className="transition-colors hover:text-white">
              Contact Us
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export default Footer
