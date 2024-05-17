import { faImage, faPalette } from "@fortawesome/free-solid-svg-icons";
import RadioToggelers from "../formitems/RadioToggelers";
import Image from "next/image";
export default function PageSettingsForm({ page, imageuri }) {
  return (
    <div>
      <div className="-m-4 ">
        <form>
          <div className=" bg-gray-300 py-4 min-h-[200px] flex justify-center items-center bg-cover bg-center ">
            <RadioToggelers
              options={[
                { value: "color", icon: faPalette, label: "Color" },
                { value: "image", icon: faImage, label: "Image" },
              ]}
              onChange={() => {}}
            />
          </div>
          <div>
            <div className="flex justify-center -mb-8">
              <Image
                src={imageuri}
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
                name="displayLocation"
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
                className="bg-gray-100 w-full block py-2 px-2 mb-2"
                placeholder="Your Bios goes here"
              ></textarea>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
