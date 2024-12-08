import { useSelector } from 'react-redux'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js'

import { Loader } from '../cmps/Loader'
import { Doughnut, Line } from 'react-chartjs-2'
import { useMemo } from 'react'
// import faker from 'faker'

ChartJS.register(ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

export function ToyDashboard() {
  const toys = useSelector((storeState) => storeState.toyModule.toys)
  const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)

  function getPricesPerLabel(toys) {
    const labelPrices = {}
    toys.forEach((toy) => {
      toy.labels.forEach((label) => {
        if (!labelPrices[label]) labelPrices[label] = 0
        labelPrices[label] += toy.price
      })
    })
    // console.log(labelPrices)
    return labelPrices
  }

  function getPercentageInStockToyByLabels(toys) {
    const labelStats = {}
    toys.forEach((toy) => {
      toy.labels.forEach((label) => {
        if (!labelStats[label]) {
          labelStats[label] = { total: 0, inStock: 0 }
        }
        labelStats[label].total += 1

        if (toy.inStock) {
          labelStats[label].inStock += 1
        }
      })
    })

    const labelPercentages = {}
    for (const label in labelStats) {
      const { total, inStock } = labelStats[label]
      labelPercentages[label] = ((inStock / total) * 100).toFixed(2)
    }
    return labelPercentages
  }

  const labelPricesChartData = useMemo(() => {
    const labelPrices = getPricesPerLabel(toys)
    return {
      labels: Object.keys(labelPrices),
      datasets: [
        {
          label: 'Prices per Label',
          data: Object.values(labelPrices),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }
      ]
    }
  }, [toys])

  const percentages = getPercentageInStockToyByLabels(toys)
  const labelInStockPercentagesChartData = {
    labels: Object.keys(percentages),
    datasets: [
      {
        label: 'In-Stock Percentage',
        data: Object.values(percentages),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
        borderWidth: 1
      }
    ]
  }

  const lineChartData = useMemo(() => {
    const dates = Array.from({ length: 10 }, (_, idx) => {
      const date = new Date()
      date.setDate(date.getDate() - (9 - idx))
      return date.toISOString().split('T')[0] // Format as YYYY-MM-DD
    })

    const randomValues = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1)

    return {
      labels: dates, // Use the dates as labels
      datasets: [
        {
          label: 'Random Value Over Time',
          data: randomValues,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderWidth: 2,
          tension: 0.4 // Smooth curve
        }
      ]
    }
  }, [])

  if (isLoading) return <Loader />

  return (
    <section className='toy-dash-container'>
      <div className='dashboard-chart'>
        <h1>Labels Prices Dashboard:</h1>
        <Doughnut data={labelPricesChartData} />
        <h1>Labels InStock Percentage Dashboard:</h1>
        <Doughnut data={labelInStockPercentagesChartData} />
        <h1>Random Line Chart:</h1>
        <Line data={lineChartData} />
      </div>
    </section>
  )
}
