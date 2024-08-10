import { appDirectoryName, fileEncoding } from "@shared/constants"
import { NoteInfo } from "@shared/models"
import { GetNotes, ReadNote, WriteNote } from "@shared/types"
import { ensureDir,readdir, readFile, stat, writeFile } from "fs-extra"
import { homedir } from "os"

export const getRootDir=()=>{
    return `${homedir()}/${appDirectoryName}`
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