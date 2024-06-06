"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SectionBox } from "../layout/SectionBox";
import SubmitButton from "../buttons/SubmitButton";
import { useState } from "react";
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

export default function PageButtonsForm({ user, page }) {
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
    { key: "facebook", label: "facebook", icon: faFacebook,
      placeholder: "https://facebook.com/profile/...",

     },
    { key: "discord", label: "discord", icon: faDiscord,
      placeholder: "https://discord.com/profile/...",

     },
    { key: "tiktok", label: "tiktok", icon: faTiktok,
      placeholder: "https://tiktok.com/profile/...",

     },
    { key: "youtube", label: "youtube", icon: faYoutube,
      placeholder: "https://youtube.com/profile/...",

     },
    { key: "whatsapp", label: "whatsapp", icon: faWhatsapp ,
      placeholder: "whatsapp number.... eg..798***",

    },
    { key: "github", label: "github", icon: faGithub,
      placeholder: " https://github.com/*****",

     },
    { key: "telegram", label: "telegram", icon: faTelegram ,
      placeholder: "https://telegram.com/profile/...",
      
    },
  ];
  const pageSavedButtonsKeys = [{ key: "facebook", label: "facebook", icon: faFacebook },
    { key: "discord", label: "discord", icon: faDiscord },
    { key: "tiktok", label: "tiktok", icon: faTiktok },
    ];
    const savedButtonKeysSet = new Set(pageSavedButtonsKeys.map(btn => btn.key));

    const pageSavedButtonsInfo =AllButtonArray.filter(btn => savedButtonKeysSet.has(btn.key));
  const [activeButtons, setActiveButtons] = useState(pageSavedButtonsInfo);
  const addToProfile = (event,btn) => {
    event.preventDefault()
    const temp = [...activeButtons, btn];

    return setActiveButtons(temp);
  };
  const avalablebtns=AllButtonArray.filter(btn => !savedButtonKeysSet.has(btn.key));
  const [availableButtons,setAvailableButtons]=useState(avalablebtns);
  const removeButton=(event,btn)=>
  {
    event.preventDefault()
    const temp = [...availableButtons, btn];
    setAvailableButtons(temp);
    const temp1=activeButtons.filter(activebtn => activebtn!==btn );
    setActiveButtons(temp1);
  }
  return (
    <SectionBox>
      <form >
        {activeButtons.map((activebtn, key) => {
          return (
            <div key={key} className="w-full">
              <input
                type="text"
                placeholder={activebtn?.placeholder}
                label="hello"
                className="w-96 bg-gray-200 items-center m-2 p-3 text-xl rounded-md"
              />
              <button
                type="button"
                onClick={()=> removeButton(event,activebtn)}
                className="p-3 bg-gray-300 cursor-pointer rounded-md"
              >
                <FontAwesomeIcon fontSize={20} icon={faTrash} />
              </button>
            </div>
          );
        })}

        <div className="flex flex-wrap gap-2">
          {availableButtons.map((btn, key) => {
            return (
              <div key={key} className="flex flex-wrap  ">
                <button
                  onClick={() => addToProfile(event,btn)}
                  className="flex gap-2 bg-gray-300 items-center m-2 p-2 rounded-md"
                >
                  <FontAwesomeIcon fontSize={20} icon={btn.icon} />
                  <span className="text-xl">
                    {btn.label.slice(0, 1).toUpperCase() + btn.label.slice(1)}
                  </span>
                  <FontAwesomeIcon fontSize={20} icon={faPlus} />
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
