import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import {data} from '@/app/api/banner.json'
import $ from 'jquery'
import '@/components/Banner.css'

export function rotate() {
  var lastChild = $('.slider div:last-child').clone();
  /*$('#test').html(lastChild)*/
  $('.slider div').removeClass('firstSlide')
  $('.slider div:last-child').remove();
  $('.slider').prepend(lastChild)
  $(lastChild).addClass('firstSlide')
}

export const Banner = () => {
  const [banner, setBanner] = useState([])

  useEffect(() => {
    setBanner(data)
  }, [])

  const ImageViews = banner.map((value,index) => {
    return (
      <Image key={index} src={value.image} alt="" className={`image${index} rounded-3xl drop-shadow-2xl`} width={600} height={600}/>
    )
  })

  return (
    <div className={'slider'}>
      {ImageViews}
    </div>
  )
}
