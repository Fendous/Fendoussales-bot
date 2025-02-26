import Image from "next/image";
import { FC } from "react";

const ChatHeader: FC = () => {
  return (
    <div className="w-full flex gap-3 justify-start items-center text-zinc-200">
      <div className="rounded-lg">
        <Image
          alt="img"
          width={60}
          height={60}
          src="/bot.png"
          className="rounded-full"
        />
      </div>
      <div className="flex flex-col items-start text-sm">
        <p className="text-xs">Chat with</p>
        <div className="flex gap-1.5 items-center">
          <p className="w-2 h-2 rounded-full bg-green-500" />
          <p className="font-medium">Fendous support</p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
