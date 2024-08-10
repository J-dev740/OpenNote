import { notesMock } from "@renderer/store/mocks"
import { ComponentProps } from "react"
import { NotePreview } from "./NotePreview"
import { twMerge } from "tailwind-merge"
import { useNotesList } from "@renderer/hooks/useNotesList"
import { NoteInfo } from "@shared/models"

export const NotesPreviewList=({className,children,...props}:ComponentProps<'ul'>)=>{
    const {notes,selectedIndex,handleSelect}=useNotesList({})
    // if(notesMock.length==0) return (
    if(notes.length<=0) return(
        <ul className={twMerge('text-center pt-4 ',className)} {...props}>
            <span>No Notes Yet!</span>
        </ul>
    )
    return <ul className={className} {...props}>
        {
            notes.map((note,index)=>(
                <NotePreview key={note.title + note.lastEditTime} 
                isActive={selectedIndex==index}
                onClick={handleSelect(index)}
                {...note}/>
            ))
        }
    </ul>
}