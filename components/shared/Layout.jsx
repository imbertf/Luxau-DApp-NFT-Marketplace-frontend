import Footer from "./Footer"
import Header from "./Header"

const Layout = ({ children }) => {

  return (
    <div className="min-h-screen flex flex-col min-h-screen">
      <Header />
      <main className="grow h-full">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout