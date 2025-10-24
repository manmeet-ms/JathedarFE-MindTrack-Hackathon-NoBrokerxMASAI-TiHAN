import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { stopAlarm } from "../utils/punishment.utils.js";
import { acknowledgePunishment } from "../services/punishment.service.js";

const PunishmentModal = () => {
  const [violation, setViolation] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      setViolation(e.detail);
    };
    window.addEventListener("PUNISHMENT_TRIGGER", handler);

    return () => window.removeEventListener("PUNISHMENT_TRIGGER", handler);
  }, []);

  if (!violation) return null;

  const handleAcknowledge = async () => {
    stopAlarm();
    await acknowledgePunishment(violation._id);
    setViolation(null);
  };

  return (
    <div className="bg-opacity-90 fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
      <h1 className="mb-6 text-4xl font-bold text-red-500">
        PUNISHMENT ACTIVE
      </h1>
      <p className="mb-4 text-white">{violation.type}</p>
      <Button onClick={handleAcknowledge} className="bg-red-600">
        Acknowledge & Stop
      </Button>
    </div>
  );
};

export default PunishmentModal;
