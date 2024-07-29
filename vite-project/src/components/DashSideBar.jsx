import { HiArrowSmRight, HiUser } from 'react-icons/hi';
import { Sidebar } from 'flowbite-react';
import {useLocation,Link} from 'react-router-dom'
import {useState,useEffect} from 'react'
export default function DashSideBar() {
  const location = useLocation()
  const [tab,setTab] = useState(' ')
  useEffect(()=>{
    const urlParams =new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    if(tabFromUrl){
      setTab(tabFromUrl)
    }
  },[location.search])
  return (
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items >
        <Sidebar.ItemGroup>
          <Link to='/dashboard?tab=profile'>
          <Sidebar.Item 
            active ={tab==='profile'}
            href="/profile"
            icon={HiUser}
            label="User"
            labelColor="dark"
            className="cursor-pointer"
            as='div'
          >
            Profile
          </Sidebar.Item>
          </Link>
          <Sidebar.Item 
            href="/sign-out"
            icon={HiArrowSmRight}
            className="cursor-pointer"
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
