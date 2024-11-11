import useSocket from "@/hooks/connectSocket";
import { RootState } from "@/Redux/store/store";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CTAButton from "@/utils/CTAbutton/CTAbutton";
import { setRoomAction } from "@/Redux/features/multiPlayerUserSlice";
import { Room, RoomAction } from "@/types/types";
import { setRoom, setRoomId, setRoomPassword } from "@/Redux/features/multiPlayerDataSlice";

const JoiningForm: React.FC = () => {
  const dispatch = useDispatch();
  const { joinRoom } = useSocket();
  const { multiPlayerUser: user } = useSelector((state: RootState) => state);
  const validationSchema = Yup.object({
    roomPassword: Yup.string().required("Room password is required"),
    roomId: Yup.string().required("Room ID is required"),
  });

  return (
    <Formik
      initialValues={{ roomId: "", roomPassword: "" }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        if (user) {
          const room: Room = {
            roomId: values.roomId,
            roomPassword: values.roomPassword,
          };
          console.log("Joining Room:", room);
          dispatch(setRoom(room))
          joinRoom({room, user});
          dispatch(setRoomAction(RoomAction.JOINING));
          dispatch(setRoomId(values.roomId));
          dispatch(setRoomPassword(values.roomPassword));
        } else {
          console.error("User is not logged in");
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col gap-3">
          <Field
            type="text"
            name="roomId"
            placeholder="Room ID"
            className="text-center text-gray-800 bg-white/60 py-2 px-4 rounded-md border border-gray-300 focus:outline-none"
          />
          <ErrorMessage
            name="roomId"
            component="div"
            className="text-red-600"
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

          <CTAButton
            type="submit"
            disabled={isSubmitting}
            label="Join Room"
            colour="#16a34a"
            onClick={() => {}}
          />
        </Form>
      )}
    </Formik>
  );
};

export default JoiningForm;
