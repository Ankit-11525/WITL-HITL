"use client";
import { useState } from "react";
import { faImage, faPalette, faSave } from "@fortawesome/free-solid-svg-icons";
import RadioToggelers from "../formItems/RadioToggelers";
import Image from "next/image";

import SubmitButton from "../buttons/SubmitButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { savePageSettings } from "@/actions/pageActions";
import toast from "react-hot-toast";
import { SketchPicker } from "react-color";
import ColorPicker from "../formItems/ColorPicker";

export default function PageSettingsForm({ page, user }) {
  const [bgType, setBgType] = useState(page.bgType);
  const [bgColor, setBgColor] = useState(page.bgColor);
  const [bgImage, setBgImage] = useState(page.bgColor);

  const saveBaseSettings = async (formData) => {
    const res = await savePageSettings(formData,bgColor);
    if (res) {
      toast.success("Saved!");
    }

    // const promise= new Promise( async (resolve,reject) =>{
    //   const res=await savePageSettings(formData);
    //   if(res) resolve();
    //   else return reject();
    // });
    // await toast.promise(promise,{
    //   success:"saved",
    //   loading:"saving",
    //   error:"saving failed"
    // })
  };
  return (
    <div>
      <div className="-m-4 ">
        <form action={saveBaseSettings}>
          <div
            className=" py-4 min-h-[200px] flex justify-center items-center bg-cover bg-center "
            style={
              bgType === "color"
                ? { backgroundColor: bgColor }
                : { backgroundImage: bgImage }
            }
          >
            <div>
              <RadioToggelers
                options={[
                  { value: "color", icon: faPalette, label: "Color" },
                  { value: "image", icon: faImage, label: "Image" },
                ]}
                defaultValue={page.bgType}
                onChange={(val) => setBgType(val)}
              />

              {bgType === "color" && (
                <div className="bg-gray-200 shadow text-gray-700 p-2 mt-2">
                  <div className="flex gap-2 justify-center">
                    <span>Background color:</span>
                    <ColorPicker type="color" name={bgColor} bgColor={bgColor} setBgColor={setBgColor}/>
                    {/* <input
                      type="color"
                      name="bgColor"
                      onChange={ev => setBgColor(ev.target.value)}
                      defaultValue={page.bgColor} /> */}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div>
            <div className="flex justify-center -mb-8">
              <Image
                src={user?.image}
                alt={"avatar"}
                width={128}
                height={128}
                className="
              rounded-full
            relative -top-8 border-4 border-white shadow shadow-black/50 "
              />
            </div>

            <div className="flex flex-col w-full p-8">
              <label
                htmlFor="nameIn"
                className="uppercase text-gray-700 text-md font-semibold"
              >
                DISPLAY NAME
              </label>
              <input
                type="text"
                id="nameIn"
                name="displayName"
                defaultValue={page.displayName}
                placeholder="Ankit Pathak"
                className="bg-gray-100 mb-4  px-2 py-2"
              />
              <label
                htmlFor="LocationIn"
                className="uppercase text-gray-700 text-md font-semibold"
              >
                LOCATION
              </label>
              <input
                type="text"
                id="LocationIn"
                name="location"
                defaultValue={page.location}
                placeholder="New Delhi IN"
                className=" bg-gray-100 mb-4 px-2 py-2"
              />
              <label
                htmlFor="bioIn"
                className="uppercase text-gray-700 text-md  font-semibold"
              >
                Bio
              </label>
              <textarea
                name="bio"
                defaultValue={page.bio}
                className="bg-gray-100 w-full block py-2 px-2 mb-2"
                placeholder="Your Bios goes here"
              ></textarea>
            </div>
          </div>
          <div className=" w-3/4 max-w-[320px] mx-auto mb-4 ">
            <SubmitButton>
              <FontAwesomeIcon icon={faSave} />
              Save
            </SubmitButton>
          </div>
        </form>
      </div>
    </div>
  );
}
