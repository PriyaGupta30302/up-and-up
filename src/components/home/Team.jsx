import React, { useRef, useState, useEffect } from "react";

const teams = [
  { id: 1, name: "The Up&Up Group" },
  { id: 2, name: "M+C Saatchi Abel" },
  { id: 3, name: "Razor" },
  { id: 4, name: "Dalmatian" },
  { id: 5, name: "Levergy" },
  { id: 6, name: "Black & White" },
  { id: 7, name: "2Stories" },
  { id: 8, name: "Africa Affiliate" },
  { id: 9, name: "Eighty20 Partnership" },
  { id: 10, name: "Neon" }
];

export default function TeamSection() {
  const rowRefs = useRef([]);
  const textRefs = useRef([]);
  const sectionRef = useRef(null);
  const [active, setActive] = useState(-1);
  const [showBorder, setShowBorder] = useState(true);

  useEffect(() => {
    const updateActive = () => {
      const borderHeight = 120; // must match your border's h-[120px]
      const borderTop = (window.innerHeight / 2) - (borderHeight / 2);
      const borderBottom = (window.innerHeight / 2) + (borderHeight / 2);
      const borderCenter = window.innerHeight / 2;
      let current = -1;

      textRefs.current.forEach((ref, i) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          if (
            (borderTop >= rect.top && borderTop <= rect.bottom) ||
            (borderCenter >= rect.top && borderCenter <= rect.bottom) ||
            (borderBottom >= rect.top && borderBottom <= rect.bottom)
          ) {
            current = i;
          }
        }
      });
      setActive(current);

      if (sectionRef.current) {
        const srect = sectionRef.current.getBoundingClientRect();
        setShowBorder(borderBottom > srect.top && borderTop < srect.bottom);
      }
    };

    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    updateActive();

    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#23252C] pb-40 pt-20">
      {/* Section Heading, Top Image */}
      <img src="/assets/home/brand/team/container-img.png" alt="" className="w-[400px] max-h-[400px] object-cover mx-auto " />
      <h1 className="text-[36px] text-white text-center my-8 w-[1200px] tracking-wide mx-auto">
        We bring together diverse marketing and communication capabilities from over <span className="text-[#F2623A]">500</span> team members across our Group of companies.
      </h1>
      <div ref={sectionRef} className="flex flex-col items-center gap-12 relative z-20 mt-40">
        {/* Fixed border, only if inside section */}
        {showBorder && (
          <div className="pointer-events-none fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10 w-full px-24" style={{ height: 0 }}>
            <div
              className="w-full h-[120px] rounded-2xl border-t-1 border-b-1 border-transparent"
              style={{
                borderImage: "linear-gradient(90deg, #fd4d50 0%, #fff 50%, #fd4d50 100%) 1"
              }}
            ></div>
          </div>
        )}
        {/* Team rows */}
        {teams.map((team, i) => (
          <div
            key={team.id}
            ref={el => rowRefs.current[i] = el}
            className="w-full mx-auto flex items-center justify-between px-12"
            style={{ minHeight: 60, transition: "all 0.3s cubic-bezier(0.87,0,0.13,1)" }}
          >
            <div className="w-12 h-12" />
            <h1
              ref={el => textRefs.current[i] = el}
              className={`flex-1 text-center text-2xl font-semibold uppercase transition-all ${
                i === active
                  ? "bg-gradient-to-b from-[#efad99] to-[#e56f51] bg-clip-text text-transparent"
                  : "text-gray-200"
              }`}
              style={{
                letterSpacing: "1.2px",
                fontWeight: i === active ? 800 : 400,
                fontSize: i === active ? "64px" : "64px"
              }}
            >
              {team.name}
            </h1>
            <div className="w-32 h-8"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
