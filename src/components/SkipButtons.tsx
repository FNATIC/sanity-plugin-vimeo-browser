import React, { useEffect, useState } from 'react'

interface BoxProps {
  active?: boolean
  deactivated?: boolean
  link?: () => void
  children: React.ReactNode
}

const Box = ({ active, deactivated = false, link, children }: BoxProps) => {
  let className = 'flex items-center justify-center w-10 h-10 mx-1 border border-solid rounded-lg'

  const addClass = (classToAdd: string) => className = `${className} ${classToAdd}`

  if (deactivated) {
    addClass('cursor-not-allowed')
    addClass('border-gray-700 text-gray-700')
  }
  else if (active) {
    addClass('cursor-pointer')
    addClass('border-white text-white')
  }
  else {
    addClass('cursor-pointer')
    addClass('border-gray-700 text-gray-100 hover:border-white hover:text-white')
  }

  return (
    <div className={className} onClick={link}>
      {children}
    </div>
  )
}

const getArrowColor = (disabled: boolean) => {
  const dark = '#383D42'
  const light = '#EFF0F2'

  return disabled ? dark : light
}

interface SkipButtonsProps {
  index: number
  maxIndex: number
  nextLink?: () => void
  previousLink?: () => void
}


const SkipButtons: React.FC<SkipButtonsProps> = ({ index, maxIndex, nextLink, previousLink }) => {
  let firstIndex = -1
  let secondIndex = 0
  let thirdIndex = -1
  let leftArrowDisabled = false
  let rightArrowDisabled = false

  switch (index) {
    case 1:
      firstIndex = 1
      secondIndex = 2
      if (maxIndex > 2) thirdIndex = 3
      leftArrowDisabled = true
      break
    case maxIndex:
      if (maxIndex > 2) firstIndex = index - 2
      secondIndex = index - 1
      thirdIndex = index
      rightArrowDisabled = true
      break
    default:
      firstIndex = index - 1
      secondIndex = index
      thirdIndex = index + 1
  }

  return (
    <div className="flex justify-center w-80">
      <Box deactivated={leftArrowDisabled} link={previousLink}>
        <svg width="10" height="17" viewBox="0 0 10 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.5 15.5L1.5 8.5L8.5 1.5" stroke={getArrowColor(leftArrowDisabled)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Box>
      {firstIndex > -1 && <Box active={index === firstIndex} link={previousLink}>{firstIndex}</Box>}
      <Box active={index === secondIndex} link={leftArrowDisabled ? nextLink : rightArrowDisabled ? previousLink : undefined}>{secondIndex}</Box>
      {thirdIndex > -1 && <Box active={index === thirdIndex} link={nextLink}>{thirdIndex}</Box>}
      <Box deactivated={rightArrowDisabled} link={nextLink}>
        <svg width="10" height="17" viewBox="0 0 10 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.5 1.5L8.5 8.5L1.5 15.5" stroke={getArrowColor(rightArrowDisabled)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Box>
    </div>
  )
}

export default SkipButtons