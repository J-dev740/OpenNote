import { Content, RootLayout,SideBar } from "./components"
function App(){
  return (
    <RootLayout className="bg-black bg-opacity-80">
      <SideBar  className="p-2">
        sidebar
      </SideBar>
      <Content className="border-l border-zinc-900/50 border-l-white/20">
        content 
      </Content>
    </RootLayout>
    
  )
}

export default App
