import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { GetNotes } from '@shared/types'

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

  })
} catch (error) {
  console.log(error)
}
