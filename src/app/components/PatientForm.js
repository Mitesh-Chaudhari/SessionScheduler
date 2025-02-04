import { useState, useEffect } from "react"

export default function PatientForm({ onSubmit, existingInfo }) {
  const [name, setName] = useState("")
  const [mobile, setMobile] = useState("")
  const [whatsappSame, setWhatsappSame] = useState(false)
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (existingInfo) {
      setName(existingInfo.name)
      setMobile(existingInfo.mobile)
      setWhatsappSame(existingInfo.whatsapp === existingInfo.mobile)
      setEmail(existingInfo.email)
      setAddress(existingInfo.address)
    }
  }, [existingInfo])

  const validateForm = () => {
    const newErrors = {}
    if (!name.trim()) newErrors.name = "Name is required"
    if (!mobile.trim()) newErrors.mobile = "Mobile number is required"
    if (!/^\d{10}$/.test(mobile)) newErrors.mobile = "Invalid mobile number"
    if (!email.trim()) newErrors.email = "Email is required"
    if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email address"
    if (!address.trim()) newErrors.address = "Address is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit({
        name,
        mobile,
        whatsapp: whatsappSame ? mobile : "",
        email,
        address,
      })
    }
  }

  return (
    <>
      <h3>Patient Detail</h3>
      <form onSubmit={handleSubmit} className="">
        <div className="form-input-box">
          <label className="">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`form-input ${errors.name ? "border-red-500" : ""}`}
            required
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </div>
        <div className="form-input-box">
          <label className="">Mobile Number</label>
          <input
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className={`form-input ${errors.mobile ? "border-red-500" : ""}`}
            required
          />
          {errors.mobile && <p className="text-red-500">{errors.mobile}</p>}
        </div>
        <div className="form-input-box">
          <label className="checkbox-input-box">
            <input type="checkbox" checked={whatsappSame} onChange={(e) => setWhatsappSame(e.target.checked)} />
            <span className="">WhatsApp Number same as Mobile Number</span>
          </label>
        </div>
        <div className="form-input-box">
          <label className="block">Email ID</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`form-input ${errors.email ? "border-red-500" : ""}`}
            required
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>
        <div className="form-input-box">
          <label className="block">Address</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={`form-input ${errors.address ? "border-red-500" : ""}`}
            required
          ></textarea>
          {errors.address && <p className="text-red-500">{errors.address}</p>}
        </div>
        <button type="submit" className="btn btn-primary">
          Next
        </button>
      </form>
    </>
  )
}

