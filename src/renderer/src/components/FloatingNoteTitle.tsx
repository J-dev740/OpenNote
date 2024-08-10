import { selectedNoteAtom } from '@renderer/store'
import { useAtomValue } from 'jotai'
import React, { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

const FloatingNoteTitle = ({className,...props}:ComponentProps<'div'>) => {

    // creating a mock title for testing
    // const title ="Mock title"
    const selectedNote=useAtomValue(selectedNoteAtom)
    if(!selectedNote) return null

  return (
    <div {...props} className={twMerge('flex justify-center ',className)}>
        <span className='text-gray-400'>
                {selectedNote.title} 
        </span>
    </div>
  )
}

export default FloatingNoteTitle