
import React from 'react'
import { Line } from 'react-chartjs-2'
import io from 'socket.io-client'
import { FaTemperatureLow , FaCloudSun, FaCloudMoon} from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Form, Button, Col, Row, Container} from 'react-bootstrap'
import './sty.css'
import { useEffect , useState } from 'react'

const socket = io('http://localhost:3200');

const BarChart = () => {
  
  const [data, setData] = useState([]);
  const [textdata, settext] = useState({
    senHum:'',
    tem: "",
        hum: "",
        light: ""
});
  const [label, setLabel] = useState([]);
  const [dateTimeNow, setDateTimeNow] = useState({
    time: new Date().toLocaleTimeString(),
    hours: new Date().getHours()
});



  useEffect(() => {
    socket.on("cpu", (abc) => {
      let rawData = JSON.parse(abc)
                setData(prev => {
                    prev = [...prev, rawData.Tem];
                    if (prev.length > 7) {
                        prev.splice(0, 1);
                    }
                    return prev;
                })  ;
                setLabel(prev => {
                  prev = [...prev, new Date().toLocaleTimeString()];
                  if (prev.length > 7) {
                      prev.splice(0, 1);
                  }
                  return prev;
                  
              });
              settext ({
                tem:rawData.Tem
              })
  })
  const timer = setInterval(() => {
    setDateTimeNow({
        time: new Date().toLocaleTimeString(),
        hours: new Date().getHours()
    });
}, 1000);
return () => clearInterval(timer);
},[]);
const {senHum}=textdata
const push = event => {
  event.preventDefault()
  socket.emit('push', `{"device":"${senHum}" }`)
  

}
const onChangetextdata = event => settext({...textdata, senHum: event.target.value})

  return (
    <div>
      <Container className='body'>
  <Row sm="12" md="12" >
    <Col style={{backgroundColor: "lightblue" , padding: "2rem",}} className='rows'>{dateTimeNow.time}  
    {
      dateTimeNow.hours < 18 && dateTimeNow.hours > 5
      ?
      <FaCloudSun size='2rem'/>
      :
      <FaCloudMoon size='2rem'/>
    }
    </Col>
    <Col style={{backgroundColor: "lightblue" , padding: "2rem"}} className='rows'><FaTemperatureLow size = '2rem' color='red'/>Nhiệt Độ {textdata.tem} °C</Col>

    
  </Row>

      <Line
    data={{
      labels: label,
      datasets: [
        {
          data: data,
          label: "Temperature",
          borderColor: "#ed0e0e",
          fill: false
        },
        
        
      ]
    }}
    height={400}
        width={600}
    options={{
      plugins: {
        
        datalabels: {
          
        anchor: 'center',
        align: 'bottom',
        formatter: Math.round,

          font: {
            weight: 'bold',
            size: 16,
            family: 'Josefin Sans',
          },
          
        }
  },
      maintainAspectRatio: false,
      responsive: false, 
      title: {
        display: true,
        text: "Temperature and Humidity"
      },      
      legend: {
        display: true,
        position: "top"
      },
      scales: {

        
        
        yAxes: [
          {
            
            ticks: {
              fontSize: 12, fontFamily: "'Roboto', sans-serif", fontColor: '#000', fontStyle: '500',
              beginAtZero: true,
            },
          },
        ],
      },
    }} 
    
  />
  <Form onSubmit = {push}>
    <Form.Group>
    <Form.Control
    type = 'text'
    placeholder='nhập nhiệt độ'
    name = 'senHum'
    required
    value={senHum}
    onChange={onChangetextdata}
    
    />
    
    </Form.Group>
    <Button variant = 'primary' type='submit'>Submit</Button>
  </Form>
  </Container>
    </div>
  )
}

export default BarChart