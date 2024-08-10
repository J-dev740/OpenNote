import { contextBridge, ipcRenderer } from 'electron'
// import { electronAPI } from '@electron-toolkit/preload'
import { CreateNote, DeleteNote, GetNotes, ReadNote, WriteNote } from '@shared/types'
import { writeNote } from '@/lib'

// Custom APIs for renderer
// const api = {}

// // Use `contextBridge` APIs to expose Electron APIs to
// // renderer only if context isolation is enabled, otherwise
// // just add to the DOM global.
// if (process.contextIsolated) {
//   try {
//     contextBridge.exposeInMainWorld('electron', electronAPI)
//     contextBridge.exposeInMainWorld('api', api)
//   } catch (error) {
//     console.error(error)
//   }
// } else {
//   // @ts-ignore (define in dts)
//   window.electron = electronAPI
//   // @ts-ignore (define in dts)
//   window.api = api
// }

if(!process.contextIsolated){
  throw new Error('contextIsolation must be enabled in the BrowserWindow')
}
try {
  contextBridge.exposeInMainWorld('context',{
    // TODO:
    locale:navigator.language,
    // exposing the function to the main process using the context bridge under the context object 
    // this is actually a proxy function to invoke the handler which is also named getNotes 
    getNotes:(...args:Parameters<GetNotes>)=>ipcRenderer.invoke('getNotes',...args),
    readNote:(...args:Parameters<ReadNote>)=>ipcRenderer.invoke('readNote',...args),
    writeNote:(...args:Parameters<WriteNote>)=>ipcRenderer.invoke('writeNote',...args),
    createNote:(...args:Parameters<CreateNote>)=>ipcRenderer.invoke('createNote',...args),
    deleteNote:(...args:Parameters<DeleteNote>)=>ipcRenderer.invoke('deleteNote',...args),

  })
} catch (error) {
  console.log(error)
}
