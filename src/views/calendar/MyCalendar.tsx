import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { CustomButton } from "../../components/buttons/CustomButton";
import { Box, Paper, Stack } from "@mui/material";
import { InnerModal } from "../../components/modals/InnerModal";
import { useLayoutEffect, useState } from "react";
import { AddEventForm } from "./AddEventForm";
import { RemoveEventForm } from "./RemoveEventForm";

const localizer = momentLocalizer(moment);

export const MyCalendar = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const [modalTitle, setModalTitle] = useState<string>("");

  const [modalBody, setModalBody] = useState<any>(null);

  const [eventList, setEventList] = useState<Array<any>>([
    {
      title: "Complete The Figma Design",
      start: new Date("2023-11-01"),
      end: new Date("2023-11-03"),
    },
    {
      title: "Town Hall meeting",
      start: new Date("2023-12-07"),
      end: new Date("2023-12-08"),
    },
  ]);

  const handleAddEvent = () => {
    setModalTitle("Add Event");
    setModalBody(
      <AddEventForm
        handleModalClose={() => setShowModal(false)}
        setEventList={setEventList}
      />
    );
    setShowModal(true);
  };

  const handleRemoveEvent = () => {
    setModalTitle("Remove Event");
    setModalBody(
      <RemoveEventForm
        eventList={eventList}
        handleModalClose={() => setShowModal(false)}
        setEventList={setEventList}
      />
    );
    setShowModal(true);
  };

  return (
    <div className="my-calendar">
      <InnerModal
        open={showModal}
        setOpen={setShowModal}
        maxWidth={"sm"}
        title={modalTitle}
        body={modalBody}
      />
      <Box component={Paper} p={3}>
        <Stack direction={"row"} gap={2} flexWrap={"wrap"} mb={5}>
          <CustomButton
            text={"+ Add Event"}
            variant="contained"
            onClick={handleAddEvent}
          />
          <CustomButton
            text={"- Remove Event"}
            variant="outlined"
            onClick={handleRemoveEvent}
          />
        </Stack>
        <Calendar
          key={eventList.length}
          localizer={localizer}
          events={eventList}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </Box>
    </div>
  );
};
