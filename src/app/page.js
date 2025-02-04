"use client"
import { useState } from "react"
import DoctorList from "./components/DoctorList"
import ScheduleSession from "./components/ScheduleSession"
import SessionSummary from "./components/SessionSummary"
import "react-datepicker/dist/react-datepicker.css"

export default function Home() {
  const [step, setStep] = useState('selectDoctor')
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [sessionDetails, setSessionDetails] = useState(null)

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor)
    setStep('sheduleSession')
  }

  const handleScheduleSubmit = (details) => {
    setSessionDetails(details)
    setStep('summary')
  }

  const handleEdit = () => {
    setStep('sheduleSession')
  }

  const handleChangeDoctor = () => {
    setStep('selectDoctor')
  }

  return (
    <>
      {step === 'selectDoctor' && <DoctorList onDoctorSelect={handleDoctorSelect} />}
      {step === 'sheduleSession' && (
        <ScheduleSession doctor={selectedDoctor} onSubmit={handleScheduleSubmit} existingDetails={sessionDetails} />
      )}
      {step === 'summary' && (
        <SessionSummary
          doctor={selectedDoctor}
          sessionDetails={sessionDetails}
          onEdit={handleEdit}
          onChangeDoctor={handleChangeDoctor}
        />
      )}
    </>
  )
}

