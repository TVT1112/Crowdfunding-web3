import React from 'react';
import {Route,Router,Routes} from 'react-router-dom';

import {Home,Profile,CreateCampaign,CampaignDetails} from './pages';
import {Sidebar,Navbar} from './components';

const App = () => {
  return (
    <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      <div className='sm:flex hidden mr-10 relative'>
        <Sidebar/>
      </div>

      <div className='flex-1 max-sm:w-full max-w-[1280px]'>
        <Navbar/>
        <Routes>
        <Route path='/' element={<Home/>}></Route>
            <Route path='/profile' element={<Profile/>}></Route>
            <Route path='/create-campaign' element={<CreateCampaign/>}></Route>
            <Route path='/campaign-details/:id' element={<CampaignDetails/>}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App