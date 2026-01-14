import React, { useEffect, useState } from "react";
import { runSickwTest } from "../..../services/imeiApi";

function CheckResult() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchTest = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await runSickwTest();
        if (mounted) setData(res);
      } catch (err) {
        if (mounted) setError(err?.message || JSON.stringify(err));
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchTest();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div>
      <h2>IMEI Check Test</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {data && (
        <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default CheckResult;
