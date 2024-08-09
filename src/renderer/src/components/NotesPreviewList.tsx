import { notesMock } from "@renderer/store/mocks"
import { ComponentProps } from "react"
import { NotePreview } from "./NotePreview"

export const NotesPreviewList=({className,children,...props}:ComponentProps<'ul'>)=>{
    return <ul {...props}>
        {
            notesMock.map((note)=>(
                // <li key={note.title}>{note.title}</li>
                <NotePreview key={note.title} {...note}/>
            ))
        }
    </ul>
}