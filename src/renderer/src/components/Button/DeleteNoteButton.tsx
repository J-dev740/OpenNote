import { ActionButton, ActionButtonProps } from "./ActionButton";
import {FaRegTrashCan} from 'react-icons/fa6'
export const DeleteNoteButton=({...props}:ActionButtonProps)=>{
    <ActionButton {...props}>
        <FaRegTrashCan className="w-4 h-4 text-zinc-300"/>
    </ActionButton>
}