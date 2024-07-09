import {
  Card
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const Event = ({ event }) => {

  return (
    <Card className="p-4 mb-2">
      <div className="flex items-center">
        <Badge className="border-blue-400 bg-white text-blue-500 rounded-none mr-2">eventName</Badge>
        <Badge className="border-blue-400 bg-white text-blue-500 rounded-none mr-2">{event.eventName}</Badge>
        {
          event.oldValue && <p className="ml-2">Old Value : <span >{event.oldValue}</span></p>
        }
        <span>{event.newValue}</span>
      </div>
    </Card >
  )
}

export default Event