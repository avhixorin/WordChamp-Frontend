import useSocket from "@/hooks/connectSocket";
import { RootState } from "@/Redux/store/store";
import { Room, RoomAction } from "@/types/types";
import CTAButton from "@/utils/CTAbutton/CTAbutton";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useRoomID from "@/hooks/getRoomId";
import {
  setMaxRoomPlayers,
  setRoom,
  setRoomPassword,
} from "@/Redux/features/multiPlayerDataSlice";
import { setRoomAction } from "@/Redux/features/multiPlayerUserSlice";
import toast from "react-hot-toast";
const HostingForm: React.FC = () => {
  const dispatch = useDispatch();
  const { createRoomId } = useRoomID();
  const { hostRoom } = useSocket();
  const { room } = useSelector((state: RootState) => state.multiPlayerData);
  const { maxRoomPlayers } = useSelector(
    (state: RootState) => state.multiPlayerData
  );
  const { multiPlayerUser: user } = useSelector((state: RootState) => state);
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
    if (!room) {
      dispatch(setRoom({ roomId: createRoomId(), roomPassword: "" }));
    }
  }, [room, createRoomId, dispatch]);
  return (
    <Formik
      initialValues={{ roomPassword: "", numOfPlayers: "" }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        if (user) {
          dispatch(setRoomAction(RoomAction.HOSTING));
          dispatch(setMaxRoomPlayers(parseInt(values.numOfPlayers, 10)));
          dispatch(setRoomPassword(values.roomPassword));
          if (room) {
            const newRoom: Room = {
              roomId: room.roomId,
              roomPassword: values.roomPassword,
            };
            dispatch(setRoom(newRoom));
            hostRoom({
              room: newRoom,
              user,
              maxRoomPlayers: parseInt(values.numOfPlayers, 10),
            });
          }
        } else {
          toast.error("User is not logged in");
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col gap-3">
          <input
            type="text"
            value={room?.roomId || ""}
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
