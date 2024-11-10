import useSocket from "@/hooks/connectSocket";
import { setRoomId, setRoomPassword, setRoomStatus } from "@/Redux/features/roomSlice";
import { RootState } from "@/Redux/store/store";
import { Room, RoomStatus } from "@/types/types";
import CTAButton from "@/utils/CTAbutton/CTAbutton";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useRoomID from "@/hooks/getRoomId";
import { setMaxGameParticipants } from "@/Redux/features/sharedGameDataSlice";
const HostingForm: React.FC = () => {
  const dispatch = useDispatch();
  const { createRoomId } = useRoomID();
  const { hostRoom } = useSocket();
  const { roomId } = useSelector((state: RootState) => state.room);
  const { maxGameParticipants } = useSelector((state:RootState) => state.sharedGameData)
  const { user } = useSelector((state: RootState) => state.user);
  const validationSchema = Yup.object({
    roomPassword: Yup.string().required("Room password is required"),
    roomId: Yup.string().when("$isJoining", {
      is: true,
      then: (schema) => schema.required("Room ID is required"),
    }),
    numOfPlayers: Yup.number()
      .min(2, "Minimum of 2 players required")
      .max(3, "Maximum of 3 players allowed")
      .required("Number of players is required"),
  });
  useEffect(() => {
    if (!roomId) {
      dispatch(setRoomId(createRoomId()));
    }
  }, [roomId, createRoomId,dispatch]);
  return (
    <Formik
      initialValues={{ roomPassword: "", numOfPlayers: "" }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        if (user) {
          const room: Room = { roomId, roomPassword: values.roomPassword };
          console.log("The hosting room is: ", room);
          dispatch(setRoomStatus(RoomStatus.HOSTING));
          dispatch(setMaxGameParticipants(parseInt(values.numOfPlayers,10)));
          dispatch(setRoomPassword(values.roomPassword));
          console.log("The maxGameParticipants are:", maxGameParticipants);
          hostRoom(room, user, parseInt(values.numOfPlayers,10));
        } else {
          console.error("User is not logged in");
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col gap-3">
          <input
            type="text"
            value={roomId}
            readOnly
            className="text-center text-gray-800 bg-white/60 py-2 px-4 rounded-md border border-gray-300 focus:outline-none"
          />
          <Field
            type="password"
            name="roomPassword"
            placeholder="Room Password"
            className="text-center text-gray-800 bg-white/60 py-2 px-4 rounded-md border border-gray-300 focus:outline-none"
          />
          <ErrorMessage
            name="roomPassword"
            component="div"
            className="text-red-600"
          />
          <Field
            type="number"
            name="numOfPlayers"
            placeholder="Number of Players (2-3)"
            min="2"
            max="3"
            className="text-center text-gray-800 bg-white/60 py-2 px-4 rounded-md border border-gray-300 focus:outline-none"
          />
          <ErrorMessage
            name="numOfPlayers"
            component="div"
            className="text-red-600"
          />
          <CTAButton
            type="submit"
            disabled={isSubmitting}
            label="Host Game"
            colour="#7e22ce"
            onClick={() => {}}
          />
        </Form>
      )}
    </Formik>
  );
};
export default HostingForm;