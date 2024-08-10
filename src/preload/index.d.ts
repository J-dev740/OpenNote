import { ElectronAPI } from '@electron-toolkit/preload'
import { GetNotes, WriteNote } from '@shared/types'

declare global {
  interface Window {
    // electron: ElectronAPI
    // api: unknown
    context:{
      locale:string
      getNotes:GetNotes,
      readNote:ReadNote,
      writeNote:WriteNote
    }
  }
}
