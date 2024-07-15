"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SectionBox } from "../layout/SectionBox";
import SubmitButton from "../buttons/SubmitButton";
import { useState } from "react";
import { savePageButtons } from "@/actions/pageActions";
import { ReactSortable } from "react-sortablejs";

import toast from "react-hot-toast";

import {
  faDiscord,
  faFacebook,
  faGithub,
  faInstagram,
  faInstagramSquare,
  faTelegram,
  faTiktok,
  faWhatsapp,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faGripLines,
  faMobile,
  faPlus,
  faSave,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
const AllButtonArray = [
  {
    key: "email",
    label: "e-mail",
    icon: faEnvelope,
    placeholder: "test@example.com",
  },
  {
    key: "mobile",
    label: "mobile",
    icon: faMobile,
    placeholder: "+46 123 123 123",
  },
  {
    key: "instagram",
    label: "instagram",
    icon: faInstagram,
    placeholder: "https://instagram.com/profile/...",
  },
  {
    key: "facebook",
    label: "facebook",
    icon: faFacebook,
    placeholder: "https://facebook.com/profile/...",
  },
  {
    key: "discord",
    label: "discord",
    icon: faDiscord,
    placeholder: "https://discord.com/profile/...",
  },
  {
    key: "tiktok",
    label: "tiktok",
    icon: faTiktok,
    placeholder: "https://tiktok.com/profile/...",
  },
  {
    key: "youtube",
    label: "youtube",
    icon: faYoutube,
    placeholder: "https://youtube.com/profile/...",
  },
  {
    key: "whatsapp",
    label: "whatsapp",
    icon: faWhatsapp,
    placeholder: "whatsapp number.... eg..798***",
  },
  {
    key: "github",
    label: "github",
    icon: faGithub,
    placeholder: " https://github.com/*****",
  },
  {
    key: "telegram",
    label: "telegram",
    icon: faTelegram,
    placeholder: "https://telegram.com/profile/...",
  },
];
export default function PageButtonsForm({ user, page }) {
  const pageSavedButtonsKeys = Object.keys(page.buttons);

  const pageSavedButtonsInfo = pageSavedButtonsKeys.map((k) =>
    AllButtonArray.find((b) => b.key === k)
  );
  const [activeButtons, setActiveButtons] = useState(pageSavedButtonsInfo);
  const availableButtons = AllButtonArray.filter(
    (b1) => !activeButtons.find((b2) => b1.key === b2.key)
  );

  async function saveButtons(formData) {
    await savePageButtons(formData);
    toast.success("Settings saved!");
  }
  const addToProfile = (event, btn) => {
    //     Functional Update: More reliable when the state updates might be batched or if multiple updates are performed in quick succession. It ensures you're working with the latest state.
    // Direct State Access: Might be problematic if the state updates are asynchronous or if you are performing multiple state updates in a row.

    event.preventDefault();
    //This would be useful in a component where activeButtons might be updated frequently or in an asynchronous context.
    setActiveButtons((prevButtons) => {
      return [...prevButtons, btn];
    });

    // This is more straightforward and might be used in simple cases where
    // you are confident there won't be asynchronous issues or multiple rapid state changes.
    // const temp = [...activeButtons, btn];

    // return setActiveButtons(temp);
  };
  const removeButton = (event, btn) => {
    event.preventDefault();
    // const temp = [...availableButtons, btn];
    // setAvailableButtons(temp);
    // const temp1 = activeButtons.filter((activebtn) => activebtn !== btn);
    // setActiveButtons(temp);
    setActiveButtons((prevButtons) => {
      return prevButtons.filter((activebtn) => activebtn !== btn);
    });
  };
  return (
    <SectionBox>
      <form action={saveButtons}>
        <h2 className="text-2xl font-bold mb-4">Buttons</h2>
        <ReactSortable
          list={activeButtons}
          setList={setActiveButtons}
          animation={200}
          easing="cubic-bezier(0.25, 1, 0.5, 1)"
          handle=".handle"
        >
          {activeButtons.map((b) => {
            return (
              <div key={b.key} className="mb-4 md:flex items-center rounded-md sortable-item">
                <div className="w-40 flex h-full text-gray-700 sm:p-1 md:p-2 gap-2 items-center">
                  <FontAwesomeIcon
                    icon={faGripLines}
                    className="cursor-pointer text-gray-400 handle p-1"
                  />
                  <FontAwesomeIcon icon={b.icon} />
                  <span>
                    {b.label.slice(0, 1).toUpperCase() + b.label.slice(1)}:
                  </span>
                </div>
                <div className=" w-full justify-between flex flex-row  ">
                  <input
                    placeholder={b.placeholder}
                    name={b.key}
                    defaultValue={page.buttons[b.key]}
                    type="text"
                    style={{ marginBottom: "0" }}
                    className=" w-full pl-2 text-[#777575] bg-gray-200"
                  />
                  <button
                    onClick={() => removeButton(event, b)}
                    type="button"
                    className="py-2 px-4  bg-gray-400 cursor-pointer "
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            );
          })}
        </ReactSortable>

        <div className="flex flex-wrap gap-2">
          {availableButtons.map((btn, key) => {
            return (
              <div key={key} className="flex flex-wrap  ">
                <button
                  onClick={() => addToProfile(event, btn)}
                  className="flex gap-2 bg-gray-300 items-center m-2 py-1 px-2 rounded-md"
                >
                  <FontAwesomeIcon fontSize={20} icon={btn.icon} />
                  <span className="text-md">
                    {btn.label.slice(0, 1).toUpperCase() + btn.label.slice(1)}
                  </span>
                  <FontAwesomeIcon fontSize={12} icon={faPlus} />
                </button>
              </div>
            );
          })}
        </div>
        <div className="max-w-xs mx-auto mt-8">
          <SubmitButton>
            <FontAwesomeIcon icon={faSave} />
            <span>Save</span>
          </SubmitButton>
        </div>
      </form>
    </SectionBox>
  );
}
