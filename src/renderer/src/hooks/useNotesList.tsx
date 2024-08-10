import { notesAtom, selectedNoteAtom, selectedNoteIndexAtom } from "@renderer/store"
import { useAtom, useAtomValue } from "jotai";




export const useNotesList=({onSelect}:{onSelect?:()=>void})=>{
    const notes=useAtomValue(notesAtom);

    const [selectedIndex,setSelectedIndex]=useAtom(selectedNoteIndexAtom)
    const handleSelect=(index:number)=>async()=>{
        setSelectedIndex(index);

        if(onSelect){ onSelect();}
    }
    return{
        notes,
        selectedIndex,
        handleSelect
    }
}