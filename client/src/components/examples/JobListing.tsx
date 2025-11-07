import JobListing from '../JobListing'

export default function JobListingExample() {
  return (
    <div className="p-8 max-w-2xl">
      <JobListing 
        title="Senior Geologist"
        location="Nigeria"
        type="Full-time"
        department="Geological Services"
        description="We are seeking an experienced geologist to join our field investigation team."
        onApply={() => console.log('Apply clicked')}
      />
    </div>
  )
}
