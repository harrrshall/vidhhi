"use client"

import { useState } from "react"
import SwipeableViews from "react-swipeable-views"
import { virtualize } from "react-swipeable-views-utils"
import Header from "./components/Header"
import About from "./components/About"
import Timeline from "./components/Timeline"
import ImageGallery from "./components/ImageGallery"
import Promise from "./components/Promise"
import Music from "./components/Music"
import Navigation from "./components/Navigation"
import FloatingHearts from "./components/FloatingHearts"

const VirtualizeSwipeableViews = virtualize(SwipeableViews)

const slides = [
  { component: Header, title: "Home" },
  { component: About, title: "About Us" },
  { component: Timeline, title: "Our Story" },
  { component: ImageGallery, title: "Gallery" },
  { component: Promise, title: "Promises" },
  { component: Music, title: "Our Song" },
]

export default function Home() {
  const [index, setIndex] = useState(0)

  const slideRenderer = ({ index, key }: { index: number; key: string }) => {
    // Normalize the index to always be within the bounds of slides
    const normalizedIndex = ((index % slides.length) + slides.length) % slides.length;
    const slide = slides[normalizedIndex];
    const Component = slide.component;
    return (
      <div key={key} className="h-screen flex items-center justify-center">
        <Component />
      </div>
    )
  }

  return (
    <main className="h-screen overflow-hidden bg-gradient-to-b from-pink-100 to-purple-100 relative">
      <FloatingHearts />
      <VirtualizeSwipeableViews
        index={index}
        onChangeIndex={(index: number) => setIndex(index)}
        slideRenderer={slideRenderer}
        enableMouseEvents
        className="h-full"
      />
      <Navigation currentIndex={index} setIndex={setIndex} titles={slides.map((slide) => slide.title)} />
    </main>
  )
}
