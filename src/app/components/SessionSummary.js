import Header from "./Header";

export default function SessionSummary({ doctor, sessionDetails, onEdit, onChangeDoctor }) {
    return (
      <>
        <Header heading="Session Summary" />
        <div className="container">
          <div className="detail-card-wrapper flex">
            <div className="detail-card-list-box">
              <div className="detail-card-box">
                <h3 className="">Doctor Details</h3>
                <p>Name:{doctor.name}</p>
                <p>Speciality: {doctor.specialty}</p>
                <p>Session Fee: ₹{doctor.fee}</p>
              </div>
            </div>
            <div className="detail-card-list-box">
              <div className="detail-card-box">
                <h3 className="">Patient Details</h3>
                <p>Name: {sessionDetails.patientInfo.name}</p>
                <p>Mobile: {sessionDetails.patientInfo.mobile}</p>
                <p>Email: {sessionDetails.patientInfo.email}</p>
              </div>
            </div>
            <div className="detail-card-list-box">
              <div className="detail-card-box">
                <h3 className="">Session Details</h3>
                <p>Type: {sessionDetails.sessionType}</p>
                <p>Mode: {sessionDetails.sessionMode}</p>
                <p>Date: {sessionDetails.sessionDate}</p>
                <p>Time: {sessionDetails.sessionTime}</p>
              </div>
            </div>
          </div>
          <div className="">
              <button onClick={onEdit} className="btn w-auto btn-primary mr-2">
                Edit Details
              </button>
              <button onClick={onChangeDoctor} className="btn w-auto btn-primary">
                Change Doctor
              </button>
          </div>
        </div>
      </>
    )
  }
  
  