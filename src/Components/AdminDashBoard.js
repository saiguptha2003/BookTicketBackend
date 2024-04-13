import React from 'react';

function AdminDashBoard(props) {
    return (
        <div className='container'>
            <div className='column'>
            <div className='cardButton'>
               <button className='moviesManage' onClick={() => window.location.href='/admin/AdminDashboard/Movies'}>Manage Movies</button>
            </div>
            <div className='cardButton'>
               <button className='moviesManage' onClick={() => props.history.push('/admin')}>Manage Theaters</button>
            </div>
            <div className='cardButton'>
               <button className='moviesManage' onClick={() => props.history.push('/admin')}>Manage Cities</button>
            </div>

            </div>
            
            
        </div>
    );
}

export default AdminDashBoard;