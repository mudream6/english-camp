import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Courses from './components/Courses.jsx'
import Team from './components/Team.jsx'
import Outcomes from './components/Outcomes.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero />
        <About />
        <Courses />
        <Team />
        <Outcomes />
      </main>
      <Footer />
    </div>
  )
}
