import {FilterValue, TablePaginationConfig} from "antd/es/table/interface";
import {EventDto} from "../../store/event/dto/event.dto.ts";
import {UserDto} from "../../store/user/dto/user.dto.ts";
import {VisitorDto} from "../../store/visitor/dto/visitor.dto.ts";
import {LabDto} from "../../store/lab/dto/lab.dto.ts";
import {SessionDto} from "../../store/session/dto/session.dto.ts";
import {AttendanceDto} from "../../store/attendance/dto/attendance.dto.ts";

type ColumnProps = {
    filteredInfo?: Record<string, FilterValue | null>;
    sortedInfo?: SorterResult<any>;
    onOpenModal: () => void;
};
interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: string;
    sortOrder?: string;
    filters?: Record<string, FilterValue | null>;
}

interface EventDataTable extends EventDto {
    key: number;
}

interface UserDataTable extends UserDto {
    key: number;
}

interface VisitorDataTable extends VisitorDto {
    key: number;
}

interface LabDataTable extends LabDto {
    key: number;
}

interface SessionDataTable extends SessionDto {
    key: number;
}

interface AttendanceDataTable extends AttendanceDto {
    key: number;
}