import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import Outcomes from './components/Outcomes.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero />
        <About />
        {/* 2026-09-23 按要求下线「核心项目」整块，
            原「开营信息」上移到这个位置，并改名为「项目介绍」 */}
        <Projects />
        <Outcomes />
      </main>
      <Footer />
    </div>
  )
}
