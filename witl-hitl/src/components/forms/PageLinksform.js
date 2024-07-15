"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SectionBox } from "../layout/SectionBox";
import SubmitButton from "../buttons/SubmitButton";
import { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { savePageLinks } from "@/actions/pageActions";
import toast from "react-hot-toast";
import Image from "next/image";
import { upload } from "../../libs/upload";
import {
  faEnvelope,
  faGripLines,
  faMobile,
  faPlus,
  faLink,
  faSave,
  faTrash,
  faCloudArrowUp,
} from "@fortawesome/free-solid-svg-icons";
export default function PageLinksForm({ user, page }) {
  const [links, setLinks] = useState(page.links || []);
  async function saveButtons() {
    await savePageLinks(links);
    toast.success("Settings saved!");
  }
  const handleChangeLink = async (keyOfLinkToChange, key, ev) => {
    setLinks((prev) => {
      const newLinks = [...prev];
      newLinks.forEach((link) => {
        if (link.key === keyOfLinkToChange) {
          link[key] = ev.target.value;
        }
      });
      return [...prev];
    });
  };
  function handleUpload(ev, linkKeyForUpload) {
    upload(ev, (uploadedImageUrl) => {
      console.log("uploadedIconUrl :", uploadedImageUrl);
      setLinks((prevLinks) => {
        const newLinks = [...prevLinks];
        newLinks.forEach((link, index) => {
          if (link.key === linkKeyForUpload) {
            link.icon = uploadedImageUrl;
          }
        });
        console.log(newLinks);
        return newLinks;
      });
    });
  }
  async function addNewLink() {
    setLinks((prevLinks) => {
      return [
        ...prevLinks,
        {
          key: Date.now().toString(),
          title: "",
          subtitle: "",
          icon: "",
          url: "",
        },
      ];
    });
  }
  function removeLink(linkKeyToRemove) {
    setLinks((prevLinks) =>
      [...prevLinks].filter((l) => l.key !== linkKeyToRemove)
    );
  }
  return (
    <SectionBox>
      <form action={saveButtons}>
        <h2 className="text-2xl font-bold mb-4">Add Custom Links</h2>
        <button
          onClick={addNewLink}
          type="button"
          className="text-blue-500 text-lg flex gap-2 items-center cursor-pointer"
        >
          <FontAwesomeIcon
            className="bg-blue-500 text-white p-1 rounded-full aspect-square"
            icon={faPlus}
          />
          <span>Add new</span>
        </button>
        <div className="m-2">
          <ReactSortable
            list={links}
            setList={setLinks}
            animation={200}
            easing="cubic-bezier(0.25, 1, 0.5, 1)"
            handle=".handle"
          >
            {links.map((l) => (
              <div
                key={l.key}
                className="flex flex-row w-full items-center border gap-1 my-2 rounded-md"
              >
                <FontAwesomeIcon
                  icon={faGripLines}
                  className="cursor-pointer text-gray-400 handle p-2"
                />

                <div className="flex flex-col justify-center items-center">
                  <div className="text-center">
                    <div className="bg-gray-300  relative aspect-square overflow-hidden  inline-flex justify-center items-center rounded-sm">
                      {l.icon && (
                        <Image
                          className="w-full h-full object-cover"
                          src={l.icon.data}
                          alt={"icon"}
                          width={80}
                          height={80}
                        />
                      )}
                      {!l.icon && <FontAwesomeIcon size="xl" icon={faLink} />}
                    </div>
                  </div>
                  <div className="w-32 border m-2 flex flex-row p-1 gap-1  cursor-pointer justify-center items-center bg-gray-300 rounded-md">
                    <input
                      onChange={(ev) => handleUpload(ev, l.key)}
                      hidden
                      type="file"
                      id={`icon` + l.key}
                    />
                    <label htmlFor={`icon` + l.key} type="button">
                      <FontAwesomeIcon
                        icon={faCloudArrowUp}
                        className="cursor-pointer"
                      />
                      <span className="text-sm justify-center cursor-pointer ml-2">
                        Change icon
                      </span>
                    </label>
                  </div>
                  <button
                    onClick={() => removeLink(l.key)}
                    type="button"
                    className="w-full bg-gray-300 py-1 px-1 mb-2 h-full flex gap-2 items-center justify-center rounded-sm"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                    <span className="text-xs">Remove this link</span>
                  </button>
                </div>

                <div className="flex flex-col py-1 w-full m-1 gap-2">
                  <div>
                    <label className="input-label">Title:</label>
                    <input
                      value={l.title}
                      onChange={(ev) => handleChangeLink(l.key, "title", ev)}
                      placeholder="Title of your custom link"
                      className="w-full p-2 bg-slate-200 border-gray-400 rounded-sm"
                    />
                  </div>
                  <div>
                    <label className="input-label">Subtitle:</label>
                    <input
                      value={l.subtitle}
                      onChange={(ev) => handleChangeLink(l.key, "subtitle", ev)}
                      placeholder="Any subtitle(optional)"
                      className="w-full p-2 bg-slate-200 border-gray-400 rounded-sm"
                    />
                  </div>
                  <div>
                    <label className="input-label">URL:</label>
                    <input
                      value={l.url}
                      onChange={(ev) => handleChangeLink(l.key, "url", ev)}
                      placeholder="www.instagram.com/?userid=ankitk_ig"
                      className="w-full p-2 bg-slate-200 border-gray-400 rounded-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
          </ReactSortable>
        </div>
        <div className="border-t pt-4 mt-4">
          <SubmitButton className="max-w-xs mx-auto">
            <FontAwesomeIcon icon={faSave} />
            <span>Save</span>
          </SubmitButton>
        </div>
      </form>
    </SectionBox>
  );
}
