"use client"
import React, { useEffect } from 'react'
import axios from 'axios'

import DefaultLayout from '@/components/DefaultLayout'
const page = ({params}) => {

 


  return (
    <DefaultLayout>
      <div>
        Profile Page
        {params.id}
      </div>
    </DefaultLayout>
  )
}

export default page