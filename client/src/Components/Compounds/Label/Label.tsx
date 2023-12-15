import { ChangeEvent, HtmlHTMLAttributes, ReactNode } from "react"

interface ILabelProps {
    children: ReactNode
    className: string
    htmlFor: string
}
interface IInputProps {
    id: string
    type: string
    name: string
    value: string | number
    className: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Label = ({className, children, htmlFor}: ILabelProps) => {
    return (
        <label  className={className} htmlFor={htmlFor}>
            {children}
        </label>
    )
}

const Input = ({className, ...props}: IInputProps) => {
    return (
        <input className={className}  {...props} />
    )
}

const Title = ({className, children, ...props}: HtmlHTMLAttributes<HTMLDivElement>) => {
    return (
        <div className={className} {...props}>{children}</div>
    )
}

Label.Input = Input
Label.Title = Title


export {Label, Input, Title}