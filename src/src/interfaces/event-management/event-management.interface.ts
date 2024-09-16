interface IColumnsFiles {
    eventName?: string,
    date?: string | number, 
    name?: string, 
    email?: string, 
    typeDocument?: string, 
    document?: string
}

export interface INotAttendancesRegistered {
    incompleteInformation: IColumnsFiles[],
    notFoundInDatabase: IColumnsFiles[],
    thereWasRecordAttendance: IColumnsFiles[]
}