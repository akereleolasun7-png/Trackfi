"use client";
import React, { useState, useEffect } from "react";

function PushNotification() {
  const [loading, setLoading] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  //   useEffect(() => {
  //   const check = async () => {
  //     if ('serviceWorker' in navigator) {
  //       const registration = await navigator.serviceWorker.ready
  //       const existing = await registration.pushManager.getSubscription()
  //       if (existing) setDismissed(true)
  //     }
  //     setDismissed(true)
  //   }
  //   check()
  // }, [])

  const requestPermission = async () => {
    setLoading(true);
    try {
      const permission = await Notification.requestPermission();

      if (permission === "granted") {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
        });

        const res = await fetch("/api/user/push", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ subscription }),
        });
        if (res.ok) {
          setDismissed(true);
          new Notification("Trackfi", { body: "Notifications enabled!" });
          
        }
      } else if (permission === "denied") {
        alert("Notifications blocked. Enable them in your browser settings.");
      }
    } finally {
      setLoading(false);
    }
  };
  if(dismissed) return null
  return (
    <>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🔔</span>
            <div>
              <p className="text-sm font-medium text-white">
                Enable Notifications
              </p>
              <p className="text-xs text-white/50 mt-1">
                Get notified about price alerts and portfolio updates in
                real-time
              </p>
            </div>
          </div>
          <button
            onClick={requestPermission}
            disabled={loading}
            className="whitespace-nowrap px-5 py-2 rounded-lg bg-primary text-black text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity shrink-0 ml-4 cursor-pointer disabled:opacity-50"
          >
            {loading ? "Enabling..." : "Enable"}
          </button>
        </div>
      
    </>
  );
}

export default PushNotification;
