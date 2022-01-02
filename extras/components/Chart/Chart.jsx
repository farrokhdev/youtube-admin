import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Area } from '@ant-design/charts'

const Chart = () => {
  const data = [
    {
      country: 'Asia',
      year: '1750',
      value: 502,
    },
    {
      country: 'Asia',
      year: '1800',
      value: 635,
    },
    {
      country: 'Asia',
      year: '1850',
      value: 809,
    },
    {
      country: 'Asia',
      year: '1900',
      value: 5268,
    },
    {
      country: 'Asia',
      year: '1950',
      value: 4400,
    },
    {
      country: 'Asia',
      year: '1999',
      value: 3634,
    },
    {
      country: 'Asia',
      year: '2050',
      value: 947,
    },
  ]

  const pattern = ({ country }) => {
    if (country === 'Asia') {
      return {
        type: 'line',
        cfg: {
          lineWidth: 50,
          strokeOpacity: 0.6,
        },
      }
    }
  }

  const config = {
    data,
    xField: 'year',
    yField: 'value',
    seriesField: 'country',
    color: ['#82d1de', '#cb302c', '#e3ca8c'],
    areaStyle: {
      fillOpacity: 0.6,
    },
    meta: {
      year: {
        nice: true,
        range: [0, 1],
      },
    },
    smooth: true,
    yAxis: {
      label: {
        formatter: (value) => {
          return value * 100
        },
      },
    },
    pattern,
  }
  return <Area {...config} />
}

export default Chart
