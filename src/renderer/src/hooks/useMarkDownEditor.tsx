import { MDXEditorMethods } from "@mdxeditor/editor";
import { saveNoteAtom, selectedNoteAtom } from "@renderer/store"
import { NoteContent } from "@shared/models";
import { useAtomValue, useSetAtom } from "jotai"
import { useRef } from "react";

export const useMarkDownEditor=()=>{
    const selectedNote=useAtomValue(selectedNoteAtom);
    const saveNote=useSetAtom(saveNoteAtom)
    const editorRef=useRef<MDXEditorMethods>(null)
    const handleAutoSaving=async (content:NoteContent)=>{
        if(!selectedNote) return ;
        console.info('auto saving:',selectedNote.title);
        await saveNote(content)
    }
    return{
        selectedNote,
        editorRef,
        handleAutoSaving
    }
}