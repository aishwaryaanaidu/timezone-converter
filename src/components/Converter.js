import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import './styles.css'
import { Input, Select, Card, Row, Col, Button, DatePicker, TimePicker } from 'antd';
import moment from 'moment';
import 'moment-timezone';
const { Option } = Select;

export const Converter = () => {

    const [ timezones, setTimeZones ] = useState([]);
    const [ fromTimeZone, setFromTimeZone ] = useState();
    const [ toTimeZone, setToTimeZone ] = useState();
    const [ enteredTime, setTime ] = useState();
    const [ enteredDate, setDate ] = useState();
    const [ result, setResult ] = useState();

    useEffect(() => {
        getTimeZones()
    }, [])

    const getTimeZones = () => {
        let timezones = [];
        timezones = moment.tz.names();
        console.log(timezones)
        timezones = timezones.map(item => ({ value: item, label: item }))
        setTimeZones(timezones)
    }
    
    const convertTimeZone = () => {
        let temp = `${moment(enteredDate).format("MM-DD-YYYY")} ${moment(enteredTime).format("HH:mm")}`
        let dateObj = moment.tz(temp, "MM-DD-YYYY HH:mm", fromTimeZone).utc();
        dateObj = dateObj.tz(toTimeZone).format("MMMM Do YYYY, h:mm a");
        setResult(dateObj);
    }
    return (
        <div>
            <Row gutter={16}>
                <Col span={8}>
                    <Card className="card text-color" title="From time zone" bordered={true}>
                        <TimePicker 
                            className="input" 
                            placeholder="Time" 
                            value={enteredTime}
                            format="HH:mm"
                            onChange={(value) => setTime(value)}
                        />
                        <DatePicker 
                            className="input" 
                            placeholder="Date" 
                            value={enteredDate}
                            format="MM-DD-YYYY"
                            onChange={(value) => setDate(value)}  
                        />
                        <Select
                            showSearch
                            className="dropdown text-color"
                            placeholder="Select a timezone"
                            value={fromTimeZone}
                            onChange={(value) => setFromTimeZone(value)}
                        >
                            {timezones.map(zone =>
                                <Option value={zone.value}>{zone.label}</Option>
                            )}
                        </Select>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="To time zone" className="card text-color" bordered={true}>
                    <Select
                            showSearch
                            className="dropdown"
                            placeholder="Select a timezone"
                            value={toTimeZone}
                            onChange={(value) => setToTimeZone(value)}
                        >
                            {timezones.map(zone =>
                                <Option value={zone.value}>{zone.label}</Option>
                            )}
                        </Select>
                        <Button type="primary" className="convert-button" onClick={convertTimeZone}>Convert</Button>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="Result" className="card" bordered={true}>
                        <span className="result text-color">{ !!result ? result : "Nothing to display" }</span>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}