import { useState } from "react";

function App() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function checkCode() {
    setLoading(true);
    try {
        const response = await fetch("http://127.0.0.1:5000/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code })
      });
      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      setResult("Error connecting to backend: " + error.message);
    }
    setLoading(false);
  }

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", padding: "20px", fontFamily: "sans-serif" }}>
      
      <h1 style={{ fontSize: "22px" }}>🔍 AI Code Reviewer</h1>
      <p>Paste your code below and get instant AI feedback</p>

      <textarea
        rows={12}
        style={{ width: "100%", padding: "12px", fontSize: "13px", fontFamily: "monospace", borderRadius: "8px", border: "1px solid #ccc" }}
        placeholder="Paste your code here..."
        onChange={(e) => setCode(e.target.value)}
      />

      <br />

      <button
        onClick={checkCode}
        style={{ marginTop: "12px", padding: "12px 30px", background: "#6366f1", color: "white", border: "none", borderRadius: "8px", fontSize: "14px", cursor: "pointer" }}>
        {loading ? "Reviewing..." : "Review My Code ✨"}
      </button>

      {result && (
        <div style={{ marginTop: "30px", background: "#f8f8f8", padding: "20px", borderRadius: "8px", whiteSpace: "pre-wrap", fontSize: "13px" }}>
          <h2 style={{ fontSize: "18px" }}>📋 Review Result</h2>
          {result}
        </div>
      )}

    </div>
  );
}

export default App;