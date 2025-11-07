import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JobListing from "@/components/JobListing";
import ApplicationForm from "@/components/ApplicationForm";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const openPositions = [
  {
    title: "Senior Geologist",
    location: "Nigeria",
    type: "Full-time",
    department: "Geological Services",
    description: "We are seeking an experienced geologist to join our field investigation team. Lead geological surveys, supervise field operations, and deliver comprehensive geological assessments."
  },
  {
    title: "Field Technician",
    location: "Nigeria",
    type: "Full-time",
    department: "Field Operations",
    description: "Support our geological and engineering field teams with site surveys, sample collection, equipment operation, and data recording for various projects."
  },
  {
    title: "Environmental Consultant",
    location: "Nigeria",
    type: "Full-time",
    department: "Environmental Services",
    description: "Conduct environmental impact assessments, contamination studies, and develop sustainable solutions for diverse projects across Nigeria."
  },
  {
    title: "Civil Engineer",
    location: "Nigeria",
    type: "Full-time",
    department: "Engineering",
    description: "Design and oversee civil engineering projects including infrastructure, site development, and construction works. Ensure projects meet technical specifications and quality standards."
  },
  {
    title: "Structural Engineer",
    location: "Nigeria",
    type: "Full-time",
    department: "Engineering",
    description: "Lead structural design and analysis for building and construction projects. Collaborate with architects and project teams to deliver safe, efficient structural solutions."
  },
  {
    title: "Project Manager",
    location: "Nigeria",
    type: "Full-time",
    department: "Project Management",
    description: "Oversee project execution from planning through completion. Manage budgets, timelines, resources, and client relationships for geological and engineering projects."
  }
];

export default function Careers() {
  const [applicationOpen, setApplicationOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState("");

  const handleApply = (position: string) => {
    setSelectedPosition(position);
    setApplicationOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-primary text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-careers-page-title">
            Join Our Team
          </h1>
          <p className="text-lg text-primary-foreground/90" data-testid="text-careers-page-subtitle">
            Build your career with a leader in geological and engineering services
          </p>
        </div>
      </div>

      <div className="flex-1 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <section className="bg-card rounded-lg p-8 border">
            <h2 className="text-2xl font-bold mb-4">Our Work Culture</h2>
            <p className="text-muted-foreground mb-4" data-testid="text-culture-description">
              At Royal Gamuf Nig LTD, we foster a collaborative environment where innovation meets expertise. Our team members are empowered to take on challenging projects, develop their skills, and make meaningful contributions to Nigeria's infrastructure and resource development.
            </p>
            <p className="text-muted-foreground" data-testid="text-culture-values">
              We value professional growth, safety, integrity, and excellence in everything we do. Whether you're conducting field investigations, designing structures, or managing complex projects, you'll work alongside experienced professionals committed to delivering exceptional results for our clients.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Open Positions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {openPositions.map((job, index) => (
                <JobListing
                  key={index}
                  {...job}
                  onApply={() => handleApply(job.title)}
                />
              ))}
            </div>
          </section>
        </div>
      </div>

      <Dialog open={applicationOpen} onOpenChange={setApplicationOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Apply for Position</DialogTitle>
          </DialogHeader>
          <ApplicationForm
            selectedPosition={selectedPosition}
            onClose={() => setApplicationOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
