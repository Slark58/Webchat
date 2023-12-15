

export type TLinks = {
    binding: string
    label: string
} 

export const links: TLinks[] = [
    {
        binding: 'incoming',
        label: 'Входящие'
    },
    {
        binding: 'outgoing',
        label: 'Исходящие'
    }
]