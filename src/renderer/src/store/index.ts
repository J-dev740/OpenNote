import { NoteInfo } from '@shared/models'
import {atom} from 'jotai'
import { notesMock } from './mocks'

export const notesAtom=atom<NoteInfo[]>(notesMock)

export const selectedNoteIndexAtom=atom<number|null>(null);

export const selectedNoteAtom=atom((get)=>{
    const notes=get(notesAtom);
    const selectedIndex=get(selectedNoteIndexAtom);
    if(selectedIndex==null) return null;
    const selectedNote=notes[selectedIndex];
    return{
        ...selectedNote,
        // this content needs to updated dynamically from the editor 
        content:`Hello from Note${selectedIndex}`
    }
})