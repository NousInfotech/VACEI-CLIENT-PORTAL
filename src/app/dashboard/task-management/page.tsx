import TaskManagementPage from '@/components/client-portal/TaskManagementPage'
import PageContainer from '@/components/layout/page-container'
import React from 'react'

function page() {
  return (
    <PageContainer>
        <div className='container mx-auto'>
            <TaskManagementPage />
        </div>
    </PageContainer>
  )
}

export default page
