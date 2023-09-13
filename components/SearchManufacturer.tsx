"use client"
import { SearchManuFacturerProps } from '@/types'
import { Combobox, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'
import Image from 'next/image'
import { manufacturers } from '@/Constants'
const SearchManufacturer = ( {manufacturer ,  setmanufacturer} : SearchManuFacturerProps ) => {
  const [query , setquery] = useState('');

  const filteredManufacturers =
    query === ""
      ? manufacturers
      : manufacturers.filter((item) =>
          item
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );
  return (
    <div className='search-manufacturer' >
      <Combobox value={manufacturer} onChange={setmanufacturer} >
        <div className='relative w-full ' >
        <Combobox.Button className='absolute top-[14px]'>
            <Image
              src='/car-logo.svg'
              width={20}
              height={20}
              className='ml-4'
              alt='car logo'
            />
          </Combobox.Button>
          <Combobox.Input 
          className='search-manufacturer__input'
          placeholder='volkswagen'
          displayValue={(manufacturer : string )=> manufacturer}
          onChange={ (e) => setquery(e.target.value) }
          />
          <Transition     
            as={Fragment} 
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
            afterLeave={() => setquery("")}>
           <Combobox.Options>
            {filteredManufacturers.map((item)=>(
              <Combobox.Option
              key={item}
              className={({ active }) =>
                `relative search-manufacturer__option ${
                  active ? "bg-primary-blue text-white" : "text-gray-900"
                }`
              }
              value={item}
              >
               {item}
              </Combobox.Option>
            ))}
           </Combobox.Options>
            </Transition>
        </div>
      </Combobox>
    </div>
  )
}

export default SearchManufacturer