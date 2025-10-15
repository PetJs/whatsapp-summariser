import type { ReactNode } from "react"

interface ButtonProps{
    children: ReactNode
    className?: string
}

const Button: React.FC<ButtonProps> = ({children, className}) => {

    return(
        <div className={`${className} flex gap-1 px-2 items-center rounded-2xl cursor-pointer`}>
            {children}
        </div>
    )
}


export default Button;