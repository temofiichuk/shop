"use client";
// import styles from "./Message.module.scss";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Alert, Button, Typography } from "@material-tailwind/react";
import { useEffect } from "react";
import { resetMessage } from "@/store/features/message.slice";
import {
	CheckBadgeIcon,
	ExclamationCircleIcon,
	InformationCircleIcon,
	XCircleIcon,
} from "@heroicons/react/24/solid";
import { toRegularCase } from "@/lib/functions";

const messageStyles = {
	SUCCESS: {
		icon: <CheckBadgeIcon width={40} />,
		className: "bg-green-900",
	},
	INFORMATION: {
		icon: <InformationCircleIcon width={40} />,
		className: "bg-gray-900",
	},
	FAILURE: {
		icon: <ExclamationCircleIcon width={50} />,
		className: "bg-red-900",
	},
};

const Message = () => {
	const { value: message, type, reset, timer } = useAppSelector((state) => state.message);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (message === "") return;
		if (reset) {
			const key = setTimeout(() => dispatch(resetMessage()), timer);
			return () => clearTimeout(key);
		}
	}, [message]);

	return (
		<Alert
			icon={messageStyles[type].icon}
			open={message !== ""}
			className={`fixed top-2 right-2 w-max max-w-full z-50 bg-opacity-50 backdrop-blur ${messageStyles[type].className}`}
			animate={{
				mount: { y: 0 },
				unmount: { y: -100 },
			}}>
			<Button
				className="bg-transparent hover:drop-shadow-2xl absolute right-0 top-0"
				onClick={() => dispatch(resetMessage())}>
				<XCircleIcon className="w-4 h-4" />
			</Button>
			<h5>{toRegularCase(type)}</h5>
			<Typography color="white" className="mt-2 font-normal">
				{message}
			</Typography>
		</Alert>
	);
};

Message.displayName = "Message";
export default Message;
