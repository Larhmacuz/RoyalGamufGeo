import ApplicationForm from '../ApplicationForm'

export default function ApplicationFormExample() {
  return (
    <div className="p-8 max-w-2xl">
      <ApplicationForm 
        selectedPosition="Senior Geologist"
        onClose={() => console.log('Form closed')}
      />
    </div>
  )
}
