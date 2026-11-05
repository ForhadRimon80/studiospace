"use client";

import { useEffect } from "react";

const StudioViewTracker = ({ studioId }: { studioId: string }) => {
  useEffect(() => {
    const trackView = async () => {
      try {
        await fetch(`http://localhost:5000/studios/${studioId}/views`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        console.error("Failed to track studio view:", error);
      }
    };

    void trackView();
  }, [studioId]);

  return null;
};

export default StudioViewTracker;
