import React, { useEffect, useState } from "react";

const Stars = () => {
  const [stars, setStars] = useState([]);
  const [shootingStars, setShootingStars] = useState([]);

  // ⭐ generate stable stars (no jumping)
  useEffect(() => {
    const generatedStars = Array.from({ length: 120 }).map(() => ({
      top: Math.random() * 100 + "%",
      left: Math.random() * 100 + "%",
      delay: Math.random() * 3 + "s",
    }));

    setStars(generatedStars);
  }, []);

  // ☄️ shooting stars
  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();

      setShootingStars((prev) => [
        ...prev,
        {
          id,
          top: Math.random() * 50 + "%",
          left: Math.random() * 100 + "%",
        },
      ]);

      setTimeout(() => {
        setShootingStars((prev) =>
          prev.filter((s) => s.id !== id)
        );
      }, 1000);
    }, 5000); // balanced timing

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="background-layer">

      {/* 🌌 NEBULA */}
      <div className="nebula"></div>

      {/* ⭐ STARS + ☄️ SHOOTING STARS */}
      <div className="stars-container">

        {/* ⭐ static stars */}
        {stars.map((s, i) => (
          <div
            key={i}
            className="star"
            style={{
              top: s.top,
              left: s.left,
              animationDelay: s.delay,
            }}
          />
        ))}

        {/* ☄️ shooting stars */}
        {shootingStars.map((s) => (
          <div
            key={s.id}
            className="shooting-star"
            style={{
              top: s.top,
              left: s.left,
            }}
          />
        ))}

      </div>
    </div>
  );
};

export default Stars;