import { Component, ComponentProps, forwardRef } from "react"
import { twMerge } from "tailwind-merge"

export const RootLayout=({children,className,...props}:ComponentProps<'main'>)=>{
    return <main {...props} className={twMerge('flex flex-row h-screen ',className)}>
        {children}
    </main>
}
export const SideBar=({className,children,...props}:ComponentProps<'aside'>)=>{
    return <aside className={twMerge(`w-[250px] mt-10 h-[100vh+10px] overflow-auto`,className)}
    {...props}>
        {children}
    </aside>
}
// here the forward refencing will be usefull when getting through different notes as it would help to reset 
// scroll of these elements 
export const Content=forwardRef<HTMLDivElement,ComponentProps<'div'>>(
    ({children,className,...props},ref)=>(
        <div ref={ref} className={twMerge('flex-1 h-full overflow-auto ',className)}{...props}>
            {children}
        </div>
    )
)
Content.displayName='Content'