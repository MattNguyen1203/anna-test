'use client'

import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useMediaQuery } from '@mui/material'
import theme from '../ThemeRegistry/theme'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 6 + ITEM_PADDING_TOP
    }
  }
}

const Placeholder = ({ item, icon }) => (
  <div className='flex items-center w-full gap-[0.62vw] border-none outline-none'>
    <Image
      src={icon}
      alt='Money Image'
    />
    <span className='text-[0.875vw] max-md:text-[3.73vw] font-normal'>{item}</span>
  </div>
)

export default function OptionBudget({icon, list, defaultValue, onSelect, lang }) {
  let price = '$'
  let budget = 'Budget'
  if(lang === 'fr' || lang === 'it') {
    price = '€'
  }
  if (lang === 'it') {
    budget = 'Budget'
  }

  const handleChange = (event) => {
    const {
      target: { value }
    } = event
    if(value === budget) {
      onSelect([])
    }else {
      onSelect(value)
    }
  }
  const onlySmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const handleSort = (fn) => {
    fn?.sort(function(a, b) {
      var numA = parseInt(a?.name?.split('-')[0]);
      var numB = parseInt(b?.name?.split('-')[0]);
      return numA - numB;
    });
  }
  
  handleSort(list)

  return (
    <div>
      <FormControl className='mb-[0.94vw] max-md:rounded-[1.06vw] bg-[#F0F0F0] 
      rounded-[0.24913vw] flex justify-between items-center w-full outline-none max-md:h-[13.33vw]'>
        <Select
          sx={{
            boxShadow: 'none',
            height: onlySmallScreen ? '100%' : 'auto',
            '.MuiOutlinedInput-notchedOutline': { border: 0 },
            '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
              border: 0
            },
            '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              border: 0
            },
            width: '100%'
          }}
          displayEmpty
          value={defaultValue || "Budgets"}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'Without label' }}
          renderValue={(selected) => {
            return (
              <Placeholder
                icon={icon}
                item={selected}
              />
            )
          }}
        >
          <MenuItem value={budget}>
            <div className='flex gap-[1vw] items-center'>
              <Image
                src={icon}
                alt='Money Image'
              />
              <span className='px-2 py-[0.25vw] md:text-[0.875vw] text-[3.73vw] font-normal'>{budget}</span>
            </div>
          </MenuItem>
          {list?.map((item) => (
            <MenuItem
              key={item?.name}
              value={item?.name}
            >
              <div className='flex gap-[1vw] items-center'>
                <Image
                  src={icon}
                  alt='Money Image'
                />
                <div className='px-2 py-[0.25vw] text-[0.875vw] font-normal max-md:text-[3.73vw]'>{item?.name} {price}</div>
              </div>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}
