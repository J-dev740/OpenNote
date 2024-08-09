import { notesMock } from "@renderer/store/mocks"
import { ComponentProps } from "react"
import { NotePreview } from "./NotePreview"
import { twMerge } from "tailwind-merge"

export const NotesPreviewList=({className,children,...props}:ComponentProps<'ul'>)=>{
    if(notesMock.length==0) return (
        <ul className={twMerge('text-center pt-4 ',className)} {...props}>
            <span>No Notes Yet!</span>
        </ul>
    )
    return <ul className={className} {...props}>
        {
            notesMock.map((note)=>(
                // <li key={note.title}>{note.title}</li>
                <NotePreview key={note.title} {...note}/>
            ))
        }
    </ul>
}