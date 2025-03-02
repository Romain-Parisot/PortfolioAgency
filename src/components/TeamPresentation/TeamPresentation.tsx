"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import "./TeamPresentation.css";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import translations from "../../../public/translation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface ProfilePicture {
  id: number;
  url: string;
}

interface TeamMember {
  id: number;
  FullName: string;
  LinkedinUrl: string;
  ProfilePicture?: ProfilePicture;
}

const fetchMembers = async (): Promise<TeamMember[]> => {
  try {
    const response = await fetch(`${BASE_URL}/api/team-members?populate=*`);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const result = await response.json();
    console.log("Fetched Team Members:", result);

    return result.data || [];
  } catch (error) {
    console.error("Error fetching team members:", error);
    return [];
  }
};

const TeamPresentation: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const { selectedLanguage } = useLanguage();

  useEffect(() => {
    fetchMembers().then(setTeamMembers);
  }, []);

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, {
    margin: "-20% 0px -20% 0px",
    once: true,
  });

  return (
    <motion.div
      ref={containerRef}
      className="teamPresentation"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      {teamMembers.map((member, index) => (
        <motion.div
          key={member.id}
          className="teamPresentationMember"
          onClick={() =>
            window.open(member.LinkedinUrl, "_blank", "noopener,noreferrer")
          }
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
          style={{
            cursor: "pointer",
            pointerEvents: "auto",
          }}
        >
          <Image
            className="teamPresentationImage"
            src={member.ProfilePicture?.url || "none"}
            alt={member.FullName || "Team Member"}
            width={150}
            height={150}
          />
          <h3>{member.FullName}</h3>
          <p>{translations[selectedLanguage].team.jobTitle}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default TeamPresentation;
