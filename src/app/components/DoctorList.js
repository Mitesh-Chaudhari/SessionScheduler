import Image from "next/image"
import placeholderImage from '../../static/placeholder.jpg'
import Header from "./Header"

const doctors = [
    { id: 1, name: "Dr. John Doe", specialty: "Cardiologist", fee: 1500 },
    { id: 2, name: "Dr. Jane Smith", specialty: "Dermatologist", fee: 1000 },
    { id: 3, name: "Dr. Mike Johnson", specialty: "Pediatrician", fee: 2500 },
    { id: 4, name: "Dr. Sarah Brown", specialty: "Neurologist", fee: 3500 },
    { id: 5, name: "Dr. Alex", specialty: "Cardiologist", fee: 3500 },
    { id: 6, name: "Dr. Fernandis", specialty: "Dermatologist", fee: 2500 },
    { id: 7, name: "Dr. Cooper", specialty: "Pediatrician", fee: 1000 },
    { id: 8, name: "Dr. Bern", specialty: "Neurologist", fee: 1500 },
  ]
  
  export default function DoctorList({ onDoctorSelect }) {
    return (
      <>
        <Header heading="Available Doctors" />
        <div className="container">
          <div className="grid-layout">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="grid-layout-list">
                <div className="grid-layout-list-box">
                  <Image src={placeholderImage} alt="Doctor" />
                  <h4 className="title-4 w-600">{doctor.name}</h4>
                  <p>{doctor.specialty}</p>
                  <p>Session Fee: <strong className="text-6D6A5D">₹{doctor.fee}</strong></p>
                  <button
                    onClick={() => onDoctorSelect(doctor)}
                    className="btn btn-primary dr-book-now-btn"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    )
  }
  
  