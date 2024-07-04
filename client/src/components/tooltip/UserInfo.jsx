import { AiOutlineLoading } from "react-icons/ai";

import {
  UserInfo_chat,
  UserInfo_follow,
  userInfo__header,
  userInfo_container,
} from "../../styles/useinfo";

const UserInfo = ({ single, delay }) => {
  return (
    <div
      className={`${userInfo_container} top-[28px] ${
        delay ? "hidden" : "group-hover:flex"
      }
      `}
    >
      <div className="flex items-center mb-4">
        <span className={userInfo__header}>
          <img className="w-full object-contain" src={single?.profile_picture} />
        </span>
        <span className="flex-1 text-lg font-semibold">{single?.username}</span>
      </div>
      <div className="text-xs min-w-80 mb-3">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. A tempora
        reiciendis soluta, ratione impedit, quas necessitatibus quod natus
        consequatur unde ipsa velit sequi veniam delectus dolores assumenda
        animi nemo repudiandae quae, consectetur vel perferendis.
      </div>
      <div className="flex justify-start text-sm">
        <button className={UserInfo_follow}>Follow</button>
        <button className={UserInfo_chat}>Chat</button>
      </div>
    </div>
  );
};

export default UserInfo;
