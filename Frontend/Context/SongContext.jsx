import { Children, createContext,useState } from "react";

export const CurrentSongContext=createContext();

export const CurrentSongProvider=({children})=>{
    const [songData,setSongData]=useState("");
    return (
        <CurrentSongContext.Provider value={{songData,setSongData}}>
            {children}
        </CurrentSongContext.Provider>
    )
}