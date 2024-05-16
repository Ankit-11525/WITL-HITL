"use client";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileInvoice } from "@fortawesome/free-solid-svg-icons";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import LogoutButton from "@/components/buttons/LogoutButton";
import { usePathname } from "next/navigation";
export default function AppSideBar() {
  const path = usePathname();

  return (
    <nav className="flex flex-col text-center gap-4 mt-12  text-gray-600">
      <Link
        href={"/account"}
        className={
          "flex gap-4 p-2 " + (path === "/account" ? "text-blue-500" : "")
        }
      >
        <FontAwesomeIcon
          fixedWidth={true}
          icon={faFileInvoice}
          className="h-6 w-6"
        />
        <span>My Page</span>
      </Link>
      <Link
        href={"/analytics"}
        className={
          "flex gap-4 p-2 " + (path === "/analytics" ? "text-blue-500" : "")
        }
      >
        <FontAwesomeIcon
          fixedWidth={true}
          icon={faChartLine}
          className="h-6 w-6"
        />
        <span>Analytics</span>
      </Link>
      <LogoutButton
        className="flex gap-4 items-center p-2"
        iconClasses="h-6 w-6"
        iconLeft={true}
      />
      <Link
        href={"/"}
        className="flex items-center gap-2 text-xs text-gray-500 border-t pt-4"
      >
        <FontAwesomeIcon icon={faArrowLeft} className={"w-3 h-3"} />
        <span>Back to website</span>
      </Link>
    </nav>
  );
}
