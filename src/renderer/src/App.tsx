import { Content, RootLayout,SideBar, DraggableTopBar,ActionButtonsRow } from "@/components"
const App=()=>{
  return (
    <>
      <DraggableTopBar/>
    <RootLayout className="bg-black bg-opacity-80">
      <SideBar  className="p-2">
        <ActionButtonsRow className="flex justify-between mt-1"/>
      </SideBar>
      <Content className="border-l border-zinc-900/50 border-l-white/20">
        content 
      </Content>
    </RootLayout>
    </>
    
  )
}

export default App
