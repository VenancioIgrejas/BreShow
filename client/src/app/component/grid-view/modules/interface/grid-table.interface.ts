import { GridColumn } from "./grid-column.interface";
import { GridInfo } from "./grid-info.interface";

export interface GridTable<T> {
    GridColumn:GridColumn[]
    GridData:T[]
    GridInfo: GridInfo
}
