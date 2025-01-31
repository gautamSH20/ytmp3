import { MailIcon } from "../assets/Place";

export const Footer = () => {
  return (
    <div className="w-full dark:text-gray-400 text-white dark:bg-[#1e2939] bg-purple-800 fixed bottom-0 left-0 right-0 md:static md:h-[12vh] md:w-screen text-center p-4">
      <div className="flex justify-center items-center gap-2">
        Contact Me on my email: <MailIcon />
      </div>
      <div>Copyright © 2025 Gautam Sharma. </div>
    </div>
  );
};
