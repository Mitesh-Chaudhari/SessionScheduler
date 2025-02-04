import { useState, useEffect } from "react"
import DatePicker from "react-datepicker"
import { setHours, setMinutes, addWeeks, getDay, isSameDay } from "date-fns"
import "react-datepicker/dist/react-datepicker.css"
import PatientForm from "./PatientForm"
import Header from "./Header"

export default function ScheduleSession({ doctor, onSubmit, existingDetails }) {
  const [patientInfo, setPatientInfo] = useState(null)
  const [sessionType, setSessionType] = useState("")
  const [sessionMode, setSessionMode] = useState("")
  const [sessionDateTime, setSessionDateTime] = useState(null)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (existingDetails) {
      setPatientInfo(existingDetails.patientInfo)
      setSessionType(existingDetails.sessionType)
      setSessionMode(existingDetails.sessionMode)
      if (existingDetails.sessionDate && existingDetails.sessionTime) {
        const [hours, minutes] = existingDetails.sessionTime.split(":")
        const date = new Date(existingDetails.sessionDate)
        date.setHours(Number.parseInt(hours, 10), Number.parseInt(minutes, 10))
        setSessionDateTime(date)
      }
    }
  }, [existingDetails])

  const handlePatientSubmit = (info) => {
    setPatientInfo(info)
  }

  const validateForm = () => {
    const newErrors = {}
    if (!sessionType) newErrors.sessionType = "Session type is required"
    if (!sessionMode) newErrors.sessionMode = "Session mode is required"
    if (!sessionDateTime) newErrors.sessionDateTime = "Session date and time are required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit({
        patientInfo,
        sessionType,
        sessionMode,
        sessionDate: sessionDateTime.toISOString().split("T")[0],
        sessionTime: sessionDateTime.toTimeString().slice(0, 5),
      })
    }
  }

  const isWeekday = (date) => {
    const day = getDay(date)
    return day !== 0 && day !== 6
  }

  const isDisabledDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    const nextWeek = addWeeks(today, 1);
    const nextWeekTuesday = new Date(nextWeek);
    nextWeekTuesday.setDate(nextWeekTuesday.getDate() + (2 - nextWeekTuesday.getDay() + 7) % 7);
    const nextWeekWednesday = new Date(nextWeek);
    nextWeekWednesday.setDate(nextWeekWednesday.getDate() + (3 - nextWeekWednesday.getDay() + 7) % 7);
  
    return (
      !isWeekday(date) ||
      date < today ||
      isSameDay(date, nextWeekTuesday) ||
      isSameDay(date, nextWeekWednesday)
    );
  };

  const filterTime = (time) => {
    const selectedDate = new Date(time)
    return selectedDate.getHours() >= 10 && selectedDate.getHours() < 18
  }

  return (
    <>
      <Header heading="Schedule Session" />
      <div className="container">
        <div className="selected-card-wrapper">
          <div className="selected-card">
            <h3 className="">Selected Doctor</h3>
            <p><span className="w-500">Name:</span> {doctor.name}</p>
            <p><span className="w-500">Specialty:</span> {doctor.specialty}</p>
            <p><span className="w-500">Session Fee:</span> ₹{doctor.fee}</p>
          </div>
          {!patientInfo ? (
            <PatientForm onSubmit={handlePatientSubmit} existingInfo={existingDetails?.patientInfo} />
          ) : (
            <form onSubmit={handleSubmit} className="">
              <div className="patient-detail">
                <h3 className="">Patient Details</h3>
                <p>Name: {patientInfo.name}</p>
                <p>Mobile: {patientInfo.mobile}</p>
                <p>Email: {patientInfo.email}</p>
              </div>
              <div className="form-input-box">
                <label className="w-600">Session Type</label>
                <select
                  value={sessionType}
                  onChange={(e) => setSessionType(e.target.value)}
                  className={`form-input ${errors.sessionType ? "border-red-500" : ""}`}
                  required
                >
                  <option value="">Select Session Type</option>
                  <option value="Intro">Intro (15min - Free Session)</option>
                  <option value="Conselling">Conselling (15min - Free Session)</option>
                  <option value="Renewal">Renewal of Prescription</option>
                </select>
                {errors.sessionType && <p className="text-red-500 text-sm mt-1">{errors.sessionType}</p>}
              </div>
              <div className="form-input-box">
                <label className="w-600">Session Mode</label>
                <div className="flex">
                  <label className="mr-2">
                    <input
                      type="radio"
                      value="in-person"
                      checked={sessionMode === "in-person"}
                      onChange={(e) => setSessionMode(e.target.value)}
                      required
                      className="mr-1"
                    />
                    <span className="ml-2">In-person</span>
                  </label>
                  <label className="">
                    <input
                      type="radio"
                      value="online"
                      checked={sessionMode === "online"}
                      onChange={(e) => setSessionMode(e.target.value)}
                      required
                      className="mr-1"
                    />
                    <span className="ml-2">Online</span>
                  </label>
                </div>
                {errors.sessionMode && <p className="text-red-500 text-sm mt-1">{errors.sessionMode}</p>}
              </div>
              <div className="form-input-box">
                <label className="w-600">Session Date and Time</label>
                <DatePicker
                  selected={sessionDateTime}
                  onChange={(date) => setSessionDateTime(date)}
                  showTimeSelect
                  timeIntervals={30}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  timeFormat="HH:mm"
                  minDate={new Date()}
                  filterDate={isWeekday}
                  filterTime={filterTime}
                  excludeDates={[addWeeks(new Date(), 1), addWeeks(new Date(), 1)]}
                  className={`form-input ${errors.sessionDateTime ? "border-red-500" : ""}`}
                  placeholderText="Select date and time"
                />
                {errors.sessionDateTime && <p className="text-red-500 text-sm mt-1">{errors.sessionDateTime}</p>}
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  )
}

