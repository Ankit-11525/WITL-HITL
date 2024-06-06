"use client";
import { useState } from "react";
import {
  faCloudArrowUp,
  faImage,
  faPalette,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

import RadioToggelers from "../formItems/RadioToggelers";
import Image from "next/image";
import SubmitButton from "../buttons/SubmitButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { savePageSettings } from "@/actions/pageActions";
import toast from "react-hot-toast";
import ColorPicker from "../formItems/ColorPicker";
import {handleImageUpload} from '../../libs/uploadImage'
import { SectionBox } from "../layout/SectionBox";




export default function PageSettingsForm({ page, user }) {
  const [bgType, setBgType] = useState(page.bgType);
  const [bgColor, setBgColor] = useState(page.bgColor);
  const [bgImage, setBgImage] = useState(page.bgImage);
  const [avatar, setAvatar] = useState(user?.image);

  const [bgloading, setBGLoading] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);

  const handleBgChange = (e) => {
    setBgImage(e.target.files[0]);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleAvatarImageChange = async () => {
    
    setAvatarLoading(true);
    await handleImageUpload(avatar, (link) => {
      setAvatar(link);
    });
    setAvatarLoading(false);
    console.log("avatar : ")
    console.log(avatar);
  };



  const handleBgImageChange = async () => {
    
    setBGLoading(true);
    await handleImageUpload(bgImage, (link) => {
      setBgImage(link);
    });
    setBGLoading(false);
   
  };



  const saveBaseSettings = async (formData) => {
    const res = await savePageSettings(formData, bgColor, bgImage,avatar);
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
      <div >

        <SectionBox>
          <form action={saveBaseSettings}>
          <div
            className="-m-4 py-4 min-h-[400px] flex justify-center items-center bg-cover bg-center  "
            style={
              bgType === "color"
                ? { backgroundColor: bgColor }
                : { backgroundImage: `url(${bgImage})` }
            }
          >
            <div className="flex flex-col justify-center items-center">
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
                    <ColorPicker
                      type="color"
                      name={bgColor}
                      bgColor={bgColor}
                      setBgColor={setBgColor}
                    />
                    {/* <input
                      type="color"
                      name="bgColor"
                      onChange={ev => setBgColor(ev.target.value)}
                      defaultValue={page.bgColor} /> */}
                  </div>
                </div>
              )}
              {bgType === "image" && (
                <div className="flex justify-center">
                  <label className="bg-white shadow px-4 py-2 mt-2 cursor-pointer">
                    <input
                      onChange={handleBgChange}
                      hidden
                      type="file"
                      name="file"
                    />
                    <div className="flex gap-2 items-center cursor-pointer text-blue-600">
                      <FontAwesomeIcon
                        icon={faCloudArrowUp}
                        className={bgloading ? "text-gray-700" : "text-blue-600"}
                      />
                      <span className="text-gray-700">Change BG Image</span>
                      <button
                        onClick={handleBgImageChange}
                        disabled={!bgImage || bgloading}
                      >
                        {bgloading ? "Uploading..." : "Upload"}
                      </button>
                    </div>
                  </label>

                  {/* <ImageUpload/> */}
                </div>
              )}
            </div>
          </div>
          <div>
            <div className="flex justify-center -mb-8">
              <div className="relative -top-8 w-[192px] h-[192px]">
                <div className="overflow-hidden h-full rounded-full border-4 border-white shadow shadow-black/50">
                  <Image
                    className="w-full h-full object-cover"
                    src={avatar}
                    alt={"avatar"}
                    width={256}
                    height={256}
                  />
                </div>
                <label
                  htmlFor="avatarIn"
                  className="flex-row gap-8 absolute bottom-4 -right-16 bg-white p-2 rounded-full shadow shadow-black/50  flex items-center cursor-pointer"
                >
                  <FontAwesomeIcon size={"xl"} icon={faPencilAlt} className={avatarLoading ? "text-gray-500" : "text-blue-600"} />
                  <button
                    onClick={handleAvatarImageChange}
                    disabled={!avatar || avatarLoading}
                    className={avatarLoading ? "text-gray-500" : "text-blue-600"}
                  >
                    {avatarLoading ? "Uploading..." : "Upload"}
                  </button>
                </label>
                <input
                  id="avatarIn"
                  onChange={handleAvatarChange}
                  type="file"
                  className="hidden"
                />
                <input type="hidden" name="avatar" value={avatar} />
              </div>
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
        </SectionBox>
        
      </div>
    </div>
  );
}
