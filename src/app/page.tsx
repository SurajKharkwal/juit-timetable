"use client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import Link from "next/link";
import { profile } from "console";


const Batches = [
  "BTECH 1 SEM",
  "BTECH 2 SEM",
  "BTECH 3 SEM",
  "BTECH 4 SEM",
  "BTECH 5 SEM",
  "BTECH 6 SEM",
  "BTECH 7 SEM",
  "BTECH 8 SEM",
]

interface Record {
  batch: string;
  course: string;
}

export default function Home() {
  const SEM = process.env.NEXT_PUBLIC_SEM
  const router = useRouter();
  const [record, setRecord] = useState<Record>({ batch: "", course: "" });
  const [error, setError] = useState<"Batch Required" | "Course Required" | null>(null);

  const handleSubmit = () => {
    const { batch, course } = record;
    if (!batch) {
      setError("Batch Required");
      return;
    }
    if (!course) {
      setError("Course Required");
      return;
    }
    setError(null);
    console.log("Submitting record:", record);
    const encodedBatch = encodeURIComponent(batch);
    const encodedCourse = encodeURIComponent(course);
    router.push(`/timetable?batch=${encodedBatch}&course=${encodedCourse}`);
  };

  return (
    <div className="w-full h-dvh flex items-center justify-center flex-col">
      <nav className="w-full text-right mr-32 mt-2">
        <Dropdown>
          <DropdownTrigger>
            <Button isIconOnly variant="flat" size="lg"><GithubIcon size={40} /></Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem as={Link} href="https://github.com/SurajKharkwal" key="Suraj ">Suraj Kharkwal</DropdownItem>
            <DropdownItem as={Link} href="https://github.com/shorya-1012" key="Shorya ">Shorya Jain</DropdownItem>
            <DropdownItem as={Link} href="/update-timetable" className="text-warning hidden" key="Update" color="warning">Update</DropdownItem>
            <DropdownItem as={Link} href="https://github.com/SurajKharkwal/juit-time-table" key="Main Repo" className="text-danger" color="danger">
              Repository
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </nav>
      <section className="h-full flex flex-col gap-y-8 w-full items-center justify-center max-w-sm">
        <h2 className="text-transparent text-5xl bg-clip-text bg-gradient-to-b from-neutral-300 to-neutral-800">
          Juit Time Table
        </h2>

        <form
          className="w-full space-y-8 flex flex-col items-center max-sm:p-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <Select
            radius="sm"
            description={error === "Course Required" ? error : null}
            onChange={(e) => setRecord((prev) => ({ ...prev, course: e.target.value }))}
            classNames={{ description: "text-red-500" }}
            disabledKeys={Batches.filter((_, index) => {
              if (SEM === "ODD_SEM") {
                return index % 2 === 1;
              } else if (SEM === "EVEN_SEM") {
                return index % 2 === 0;
              }
              return false;
            }).map((batch) => batch)}
            label="Select Course"
          >
            {Batches.map((ele) => (
              <SelectItem value={ele} key={ele}>
                {ele}
              </SelectItem>
            ))}
          </Select>
          <Input
            radius="sm"
            label="Enter Batch"
            classNames={{ description: "text-red-500" }}
            description={error === "Batch Required" ? error : null}
            onChange={(e) => setRecord((prev) => ({ ...prev, batch: e.target.value }))}
          />
          <Button
            radius="sm"
            size="lg"
            color="primary"
            className="w-fit"
            onPress={handleSubmit}
          >
            TimeTable
          </Button>
        </form>
      </section>
      <footer className="flex flex-col items-center">
        <h6>Created By</h6>
        <p className="text-blue-500 font-bold">SURAJ & SHORYA</p>
      </footer>
    </div >
  );
}


interface GithubIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  width?: number;
  height?: number;
}

const GithubIcon: React.FC<GithubIconProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};


