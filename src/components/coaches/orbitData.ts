import {
  Award,
  Zap,
  Waves,
  BarChart2,
  Trophy,
  Clock,
  Activity,
  TrendingUp,
  Music2,
  Leaf,
  GraduationCap,
  Utensils,
  Flag,
  Bike,
  MapPin,
  Heart,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface OrbitItem {
  id: string;
  label: string;
  icon: LucideIcon;
  title: string;
  description: string;
  imageSrc?: string;
}

export const orbitData: Record<"pete" | "kendra", OrbitItem[]> = {
  pete: [
    {
      id: "usat",
      label: "USAT Coach",
      icon: Award,
      title: "USA Triathlon Certified",
      description: "Recognized by the US Olympic National Governing Body",
      imageSrc: "/coaches/pete/usat.jpg",
    },
    {
      id: "ironman-coach",
      label: "Ironman Coach",
      icon: Zap,
      title: "Ironman Certified Coach",
      description: "WTC-certified for long-course triathlon coaching",
      imageSrc: "/coaches/pete/ironman-coach.jpg",
    },
    {
      id: "masters-swim",
      label: "Masters Swim",
      icon: Waves,
      title: "U.S. Masters Swimming",
      description: "USMS certified to coach swimmers of all levels",
      imageSrc: "/coaches/pete/masters-swim.jpg",
    },
    {
      id: "trainingpeaks",
      label: "TrainingPeaks",
      icon: BarChart2,
      title: "TrainingPeaks Certified",
      description: "Expert in data-driven training platform analysis",
    },
    {
      id: "ironman-finisher",
      label: "9× Ironman",
      icon: Trophy,
      title: "9× Ironman Finisher",
      description: "Nine full-distance Ironman race completions",
      imageSrc: "/coaches/pete/ironman-finisher.jpg",
    },
    {
      id: "experience",
      label: "25+ Years",
      icon: Clock,
      title: "25+ Years Racing",
      description: "Over two decades of endurance sport experience",
      imageSrc: "/coaches/pete/experience.jpg",
    },
    {
      id: "long-distance",
      label: "Long Distance",
      icon: Activity,
      title: "Long & Ultra-Distance",
      description: "Specializes in Ironman and ultra-endurance events",
    },
    {
      id: "data-driven",
      label: "Data Driven",
      icon: TrendingUp,
      title: "Data-Driven Coaching",
      description: "Evidence-based plans built from athlete feedback",
    },
    {
      id: "life",
      label: "Music & Travel",
      icon: Music2,
      title: "Music & Travel",
      description: "Creates music and travels with his wife on rest days",
    },
  ],

  kendra: [
    {
      id: "usat",
      label: "USAT Coach",
      icon: Award,
      title: "USA Triathlon Certified",
      description: "USAT-certified coach and international competitor",
    },
    {
      id: "rd",
      label: "Registered RD",
      icon: Leaf,
      title: "Registered Dietitian",
      description: "Licensed RD with BS in Nutrition & Dietetics",
    },
    {
      id: "ms",
      label: "MS Exercise Sci.",
      icon: GraduationCap,
      title: "MS Exercise Science",
      description: "Master's degree in Applied Exercise Science",
    },
    {
      id: "cissn",
      label: "CISSN",
      icon: Utensils,
      title: "CISSN Certified Sports Nutritionist",
      description: "Certified by the Intl. Society of Sports Nutrition",
    },
    {
      id: "team-usa",
      label: "Team USA",
      icon: Flag,
      title: "Team USA Athlete",
      description: "Races for Team USA in international triathlon",
    },
    {
      id: "short-course",
      label: "Short Course",
      icon: Zap,
      title: "Short-Course Specialist",
      description: "True passion for sprint and Olympic-distance racing",
    },
    {
      id: "cycling",
      label: "Cycling",
      icon: Bike,
      title: "Cycling Enthusiast",
      description: "Favorite discipline — see so much, go so far on a bike",
    },
    {
      id: "tour-de-cleveland",
      label: "100-Mile Ride",
      icon: MapPin,
      title: "Tour de Cleveland",
      description: "Completed the epic 100-mile Tour de Cleveland ride",
    },
    {
      id: "life",
      label: "Life Outside",
      icon: Heart,
      title: "Life Beyond Triathlon",
      description: "Soccer, sewing, crafting & baking in her spare time",
    },
  ],
};
