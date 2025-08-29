import React from "react";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import OpacityIcon from "@mui/icons-material/Opacity";
import GroupsIcon from "@mui/icons-material/Groups";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import BarChartIcon from "@mui/icons-material/BarChart";

const iconMap = {
  thermostat: ThermostatIcon,
  opacity: OpacityIcon,
  groups: GroupsIcon,
  show_chart: ShowChartIcon,
  notifications_active: NotificationsActiveIcon,
  bar_chart: BarChartIcon,
};

const FeatureCard = ({ icon, iconColor, title, description }) => {
  const IconComponent = iconMap[icon];
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "16px",
        boxShadow: "0 1px 8px rgba(60,60,60,0.03)",
        border: "1px solid #f0f0f0",
        padding: "2rem 1.5rem 1.5rem 1.5rem",
        minWidth: 260,
        flex: "1 1 260px",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        margin: "0.5rem",
      }}
    >
      <span
        style={{
          background: "#f6f7fb",
          borderRadius: "10px",
          padding: "0.5rem",
          fontSize: 32,
          color: iconColor,
          alignSelf: "flex-start",
          display: "flex",
        }}
      >
        {IconComponent && (
          <IconComponent style={{ fontSize: 32, color: iconColor }} />
        )}
      </span>
      <div
        style={{
          fontWeight: 700,
          fontSize: "1.15rem",
          marginBottom: 4,
        }}
      >
        {title}
      </div>
      <div style={{ color: "#555", fontSize: "1rem" }}>{description}</div>
    </div>
  );
};

export default FeatureCard;
