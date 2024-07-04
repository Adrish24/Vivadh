/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  BiDownvote,
  BiUpvote,
  BiSolidDownvote,
  BiSolidUpvote,
} from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setToggleSort, setToggleView } from "../../redux/slices/filterSlice";
import { addProperties } from "../../redux/data/singlePostSlice";
import { usePageNaigation } from "../../hooks";
import axios from "axios";

const Vote = ({ single, isSingle, array, setArray, handlePropagation }) => {
  const [voteType, setVoteType] = useState("");
  const [prevVote, setPrevVote] = useState("");

  const { currentUser } = useSelector((state) => state.Auth);

  const dispatch = useDispatch();

  const { navigateToPage } = usePageNaigation();

  const handleVote = async (string) => {
    // console.log(currentUser?._id);
    try {
      await axios.post(
        "http://localhost:5000/vote",
        {
          type: string,
          postId: single._id,
          currentUserId: currentUser?._id,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpVote = (string) => {
    if (!currentUser) {
      navigateToPage(`/auth`, "");
      return;
    }
    // disable filter menu
    dispatch(setToggleView(false));
    dispatch(setToggleSort(false));

    setVoteType(string);

    if (isSingle) {
      // For single post
      dispatch(
        addProperties({
          upVote: !single.upVote,
          downVote: false,
        })
      );

      if (single.downVote) {
        setPrevVote("downVote");
      } else {
        setPrevVote("");
      }
    } else {
      // For multiple posts
      const tempArray = array.map((p) => {
        return {
          ...p,
          upVote: p._id === single._id ? !p.upVote : p.upVote,
          downVote: p._id === single._id ? false : p.downVote,
        };
      });

      if (single.downVote) {
        setPrevVote("downVote");
      } else {
        setPrevVote("");
      }

      dispatch(setArray(tempArray));
    }

    handleVote(string);
  };

  const handleDownVote = (string) => {
    console.log(single._id);
    if (!currentUser) {
      navigateToPage(`/auth`, "");
      return;
    }
    // disable filter menu
    dispatch(setToggleView(false));
    dispatch(setToggleSort(false));

    setVoteType(string);

    if (isSingle) {
      // For single post
      dispatch(
        addProperties({
          upVote: false,
          downVote: !single.downVote,
        })
      );

      if (single.upVote) {
        setPrevVote("upVote");
      } else {
        setPrevVote("");
      }
    } else {
      // For multiple posts
      const tempArray = array.map((p) => {
        return {
          ...p,
          upVote: p._id === single._id ? false : p.upVote,
          downVote: p._id === single._id ? !p.downVote : p.downVote,
        };
      });

      if (single.upVote) {
        setPrevVote("upVote");
      } else {
        setPrevVote("");
      }

      dispatch(setArray(tempArray));
    }

    handleVote(string);
  };

  const handleVoteCalculation = async (
    single,
    array,
    setArray,
    dispatch,
    up,
    down,
    type,
    prev
  ) => {
    // console.log(up, down, type, prev);

    if (!currentUser) return;

    if (type === "upVote") {
      if (isSingle) {
        // For single post
        dispatch(
          addProperties({
            vote_count: up
              ? prev === "downVote"
                ? single.vote_count + 2
                : single.vote_count + 1
              : single.vote_count - 1,
          })
        );
      } else {
        // For multiple posts
        const tempArray = array.map((p) => {
          return {
            ...p,
            vote_count:
              p._id === single._id
                ? up
                  ? prev === "downVote"
                    ? p.vote_count + 2
                    : p.vote_count + 1
                  : p.vote_count - 1
                : p.vote_count,
          };
        });

        dispatch(setArray(tempArray));
      }
    }

    if (type === "downVote") {
      if (isSingle) {
        dispatch(
          addProperties({
            vote_count: down
              ? prev === "upVote"
                ? single.vote_count - 2
                : single.vote_count - 1
              : single.vote_count + 1,
          })
        );
      } else {
        const tempArray = array.map((p) => {
          return {
            ...p,
            vote_count:
              p._id === single._id
                ? down
                  ? prev === "upVote"
                    ? p.vote_count - 2
                    : p.vote_count - 1
                  : p.vote_count + 1
                : p.vote_count,
          };
        });

        dispatch(setArray(tempArray));
      }
    }
  };

  useEffect(() => {
    handleVoteCalculation(
      single,
      array,
      setArray,
      dispatch,
      single?.upVote,
      single?.downVote,
      voteType,
      prevVote
    );
  }, [single?.downVote, single?.upVote]);


  return (
    <div
      onClick={(e) => handlePropagation(e)}
      className={`
        flex items-center 
        rounded-full
        mr-2 
        ${
          single?.upVote
            ? "bg-green-600"
            : single?.downVote
            ? "bg-red-600"
            : "bg-neutral-800"
        }
        `}
    >
      <button
        onClick={() => handleUpVote("upVote")}
        className={`
           ${
             single?.upVote
               ? "hover:bg-green-800"
               : single?.downVote
               ? "hover:bg-red-800 hover:text-white"
               : "hover:text-green-400 hover:bg-neutral-700"
           }
          rounded-full p-1.5
          `}
      >
        {single?.upVote ? <BiSolidUpvote size={20} /> : <BiUpvote size={20} />}
      </button>
      <span className="text-xs">{single?.vote_count}</span>
      <button
        onClick={() => handleDownVote("downVote")}
        className={`
          ${
            single?.downVote
              ? "hover:bg-red-800"
              : single?.upVote
              ? "hover:bg-green-800 hover:text-white"
              : "hover:text-red-500 hover:bg-neutral-700"
          }
     
          rounded-full p-1.5
          `}
      >
        {single?.downVote ? (
          <BiSolidDownvote size={20} />
        ) : (
          <BiDownvote size={20} />
        )}
      </button>
    </div>
  );
};

export default Vote;
