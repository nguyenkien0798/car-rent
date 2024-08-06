'use client'

import React from 'react'
import ScrollToTop from 'react-scroll-up'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

export default function ScrollToTopButton() {

  return (
    <ScrollToTop showUnder={160}>
      <ArrowCircleUpIcon sx={{ color: '#3563E9', fontSize: '36px' }}/>
    </ScrollToTop>
  )
}