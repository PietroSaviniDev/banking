'use client'
import React from 'react'
import { Chart as ChartJs, ArcElement, Tooltip, Legend} from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJs.register(ArcElement, Tooltip, Legend);

export const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
    const data = {
        datasets: [
            {
                label: 'banks',
                data:[1250, 2500, 3750],
                backgroundColor:['#0747b6', '#2265d8', '#2f91fa']
            }
        ], 
        labels: [ 'bank1', 'bank2', 'bank3']
    }
  return (
    <Doughnut 
        data={data} 
        options={{
            cutout: '60%',
            plugins:{
                legend:{
                    display: false
                }
            }
        }}
    />
  )
}
