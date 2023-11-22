import { Paths } from "@/App/Routes/types/Paths";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import './PageHeader.scss'

interface PageHeaderProps {
    name: string
}

const PageHeader = ({name}: PageHeaderProps) => {
  return (
    <>
        <div className="pageheader">
            <Link className='pageheader__link' to={Paths.Home}><ArrowLeft  className="back-icon"/></Link>
            <h2 className="pageheader__title">{name}</h2>
        </div>
        <hr />
    </>
  );
};

export {PageHeader}