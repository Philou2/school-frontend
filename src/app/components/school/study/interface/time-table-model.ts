export class TimeTableModel {
    id!: number;
    code!: string;
    name!: string;
    isTeacherAvailable!: boolean;
    isRoomAvailable!: boolean;
    isHourlyVolumeAvailable!: boolean;
    status!: string;
    speciality!: string[];
    level!: string[];
    trainingType!: string[];
    mainRoom!: string[];
    cycle!: string[];
    timeTablePeriod!: string[];
    campus!: string[];
    day!: string[];
    mondayStart!: string;
    mondayEnd!: string;
    tuesdayStart!: string;
    tuesdayEnd!: string;
    wednesdayStart!: string;
    wednesdayEnd!: string;
    thursdayStart!: string;
    thursdayEnd!: string;
    fridayStart!: string;
    fridayEnd!: string;
    saturdayStart!: string;
    saturdayEnd!: string;
    sundayStart!: string;
    sundayEnd!: string;
    monday!: boolean;
    tuesday!: boolean;
    wednesday!: boolean;
    thursday!: boolean;
    friday!: boolean;
    saturday!: boolean;
    sunday!: boolean;
    startDate!: boolean;
    endDate!: boolean;
}