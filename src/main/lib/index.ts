import { appDirectoryName, fileEncoding } from "@shared/constants"
import { NoteInfo } from "@shared/models"
import { CreateNote, DeleteNote, GetNotes, ReadNote, WriteNote } from "@shared/types"
import { dialog } from "electron"
import { ensureDir,readdir, readFile, remove, stat, writeFile } from "fs-extra"
import { homedir } from "os"
import path from "path"

export const getRootDir=()=>{
    return `${homedir()}\\${appDirectoryName}`
}

export const getNotes:GetNotes=async()=>{
    const rootDir=getRootDir();
    await ensureDir(rootDir);
    const noteFileNames= await readdir(rootDir, {
        encoding: fileEncoding,
        withFileTypes: false
    })
    const notes=noteFileNames.filter((fileName)=>fileName.endsWith('.md'))
    return Promise.all(notes.map(getNoteInfoFromFileName))
}

export const getNoteInfoFromFileName= async(fileName:string):Promise<NoteInfo>=>{
    const fileStats=await stat(`${getRootDir()}/${fileName}`)
    return {
        title:fileName.replace(/\.md$/,''),
        lastEditTime:fileStats.mtimeMs
    }
}

export const readNote:ReadNote=async (filename:string)=>{
    const rootDir=getRootDir();
    return readFile(`${rootDir}/${filename}.md`,{encoding:fileEncoding});
}

export const writeNote:WriteNote=async(filename,content)=>{
    const rootDir=getRootDir()
    console.info(`writing note ${filename}`);
    return writeFile(`${rootDir}/${filename}.md`,content,{encoding:fileEncoding});
}

export const createNote:CreateNote=async()=>{
    const rootDir=getRootDir()
    await ensureDir(rootDir);
    // when creating a new note we need to display the user info about what should be the title  and folder of the note 
    const{filePath,canceled}= await dialog.showSaveDialog({
        title:'New Note',
        defaultPath:`${rootDir}/Untitled.md`,
        buttonLabel:'Create',
        properties:['showOverwriteConfirmation'],
        showsTagField:false,
        filters:[{
            name:'Markdown',extensions:['md']
        }]
    })
    if(canceled || !filePath){
        console.info('note creation canceled');
        return false;
    }

    
    const {name:filename,dir:parentDir}=path.parse(filePath)


    console.info(parentDir,rootDir,'from createNote node function ');
    if(parentDir!==rootDir){
        console.info(parentDir,rootDir)
        await dialog.showMessageBox({
            type:'error',
            title:'creation failed',
            message:`All notes must be saved under ${rootDir}, Avoid using other dirs!`

        })
        return false;
    }
    console.info(`creating note ${filePath}`)
    await writeFile(filePath,'',{encoding:fileEncoding})
    return filename
}

export const deleteNote:DeleteNote=async(filename)=>{
     const rootDir=getRootDir();
     const {response} =await dialog.showMessageBox({
        type:'warning',
        title:'DeleteNote',
        message:`Are you sure you want to Delete ${filename}`,
        buttons:['Delete','Cancel'], //0 for delete 1 for cancel
        defaultId:1,
        cancelId:1,

     })
     if(response==1){
        console.info('note deletion canceled')
        return false;
     }
     console.info(`deleting note: ${filename}`)
     await remove(`${rootDir}/${filename}.md`)
     return true; 
}