import { NoteContent, NoteInfo } from '@shared/models'
import {atom} from 'jotai'
import {unwrap} from 'jotai/utils'
import { notesMock } from './mocks'

const loadNotes=async()=>{
    const notes= await window.context.getNotes();
    return notes.sort((a,b)=>b.lastEditTime-a.lastEditTime);

}

const notesAtomAsync=atom<NoteInfo[]|Promise<NoteInfo[]>>(loadNotes())
// now to combine thiis asycn function with a sync funcction use the unwrap method povided by the utils of jotai


// export const notesAtom=atom<NoteInfo[]>(notesMock)
// notesAtom will contain the notes when the promise for the loadNotes() function is resolved 

export const notesAtom=unwrap(notesAtomAsync,(prev)=>prev)

export const selectedNoteIndexAtom=atom<number|null>(null);

const selectedNoteAtomAsync=atom(async (get)=>{
    const notes=get(notesAtom);
    const selectedIndex=get(selectedNoteIndexAtom);

    if(selectedIndex==null || !notes) return null;

    const selectedNote=notes[selectedIndex];
    const noteContent=await window.context.readNote(selectedNote.title);
    return{
        ...selectedNote,
        // this content needs to updated dynamically from the editor 
        // content:`Hello from Note${selectedIndex}`
        content:noteContent
    }
})
export const selectedNoteAtom=unwrap(selectedNoteAtomAsync,(prev)=>{
    prev??{
        title:'',
        content:'',
        lastEditTime:Date.now()
    }
})
export const saveNoteAtom=atom(null, async (get,set ,newContent:NoteContent)=>{
    const notes=get(notesAtom);
    const selectedNote=get(selectedNoteAtom)
    if(!selectedNote || !notes) return ;
    // save on disc 
    await window.context.writeNote(selectedNote.title,newContent);

    // update  the savedNotes last edit time 
    set(notesAtom,
        notes.map((note)=>{
            // the note that we want to update 
            if(note.title=selectedNote.title){
                return{
                    ...note,
                    lastEditTime:Date.now()
                }
            }
            return note;
        })
    )

})

export const createEmptyNoteAtom=atom(null,(get,set)=>{
    const notes=get(notesAtom);
    if(!notes) return ;
    const title= `Note ${notes.length+1}`
    const newNote:NoteInfo={
        title,
        lastEditTime:Date.now()
    }
    set(notesAtom,[newNote,...notes.filter((note)=>note.title!==newNote.title)]);
    set(selectedNoteIndexAtom,0);
})

export const deleteNoteAtom=atom(null,(get,set)=>{
    const notes=get(notesAtom);
    const selectedNote=get(selectedNoteAtom)
    if(!selectedNote || !notes) return;
    set(notesAtom,notes.filter((note)=>note.title!==selectedNote.title))
    set(selectedNoteIndexAtom,null)
})