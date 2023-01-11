import { useState } from "react"
import { Route, Routes } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import { SideBar } from "./components/sideBar/SideBar"
import { PageContainer } from "./containers/PageContainer"
import Home from "./pages/Home"
import SearchResult from "./pages/SearchResult"
import VideoDetail from "./pages/VideoDetail"

const App = () => {
  const [watch , setWatch ] = useState(false)

  return (
    <div className="py-2">
      <Navbar setWatch={setWatch} watch={watch} />
      <PageContainer>
        <SideBar watch={watch} />
        <Routes>
          <Route path="/" element={<Home setWatch={setWatch} />} />
          <Route path="/watch/:id" element={<VideoDetail setWatch={setWatch} />} />
          <Route path="/result/:query" element={<SearchResult setWatch={setWatch} />} />
        </Routes>
      </PageContainer>
    </div>
  )
}

export default App
