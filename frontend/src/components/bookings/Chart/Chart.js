import React from 'react';
import {Bar as BarChart} from 'react-chartjs-2'


import './Chart.scss';

const BOOKINGS_PRICE  = {
    
    
    "cheap": {
        min: 0,
        max:100
    },
    "normal": {
        min: 100,
        max: 200
    },
    "expensive": 1000000
}

const Chart = ({bookings}) => {

    const chartData = { labels: [], datasets: [] };
    
    let output  = [];

    for(const price in BOOKINGS_PRICE){
       
        const filteredEvents = bookings.reduce((prev,current)=>{
            if(current.event.price > BOOKINGS_PRICE[price].min && current.event.price < BOOKINGS_PRICE[price].max){
               return prev + 1;
            }
            else {
                return prev
            }
            
        },0);
        output.push(filteredEvents);
        chartData.labels.push(price);
        chartData.datasets.push({
          // label: "My First dataset",
          fillColor: 'rgba(220,220,220,0.5)',
          strokeColor: 'rgba(220,220,220,0.8)',
          highlightFill: 'rgba(220,220,220,0.75)',
          highlightStroke: 'rgba(220,220,220,1)',
          data: output
        });
        output = [...output];
        output[output.length - 1] = 0;
    }

    
    return ( 
        <div className="chart">
                <BarChart data={chartData} width={200} height={200}/>
        </div>
     );
}
 
export default Chart;