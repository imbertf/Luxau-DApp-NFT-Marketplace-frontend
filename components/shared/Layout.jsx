import Footer from "./Footer"
import Header from "./Header"

const Layout = ({ children }) => {

  return (
    <div className="min-h-screen border-2 flex flex-col min-h-screen">
      <Header />
      <main className="grow h-full border-2">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout