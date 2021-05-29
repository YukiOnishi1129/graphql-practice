/**
 * IndexPage
 * @returns
 */
import { NextPage } from "next";
import { ChatItem } from "@/components/ChatItem";

interface IndexProps {}

/**
 *
 * @returns
 */
const IndexPage: NextPage<IndexProps> = () => {
  return (
    <div>
      <h1>Chat</h1>
      <ChatItem />
    </div>
  );
};

export default IndexPage;
