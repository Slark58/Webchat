import { Burger } from "@/Components";
import { Search, X } from "lucide-react";
import { ChangeEvent, memo } from "react";

interface SideBarHeaderProps {
    visionMenu: boolean
    value: string
    toggleMenu: () => void
    clearInput: () => void
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const SideBarHeader = memo(({clearInput, toggleMenu, value, visionMenu, handleChange}: SideBarHeaderProps) => {
  return (
    <div className='sidebar__header'>
        <Burger visionMenu={visionMenu} toggleMenu={toggleMenu} />
        <div className='sidebar__header-search'>
        <input
            type='text'
            value={value}
            onChange={handleChange}
            className='sidebar__header-search-input'
        />
        <Search className='search-icon' />
        <div
            className={value ? 'close-btn' : 'close-btn-none'}
            onClick={clearInput}>
            <X />
        </div>
        </div>
    </div>
  );
});

export {SideBarHeader};