import { MDXEditorMethods } from "@mdxeditor/editor";
import { saveNoteAtom, selectedNoteAtom } from "@renderer/store"
import { NoteContent } from "@shared/models";
import { useAtomValue, useSetAtom } from "jotai"
import { useRef } from "react";
import {throttle} from 'lodash'
import { autoSavingTime } from "@shared/constants";
export const useMarkDownEditor=()=>{
    const selectedNote=useAtomValue(selectedNoteAtom);
    const saveNote=useSetAtom(saveNoteAtom)
    const editorRef=useRef<MDXEditorMethods>(null)
    const handleAutoSaving=throttle(async (content:NoteContent)=>{
        if(!selectedNote) return ;
        console.info('auto saving:',selectedNote.title);
        await saveNote(content)
    },autoSavingTime
    ,{
        leading:false,
        trailing:true,
    },100000)


    const handleBlur=async()=>{
        if(!selectedNote) return ;
        // to prevent overlapping of the auto saving handle cancel it 
        handleAutoSaving.cancel()
        const content=editorRef.current?.getMarkdown()
        if(content!=null){
            await saveNote(content);
        }

    }
    return{
        selectedNote,
        editorRef,
        handleAutoSaving,
        handleBlur
    }
}