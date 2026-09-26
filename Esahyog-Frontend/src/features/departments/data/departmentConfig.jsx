import waterDepart from "../../../assets/img/waterDepart.png";
import fireDepart from "../../../assets/img/fireDepart.png";
import policeDepart from "../../../assets/img/policeDepart.png";
import sewerage from "../../../assets/img/sewarage.png";
import electricityDepart from "../../../assets/img/electricityDepart.png";
import trafficDepart01 from "../../../assets/img/trafficDepart01.png";
import pwd from "../../../assets/img/pwd.png";
import garbagedept from "../../../assets/img/garbagedept.png";

import WaterHero from "../components/water/WaterHero.jsx";
import WaterCitizenColumn from "../components/water/WaterCitizenColumn.jsx";
import WaterOperatorColumn from "../components/water/WaterOperatorColumn.jsx";

import TrafficHero from "../components/traffic/TrafficHero.jsx";
import TrafficCitizenColumn from "../components/traffic/TrafficCitizenColumn.jsx";
import TrafficOperatorColumn from "../components/traffic/TrafficOperatorColumn.jsx";

import SewerHero from "../components/sewer/SewerHero.jsx";
import SewerCitizenColumn from "../components/sewer/SewerCitizenColumn.jsx";
import SewerOperatorColumn from "../components/sewer/SewerOperatorColumn.jsx";

import PwdHero from "../components/pwd/PwdHero.jsx";
import PwdCitizenColumn from "../components/pwd/PwdCitizenColumn.jsx";
import PwdOperatorColumn from "../components/pwd/PwdOperatorColumn.jsx";

import GarbageHero from "../components/garbage/GarbageHero.jsx";
import GarbageCitizenColumn from "../components/garbage/GarbageCitizenColumn.jsx";
import GarbageOperatorColumn from "../components/garbage/GarbageOperatorColumn.jsx";

import FireHero from "../components/fire/FireHero.jsx";
import FireCitizenColumn from "../components/fire/FireCitizenColumn.jsx";
import FireOperatorColumn from "../components/fire/FireOperatorColumn.jsx";

import ElectricityHero from "../components/electricity/ElectricityHero.jsx";
import ElectricityCitizenColumn from "../components/electricity/ElectricityCitizenColumn.jsx";
import ElectricityOperatorColumn from "../components/electricity/ElectricityOperatorColumn.jsx";

import PoliceHero from "../components/police/PoliceHero.jsx";
import PoliceCitizenColumn from "../components/police/PoliceCitizenColumn.jsx";
import PoliceOperatorColumn from "../components/police/PoliceOperatorColumn.jsx";

export const departmentConfig = {
  water: {
    key: "water",
    departmentName: "Water Supply Department",
    officeTime: "9:00 AM To 5:00 PM",
    departmentLogo: waterDepart,

    title: "Planned Water Shutoff",
    statusTag1: "Scheduled Maintenance",
    statusTag2: "Sector 3-A",
    duration: "8 hours",
    location: "Central City, All Sectors",

    dashboardName: "Water Supply Department",
    Hero: WaterHero,
    CitizenColumn: WaterCitizenColumn,
    OperatorColumn: WaterOperatorColumn,
  },

  traffic: {
    key: "traffic",
    departmentName: "Traffic Police",
    officeTime: "24 X 7",
    departmentLogo: trafficDepart01,

    title: "Heavy Congestion Warning",
    statusTag1: "Traffic Alert",
    statusTag2: "High Volume",
    details: "Alternative routes suggested",
    location: "East-West Expressway",

    dashboardName: "Traffic Police",
    Hero: TrafficHero,
    CitizenColumn: TrafficCitizenColumn,
    OperatorColumn: TrafficOperatorColumn,
  },

  sewer: {
    key: "sewer",
    departmentName: "Sewerage & Sanitation",
    officeTime: "9:00 AM To 5:00 PM",
    departmentLogo: sewerage,

    title: "Main Line Repair Underway",
    statusTag1: "Ongoing Work",
    statusTag2: "Mid Level",
    details: "Expected completion in 2 days",
    location: "Industrial Zone, Sector 1-C",

    dashboardName: "Sewerage & Sanitation",
    Hero: SewerHero,
    CitizenColumn: SewerCitizenColumn,
    OperatorColumn: SewerOperatorColumn,
  },

  pwd: {
    key: "pwd",
    departmentName: "Public Road Department",
    officeTime: "9:00 AM To 5:00 PM",
    departmentLogo: pwd,

    title: "New Bridge Construction Tender",
    statusTag1: "Project Announcement",
    statusTag2: "Senior Level",
    details: "Bid documents now available",
    location: "River Crossing Point",

    dashboardName: "Public Works Department",
    Hero: PwdHero,
    CitizenColumn: PwdCitizenColumn,
    OperatorColumn: PwdOperatorColumn,
  },

  garbage: {
    key: "garbage",
    departmentName: "Garbage Department",
    officeTime: "9:00 AM To 5:00 PM",
    departmentLogo: garbagedept,

    title: "Waste Collection Schedule Update",
    statusTag1: "Schedule Change",
    statusTag2: "All Zones",
    details: "New timings effective immediately",
    location: "Citywide",

    dashboardName: "Garbage Department",
    Hero: GarbageHero,
    CitizenColumn: GarbageCitizenColumn,
    OperatorColumn: GarbageOperatorColumn,
  },

  fire: {
    key: "fire",
    departmentName: "Fire Department",
    officeTime: "24 X 7",
    departmentLogo: fireDepart,

    title: "Emergency Response: Structure Fire",
    statusTag1: "Active Incident",
    statusTag2: "High Priority",
    details: "4 units dispatched",
    location: "Residential Area, Sector 5-B",

    dashboardName: "Fire Department",
    Hero: FireHero,
    CitizenColumn: FireCitizenColumn,
    OperatorColumn: FireOperatorColumn,
  },

  electricity: {
    key: "electricity",
    departmentName: "Electricity Board (Power)",
    officeTime: "9:00 AM To 5:00 PM",
    departmentLogo: electricityDepart,

    title: "Unscheduled Power Outage",
    statusTag1: "Resolved/Restored",
    statusTag2: "High Priority",
    details: "System back online",
    location: "North Suburb, Phase II",

    dashboardName: "Electricity Board & Power",
    Hero: ElectricityHero,
    CitizenColumn: ElectricityCitizenColumn,
    OperatorColumn: ElectricityOperatorColumn,
  },

  police: {
    key: "police",
    departmentName: "Police Department",
    officeTime: "24 X 7",
    departmentLogo: policeDepart,

    title: "Traffic Accident Cleared",
    statusTag1: "Update/Cleared",
    statusTag2: "Low Priority",
    details: "Road fully open",
    location: "Junction near City Hall",

    dashboardName: "Police Department",
    Hero: PoliceHero,
    CitizenColumn: PoliceCitizenColumn,
    OperatorColumn: PoliceOperatorColumn,
  },
};

/*
 * Used by the citizen dashboard department cards.
 *
 * Keep only card-related data here instead of maintaining
 * another separate department list.
 */
export const departmentList = Object.values(departmentConfig).map(
  ({
    key,
    departmentName,
    officeTime,
    departmentLogo,
    title,
    statusTag1,
    statusTag2,
    duration,
    details,
    location,
  }) => ({
    key,
    departmentName,
    officeTime,
    departmentLogo,
    title,
    statusTag1,
    statusTag2,
    duration,
    details,
    location,
  }),
);
