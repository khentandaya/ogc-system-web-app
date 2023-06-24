import CheckBox from "@/components/checkbox";
import { AiOutlinePlus as AddIcon } from "react-icons/ai";
import { BiCopy as CopyIcon, BiTrash as Trash } from "react-icons/bi";
import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import DropDownMenu from "./DropDownMenu";
import { areIntervalsOverlapping, isSameDay } from "date-fns";
import Button from "./button";
import "react-datepicker/dist/react-datepicker.css";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import log from "@/utils/log";

export default function GeneralSchedule() {
  const session = useSession();
  const [buttonLoad, setButtonLoad] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([
    {
      text: "SUN",
      day: "isSunday",
      schedules: [],
      isSelected: false,
      isDuplicate: false,
      isEmpty: true,
      hasError: false,
      ref: useRef(),
    },
    {
      text: "MON",
      day: "isMonday",
      schedules: [],
      isSelected: false,
      isDuplicate: false,
      isEmpty: true,
      hasError: false,
      ref: useRef(),
    },
    {
      text: "TUE",
      day: "isTuesday",
      schedules: [],
      isSelected: false,
      isDuplicate: false,
      isEmpty: true,
      hasError: false,
      ref: useRef(),
    },
    {
      text: "WED",
      day: "isWednesday",
      schedules: [],
      isSelected: false,
      isDuplicate: false,
      isEmpty: true,
      hasError: false,
      ref: useRef(),
    },
    {
      text: "THU",
      day: "isThursday",
      schedules: [],
      isSelected: false,
      isDuplicate: false,
      isEmpty: true,
      hasError: false,
      ref: useRef(),
    },
    {
      text: "FRI",
      day: "isFriday",
      schedules: [],
      isSelected: false,
      isDuplicate: false,
      isEmpty: true,
      hasError: false,
      ref: useRef(),
    },
    {
      text: "SAT",
      day: "isSaturday",
      schedules: [],
      isSelected: false,
      isDuplicate: false,
      isEmpty: true,
      hasError: false,
      ref: useRef(),
    },
  ]);

  const [disableSaveButton, setDisableSaveButton] = useState(false);

  function convertArrDates(arr) {
    return arr.map((e) => {
      return {
        from: new Date(e.from),
        to: new Date(e.to),
      };
    });
  }

  useEffect(() => {
    if (session.data) {
      axios
        .get(`/api/staff/weeklysched?id=${session.data.user._id}`)
        .then((res) => {
          console.log(res.data);
          setLoading(false);
          const resdata = res.data;
          if (resdata) {
            setData((old) => {
              return [
                {
                  ...old[0],
                  isSelected: resdata.sun.length !== 0,
                  isEmpty: resdata.sun.length === 0,
                  schedules: convertArrDates(resdata.sun),
                },
                {
                  ...old[1],
                  isSelected: resdata.mon.length !== 0,
                  isEmpty: resdata.mon.length === 0,
                  schedules: convertArrDates(resdata.mon),
                },
                {
                  ...old[2],
                  isSelected: resdata.tue.length !== 0,
                  isEmpty: resdata.tue.length === 0,
                  schedules: convertArrDates(resdata.tue),
                },
                {
                  ...old[3],
                  isSelected: resdata.wed.length !== 0,
                  isEmpty: resdata.wed.length === 0,
                  schedules: convertArrDates(resdata.wed),
                },
                {
                  ...old[4],
                  isSelected: resdata.thu.length !== 0,
                  isEmpty: resdata.thu.length === 0,
                  schedules: convertArrDates(resdata.thu),
                },
                {
                  ...old[5],
                  isSelected: resdata.fri.length !== 0,
                  isEmpty: resdata.fri.length === 0,
                  schedules: convertArrDates(resdata.fri),
                },
                {
                  ...old[6],
                  isSelected: resdata.sat.length !== 0,
                  isEmpty: resdata.sat.length === 0,
                  schedules: convertArrDates(resdata.sat),
                },
              ];
            });
          }
        });
    }
  }, [session]);

  useEffect(() => {
    setDisableSaveButton(false);
    let hasOverlapping = false;
    let isEmpty = true;
    for (let index = 0; index < data.length; index++) {
      const schedules = data[index].schedules;
      if (schedules.length > 0) {
        isEmpty = false;
      }
      for (let index = 0; index < schedules.length; index++) {
        const sched = schedules[index].overlapping;
        if (sched) {
          hasOverlapping = true;
          break;
        }
      }
      if (hasOverlapping) {
        break;
      }
    }

    if (hasOverlapping || isEmpty) {
      setDisableSaveButton(true);
    }
  }, [data]);

  const addTimeSlot = (element) => {
    setData([
      ...data.map((e) => {
        if (e.text === element.text) {
          let todayFrom = new Date();
          let todayTo = new Date();
          if (e.schedules.length > 0) {
            const lastSchedule = e.schedules[e.schedules.length - 1];
            todayFrom = addMinutes(new Date(lastSchedule.to), 60);
            todayTo = addMinutes(todayFrom, 60);
            if (
              !isSameDay(lastSchedule.to, todayFrom) ||
              !isSameDay(lastSchedule.to, todayTo)
            ) {
              todayFrom = lastSchedule.from;
              todayTo = lastSchedule.to;
            }
          } else {
            todayFrom.setHours(9, 0, 0);
            todayTo.setHours(17, 0, 0);
          }
          return {
            ...e,
            schedules: [
              ...e.schedules,
              {
                from: todayFrom,
                to: todayTo,
                overlapping: isOverlapping(
                  element,
                  todayFrom,
                  todayTo,
                  e.schedules.length
                ),
              },
            ],
            isSelected: true,
            isEmpty: false,
          };
        }
        return e;
      }),
    ]);
  };

  const removeTimeSlot = (element, schedIdx) => {
    let schedIsEmpty = false;
    if (element.schedules.length === 1) schedIsEmpty = true;
    setData(
      data.map((e) => {
        if (e.text === element.text) {
          return {
            ...e,
            schedules: [
              ...e.schedules.filter((eSched, iSched) => {
                return !(iSched === schedIdx);
              }),
            ],
            isEmpty: schedIsEmpty,
          };
        }
        return e;
      })
    );
  };

  const onTimeSlotChange = (element, schedIdx, date, prop) => {
    setData(
      data.map((e) => {
        if (e.text === element.text) {
          return {
            ...e,
            schedules: [
              ...e.schedules.map((eSched, iSched) => {
                if (iSched === schedIdx) {
                  let overlapping = false;
                  if (prop === "from") {
                    overlapping = isOverlapping(
                      element,
                      date,
                      eSched.to,
                      schedIdx
                    );
                  } else {
                    overlapping = isOverlapping(
                      element,
                      eSched.from,
                      date,
                      schedIdx
                    );
                  }
                  return {
                    ...eSched,
                    [`${prop}`]: date,
                    overlapping: overlapping,
                  };
                }
                return eSched;
              }),
            ],
          };
        }
        return e;
      })
    );
  };

  const isOverlapping = (element, from, to, slotIndex) => {
    let overlap = false;
    if (element.schedules.length !== 1) {
      for (let index = 0; index < element.schedules.length; index++) {
        const sched = element.schedules[index];
        if (index !== slotIndex) {
          if (
            areIntervalsOverlapping(
              { start: sched.from, end: sched.to },
              { start: from, end: to }
            )
          ) {
            overlap = true;
          }
        }
      }
    }
    return overlap;
  };

  function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
  }

  if (!loading)
    return (
      <div className="w-[800px] select-none">
        <h2 className="text-almostBlack font-Gothic my-5 mt-0 border-b border-dotted border-black text-2xl font-bold">
          Set your weekly hours
        </h2>
        {data.map((element, index) => {
          return (
            <div
              key={index}
              className="border-almostBlack flex justify-between border-b border-dotted py-5"
            >
              <div className="flex">
                <div className="w-24">
                  <CheckBox
                    checked={!data[index].isEmpty}
                    onChange={() => {
                      if (data[index].isSelected) {
                        setData([
                          ...data.map((e) => {
                            if (e.text === element.text) {
                              return {
                                ...e,
                                schedules: [],
                                isSelected: false,
                                isEmpty: true,
                              };
                            }
                            return e;
                          }),
                        ]);
                      } else {
                        const todayFrom = new Date().setHours(9, 0, 0);
                        const todayTo = new Date().setHours(17, 0, 0);
                        setData([
                          ...data.map((e) => {
                            if (e.text === element.text) {
                              return {
                                ...e,
                                schedules: [
                                  {
                                    from: new Date(todayFrom),
                                    to: new Date(todayTo),
                                  },
                                ],
                                isSelected: true,
                                isEmpty: false,
                              };
                            }
                            return e;
                          }),
                        ]);
                      }
                    }}
                  >
                    {element.text}
                  </CheckBox>
                </div>
                <div>
                  <div className="flex items-center">
                    {data[index].isEmpty ? (
                      <div className="text-gray-400">Unavailable</div>
                    ) : (
                      <div>
                        {element.schedules.map((sched, schedIdx) => {
                          return (
                            <div
                              key={schedIdx}
                              className={`flex items-center ${
                                schedIdx !== element.schedules.length - 1
                                  ? "mb-3"
                                  : ""
                              }`}
                            >
                              <div className="flex w-56 items-center gap-3">
                                <DatePicker
                                  className={`border px-2 ${
                                    sched.overlapping
                                      ? "border-red-300"
                                      : "border-gray-300"
                                  }  rounded hover:border-black`}
                                  selected={sched.from}
                                  onChange={(date) =>
                                    onTimeSlotChange(
                                      element,
                                      schedIdx,
                                      date,
                                      "from"
                                    )
                                  }
                                  showTimeSelect
                                  showTimeSelectOnly
                                  timeIntervals={60}
                                  timeCaption="From"
                                  dateFormat="h:mm aa"
                                  minTime={
                                    schedIdx === 0
                                      ? new Date().setHours(0, 0)
                                      : addMinutes(
                                          element.schedules[schedIdx - 1].to,
                                          60
                                        )
                                  }
                                  maxTime={addMinutes(sched.to, -60)}
                                />
                                <div>-</div>
                                <DatePicker
                                  className={`border px-2 ${
                                    sched.overlapping
                                      ? "border-red-300"
                                      : "border-gray-300"
                                  }  text-almostBlack appearance-none rounded hover:border-black`}
                                  selected={sched.to}
                                  onChange={(date) =>
                                    onTimeSlotChange(
                                      element,
                                      schedIdx,
                                      date,
                                      "to"
                                    )
                                  }
                                  showTimeSelect
                                  showTimeSelectOnly
                                  timeIntervals={60}
                                  timeCaption="To"
                                  dateFormat="h:mm aa"
                                  minTime={addMinutes(sched.from, 60)}
                                  maxTime={
                                    schedIdx === element.schedules.length - 1
                                      ? new Date().setHours(23, 59)
                                      : addMinutes(
                                          element.schedules[schedIdx + 1].from,
                                          -60
                                        )
                                  }
                                />
                              </div>
                              <Trash
                                className="ml-3 cursor-pointer text-2xl hover:text-[#f4c932]"
                                onClick={() =>
                                  removeTimeSlot(element, schedIdx)
                                }
                              />
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <AddIcon
                  className="mr-3 cursor-pointer text-2xl hover:text-[#f4c932]"
                  onClick={() => addTimeSlot(element)}
                />
                <DropDownMenu
                  ref={element.ref}
                  buttonLabel={
                    <CopyIcon className="cursor-pointer text-2xl hover:text-[#f4c932]" />
                  }
                >
                  <div className="flex flex-col">
                    <div className="mb-2 text-xs text-gray-400">
                      COPY TIMES TO...
                    </div>
                    <div className="mb-2">
                      {data.map((e, i) => {
                        if (index !== i) {
                          return (
                            <CheckBox
                              key={i}
                              addClass="mb-3"
                              checked={e.isDuplicate}
                              onChange={() => {
                                setData([
                                  ...data.map((eDuplicate, iDuplicate) => {
                                    if (iDuplicate === i)
                                      return {
                                        ...eDuplicate,
                                        isDuplicate: !eDuplicate.isDuplicate,
                                        isSelected: true,
                                      };
                                    return eDuplicate;
                                  }),
                                ]);
                              }}
                            >
                              {e.text}
                            </CheckBox>
                          );
                        }
                      })}
                    </div>
                    <Button
                      onClick={() => {
                        setData([
                          ...data.map((e) => {
                            if (e.isDuplicate && element.schedules.length > 0)
                              return {
                                ...e,
                                schedules: element.schedules,
                                isDuplicate: false,
                                isEmpty: false,
                              };
                            return { ...e, isDuplicate: false };
                          }),
                        ]);
                        element.ref.current.toggle();
                      }}
                    >
                      APPLY
                    </Button>
                  </div>
                </DropDownMenu>
              </div>
            </div>
          );
        })}
        <div className="mt-5 flex justify-end gap-5">
          <Button
            className="flex items-center gap-1 bg-[#28407f] text-[#FDFDFD] hover:bg-[#FDFDFD] hover:text-[#28407f]"
            disabled={disableSaveButton || buttonLoad}
            onClick={async () => {
              setButtonLoad(true);
              const schedules = JSON.parse(JSON.stringify(data));
              const sched = {};
              schedules.forEach((element) => {
                element.schedules.forEach((sched) => {
                  delete sched.overlapping;
                });
                sched[element.text.toLowerCase()] = element.schedules;
              });

              log(session.data.user.college);
              await axios.post("/api/staff/weeklysched", {
                weeklysched: JSON.stringify(sched),
                id: session.data.user._id,
                college: session.data.user.college,
              });
              setButtonLoad(false);
            }}
          >
            {buttonLoad ? <Loader2 className="animate-spin" /> : ""}
            SAVE
          </Button>
        </div>
      </div>
    );
  return <Loader2 className="h-20 w-20 animate-spin text-[#28407f]" />;
}
