import ServiceCard from '../ServiceCard'
import { Compass } from 'lucide-react'

export default function ServiceCardExample() {
  return (
    <div className="p-8 max-w-sm">
      <ServiceCard 
        icon={Compass}
        title="Field Investigation"
        description="Comprehensive on-site geological surveys and detailed terrain analysis for accurate project planning."
        slug="field-investigation"
      />
    </div>
  )
}
