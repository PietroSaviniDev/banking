

import React from 'react'

import { formatAmount } from '@/lib/utils'
import { AnimatedCounter } from './AnimatedCounter'
import { DoughnutChart } from './DoughnutChart'
export const TotalBalanceBox = ({
    accounts = [],
    totalBanks,
    totalCurrentBalance
}: TotlaBalanceBoxProps) => {
  return (
    <section className='total-balance justify-center'>
        <div className="total-balance-chart">
            {/* Grafico a ciambella */}
            <DoughnutChart accounts={accounts} />
        </div>

        <div className='flex flex-col gap-6 '>
            <h2 className="header-2">
                Conti Collegati: {totalBanks} 
            </h2>
            <div className="flex flex-col gap-2">
                <p className='total-balance-label'>
                    Bilancio totale:
                </p>

                <div className='total-balance-amount flex-center gap-2'>
                    <AnimatedCounter amount={totalCurrentBalance} />
                </div>
            </div>
        </div>

    </section>
  )
}
