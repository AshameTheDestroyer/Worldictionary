import React, { FC } from "react";
import { format } from "date-fns";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export type DatePickerProps = {
    placeholder?: string;
    date: Date | undefined;
    setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
};

export const DatePicker: FC<DatePickerProps> = ({
    date,
    setDate,
    placeholder = "Pick a date",
}) => {
    return (
        <Popover>
            <PopoverTrigger
                className="dark:border-white/30 border-black/30 bg-input/30! hover:bg-transparent"
                asChild
            >
                <Button
                    variant="outline"
                    data-empty={!date}
                    className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
                >
                    <CalendarIcon />
                    {date ? format(date, "PPP") : <span>{placeholder}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} />
            </PopoverContent>
        </Popover>
    );
};
