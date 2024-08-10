import { Content, RootLayout,SideBar, DraggableTopBar,ActionButtonsRow, NotesPreviewList } from "@/components"
import MarkDownEditor from "./components/MarkDownEditor"
import FloatingNoteTitle from "./components/FloatingNoteTitle"
import { useRef } from "react"
const App=()=>{
  const contentContainerRef=useRef<HTMLDivElement>(null)


  const resetScroll =()=>{
    contentContainerRef.current?.scrollTo(0,-2)
  }
  return (
    <>
      <DraggableTopBar/>
    <RootLayout className="bg-black bg-opacity-80">
      <SideBar  className="p-2">
        <ActionButtonsRow className="flex justify-between mt-1"/>
        <NotesPreviewList  className='mt-3 space-y-1 ' onSelect={resetScroll}/>
      </SideBar>
      <Content ref={contentContainerRef} className="border-l border-zinc-900/50 border-l-white/20">
      <FloatingNoteTitle/>
        <MarkDownEditor/>
      </Content>
    </RootLayout>
    </>
    
  )
}

export default App
