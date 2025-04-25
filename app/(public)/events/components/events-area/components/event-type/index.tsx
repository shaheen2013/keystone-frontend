import { Checkbox } from "@/components/shadcn/checkbox";
import { Label } from "@/components/shadcn/label";
import { useGetEventTypesQuery } from "@/features/public/eventSlice";

const EventTypes = ({selectedEventTypes, setSelectedEventTypes}:{selectedEventTypes: string[], setSelectedEventTypes: React.Dispatch<React.SetStateAction<string[]>>}) => {

  // event Types 

  const { data: eventTypesResponse, isLoading: isEventTypesLoading, isFetching: isEventTypesFetching } : any = useGetEventTypesQuery({});
  const eventTypes = eventTypesResponse?.data?.event_types || [];
  const eventTypesLoading = isEventTypesLoading || isEventTypesFetching

    return  <div className="m-6 bg-white rounded-xl">
    <div className="flex flex-col">
      <h3 className="text-gray-9 text-lg font-semibold px-5 py-3">
        Event Type
      </h3>
      <hr className="border-gray-2" />
      {eventTypes?.map((event:any, index: number) => (
        <div
          key={index}
          className="flex items-center space-x-2 px-5 py-3"
        >
          <Checkbox
            id={event.name}
            checked={selectedEventTypes?.includes(event.id)}
            onCheckedChange={() =>
              setSelectedEventTypes((prev) => {
                if (prev.includes(event.id)) {
                  return prev.filter((e) => e !== event.id);
                } else {
                  return [...prev, event.id];
                }
              })
            }
            variant="secondary"
          />
          <Label
            htmlFor={event.name}
            className="text-lg text-gray-500"
          >
            {event.name}
          </Label>
        </div>
      ))}
    </div>
  </div>
};

export default EventTypes