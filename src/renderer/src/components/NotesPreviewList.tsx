import { notesMock } from "@renderer/store/mocks"
import { ComponentProps } from "react"
import { NotePreview } from "./NotePreview"
import { twMerge } from "tailwind-merge"
import { useNotesList } from "@renderer/hooks/useNotesList"
import { NoteInfo } from "@shared/models"


export type NotesPreviewListProps={
    onSelect?:()=>void
}& ComponentProps<'ul'>
export const NotesPreviewList=({className,children,onSelect,...props}:NotesPreviewListProps)=>{
    // onSelect function is actually used to reset the scroll every time we visited a new Note so that each note preview starts with a scroll of 0 
    const {notes,selectedIndex,handleSelect}=useNotesList({onSelect})
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