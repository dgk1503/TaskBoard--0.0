import { useState, useEffect } from "react";
import api from "../lib/axios";
import Navbar from "../components/Navbar";

const VerifyEmail = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const e = params.get("email");
    if (e) setEmail(e);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await api.post("/auth/verify-email", { email, otp });
      if (res.data.success) {
        setMessage(res.data.message || "Email verified successfully.");
        // redirect to login or homepage after a short delay
        setTimeout(() => {
          window.location.href = "/";
        }, 1200);
      } else {
        setMessage(res.data.message || "Verification failed.");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Verification error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-md mx-auto mt-10 p-6 backdrop-blur-sm rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-6">Verify Email</h2>
        {message && <p className="text-black mb-4">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Verification Code (OTP)</label>
            <input
              type="text"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white p-2 rounded transition ease-in-out duration-300 hover:bg-blue-600"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
