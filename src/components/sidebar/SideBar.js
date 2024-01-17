import React from 'react'
import '../../styles/Sidebar.css'

import NewFile from './NewFile'
import SidebarItems from './SidebarItems';

import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ImportantDevicesIcon from '@mui/icons-material/ImportantDevices';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import StorageIcon from '@mui/icons-material/Storage';

const SideBar = () => {
    return (
        <div className='sidebar'>
                <NewFile />
            <div className="sidebar__itemsContainer">
                <SidebarItems arrow icon={(<InsertDriveFileIcon />)} label={'My Drive'} />
                <SidebarItems arrow icon={(<ImportantDevicesIcon />)} label={'Computers'} />
                <SidebarItems icon={(<PeopleAltIcon />)} label={'Shared with me'} />
                <SidebarItems icon={(<QueryBuilderIcon />)} label={'Recent'} />
                <SidebarItems icon={(<StarBorderIcon />)} label={'Starred'} />
                <SidebarItems icon={(<DeleteOutlineIcon />)} label={'Bin'} />
                
                <hr/>
                
                <SidebarItems icon={(<StorageIcon />)} label={'Storage'} />

            </div>

        </div>
    )
}

export default SideBar