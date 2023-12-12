"use client"

import React, { useEffect, useCallback } from 'react';
import request from '@/app/lib/request';

export default function RenderingHome () {
  const loadData = useCallback(() => {
    request.get('/api/test').then((res) => {
      console.log(res)
    })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])


  return (
    <div>
      Hey there
    </div>
  )
}
